import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import Timer from "../../components/Timer/Timer.jsx";
import useAuth from "../../hooks/useAuth";
import { getSocket } from "../../utils/getSocket.js";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay.jsx";
import BiddingHistory from "./Biddinghistory.jsx";
import ProductDescription from "./ProductDescription.jsx";

function AuctionDescPage() {
  const seqRef = useRef(0);
  const recentBidsRef = useRef([]);
  const currentPriceRef = useRef(0);
  const [isActive, setIsActive] = useState(true);
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [currentPrice, setCurrentprice] = useState(0);
  const { user } = useAuth();
  const [seq, setSeq] = useState(0);
  const [recentBids, setRecentBids] = useState([]);
  const [isSeller, setIsSeller] = useState(false);
  const socket = useRef();

  const setEndedAuction = () => {
    setIsActive(false);
  };

  useEffect(() => {
    if (!id) return;
    let canceled = false;

    const safeSetSeq = (value) => {
      const n = Number(value ?? 0);
      seqRef.current = n;
      setSeq(n);
    };
    const safeSetRecentBids = (arr) => {
      recentBidsRef.current = arr ?? [];
      setRecentBids(recentBidsRef.current);
    };

    const safeSetCurrentPrice = (value) => {
      const n = Number(value ?? 0);
      currentPriceRef.current = n;
      setCurrentprice(n);
    };

    const onSnapshot = (snap) => {
      if (!snap) return;
      const newSeq = Number(snap.seq ?? 0);
      safeSetSeq(newSeq);
      safeSetRecentBids(snap.recent_bids ?? []);
      safeSetCurrentPrice(snap.current_price);
      setAuction((prev) => ({
        ...(prev || {}),
        current_price: Number(snap.current_price),
        end_time: snap.end_time,
      }));
    };

    const onBidUpdate = async (payload) => {
      if (!payload) return;
      const payloadAuctionId = payload.auctionId;
      if (String(payloadAuctionId) !== String(id)) return;
      const incomingSeq = Number(payload.seq ?? 0);
      const bid = payload.bid;

      const localSeq = Number(seqRef.current ?? 0);

      if (incomingSeq && incomingSeq > localSeq + 1) {
        try {
          const res = await api.get(`/api/auction/get-auction/${id}/snapshot`);
          if (res?.data) {
            const snapSeq = Number(res.data.seq ?? 0);
            setSeq(snapSeq);
            seqRef.current = snapSeq;

            onSnapshot(res.data);
          }
        } catch (error) {
          console.error("snapshot fething failed", err);
        }
        return;
      }
      if (incomingSeq) {
        safeSetSeq(incomingSeq);
      }
      if (bid) {
        console.log("bid update", bid);
        safeSetCurrentPrice(bid.bid_amount);
        const amount = Number(bid.bid_amount);
        setAuction((prev) => ({
          ...(prev || {}),
          current_price: amount,
          end_time: bid.bid_time,
        }));

        setRecentBids((prev) => {
          const filtered = prev.filter(
            (b) => String(b.id) !== String(bid.bid_id)
          );

          const next = [bid, ...filtered];

          recentBidsRef.current = next;
          return next;
        });
      }
    };

    (async () => {
      try {
        setLoading(true);
        setErr("");
        const { data } = await api.get(`/api/auction/get-auction/${id}`, {
          withCredentials: true,
        });
        console.log(data);

        if (canceled) return;
        setAuction(data.auction || null);

        if (data.auction.seller_id === user.id) setIsSeller(true);

        if (!socket.current) {
          socket.current = getSocket();
        }

        const s = socket.current;
        if (!s.connected) s.connect();
        s.off("auction:snapshot", onSnapshot);
        s.off("bid:update", onBidUpdate);
        s.on("auction:snapshot", onSnapshot);
        s.on("bid:update", onBidUpdate);

        socket.current.emit(
          "auction:join",
          { auctionId: Number(id) },
          (res) => {
            if (!res?.ok) {
              console.error("join failed", res);
            }

            if (res?.snapshot) onSnapshot(res.snapshot);
            else if (res?.recent_bids) safeSetRecentBids(res.recent_bids);
          }
        );
      } catch (error) {
        console.log(error);
        if (canceled) return;
        setErr(
          error.response?.data?.error ||
            error.response?.data?.message ||
            error.message ||
            "Failed to load auction"
        );
      } finally {
        if (!canceled) setLoading(false);
      }
    })();

    return () => {
      canceled = true;
      const s = socket.current;
      if (s) {
        s.off("auction:snapshot", onSnapshot);
      }
      try {
        e.emait("auction:leave", { auctionId: Number(id) });
      } catch (error) {}
    };
  }, [id]);

  if (!auction) return <div className="p-8">Auction not found.</div>;

  const price = Number(auction.current_price ?? auction.start_price ?? 0);

  const handlePlaceBidClick = async (bidAmount) => {
    try {
      if (bidAmount <= price) {
        alert("Bid amount must be greater than current price.");
        return;
      }
      setLoading(true);
      socket.current.emit(
        "place-bid",
        { auctionId: Number(id), amount: Number(bidAmount) },
        (res) => {
          // console.log(res);
          setLoading(false);
          if (!res.ok) {
            alert("Bid failed: " + (res.error || "unknown"));
            if (res.minAccept) alert("Minimum accepted: " + res.minAccept);
            socket.current.emit("auction:join", { auctionId: Number(id) });
            return;
          }
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const bidsList = recentBids.map((bid) => {
    return (
      <div key={bid.bid_id}>
        <BiddingHistory bid={bid} />
      </div>
    );
  });

  return (
    <div className="min-h-screen pb-10">
      <LoadingOverlay loading={loading} />
      <div className="p-8 space-y-6">
        <div className="text-sm text-gray-600">
          Home / Auctions / {auction.category} / {auction.title}
        </div>
        <div>
          <ProductDescription
            auction={auction}
            onPlaceBid={handlePlaceBidClick}
            isSeller={isSeller}
            loading={loading}
            price={currentPrice}
            isActive={isActive}
          />
        </div>
        {/* <BiddingHistory /> */}
        <div>
          <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">
            Bidding History
          </h2>
          <div className="text-sm mt-3 text-gray-700">
            <div className="flex justify-between ">
              <div className="font-medium">Bidder</div>
              <div className="font-medium">Bid Amount</div>
              <div className="font-medium hidden md:block">Time</div>
            </div>
            <div>{bidsList}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuctionDescPage;
