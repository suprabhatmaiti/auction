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
  const [loading, setLoading] = useState(false);
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

    const onSnapshot = async (snap) => {
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
        safeSetCurrentPrice(bid.bid_amount);
        const amount = Number(bid.bid_amount);
        setAuction((prev) => ({
          ...(prev || {}),
          current_price: amount,
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

  if (!auction) return <LoadingOverlay loading={loading} />;

  const price = Number(auction.current_price ?? auction.start_price ?? 0);

  const handlePlaceBidClick = async (bidAmount) => {
    setLoading(true);
    try {
      if (bidAmount <= price) {
        alert("Bid amount must be greater than current price.");
        return;
      }

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
      setLoading(false);
    }
  };

  const bidsList = recentBids.map((bid) => {
    return <BiddingHistory key={bid.bid_id} bid={bid} />;
  });

  return (
    <div className="min-h-screen pb-10">
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
          <table className="w-full text-sm text-gray-700">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  Bidder
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Bid Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center hidden md:table-cell"
                >
                  Time
                </th>
              </tr>
            </thead>
            <tbody>{bidsList}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AuctionDescPage;
