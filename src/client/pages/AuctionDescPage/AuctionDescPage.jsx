import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import tigerImage from "../../assets/tiger.svg";
import Input from "../../components/Input/Input";
import useAuth from "../../hooks/useAuth";
import { getSocket } from "../../utils/getSocket.js";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay.jsx";
import BiddingHistory from "./Biddinghistory.jsx";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

function AuctionDescPage() {
  const seqRef = useRef(0);
  const recentBidsRef = useRef([]);

  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const { user } = useAuth();
  const [seq, setSeq] = useState(0);
  const [recentBids, setRecentBids] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);

  const socket = useRef();

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

    const onSnapshot = (snap) => {
      console.log("snapshot", snap);
      if (!snap) return;
      const newSeq = Number(snap.seq ?? 0);
      safeSetSeq(newSeq);
      safeSetRecentBids(snap.recent_bids ?? []);
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
            console.log("second");
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
        setAuction((prev) => ({
          ...(prev || {}),
          current_price: Number(bid.amount),
        }));

        setRecentBids((prev) => {
          const filtered = prev.filter((b) => String(b.id) !== String(bid.id));
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
        // console.log(data);
        setAuction(data.auction || null);

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
            // console.log("joined, snapshot:", res);
            if (res?.snapshot) onSnapshot(res.snapshot);
            else if (res?.recent_bids) safeSetRecentBids(res.recent_bids);
          }
        );
        // console.log("recent Bids", recentBids);
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

  const imgSrc = `${API_BASE}/${auction.image_url}`;
  const price = Number(auction.current_price ?? auction.start_price ?? 0);
  const startingBid = Number(auction.start_price);

  const handleBidAmountChange = (e) => {
    setBidAmount(e.target.value);
  };

  const handlePlaceBidClick = async () => {
    if (bidAmount <= price) {
      alert("Bid amount must be greater than current price.");
      return;
    }
    socket.current.emit(
      "place-bid",
      { auctionId: Number(id), amount: Number(bidAmount) },
      (res) => {
        setLoading(false);
        if (!res.ok) {
          alert("Bid failed: " + (res.error || "unknown"));
          if (res.minAccept) alert("Minimum accepted: " + res.minAccept);
          socket.current.emit("auction:join", { auctionId: Number(id) });
          return;
        }
      }
    );
    setBidAmount("");
  };

  const renderedBids = recentBids.slice(0, 3).map((bid) => {
    // console.log(bid.userId);
    return (
      <div key={bid.id} className="flex justify-between">
        <div>{bid.userId}</div>
        <div>{bid.amount}</div>
        <div className="hidden md:block">{bid.created_at}</div>
      </div>
    );
  });

  return (
    <div className="min-h-screen pb-10">
      <LoadingOverlay loading={loading} />
      <div className="p-8 space-y-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600">
          Home / Auctions / {auction.category} / {auction.title}
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Images */}
          <div className="border rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center min-h-[280px]">
            <img
              src={imgSrc}
              alt={auction.title}
              className="max-w-full max-h-[480px] object-contain"
              onError={(e) => (e.currentTarget.src = tigerImage)}
            />
          </div>

          {/* Details */}
          <div className=" rounded-2xl bg-white p-4 md:p-6 space-y-4">
            <h1 className="text-2xl font-bold">{auction.title}</h1>
            <p className="text-gray-700">{auction.description}</p>

            <div className="flex items-center gap-2 text-sm flex justify-between">
              <span className="px-2 py-1 bg-gray-200 rounded">
                {auction.category}
              </span>
              <span className="text-gray-500 flex gap-2">
                Seller :{"  "}
                <p className="bg-red-200 px-2 rounded-sm">
                  {auction.seller_name === user.name
                    ? "You"
                    : auction.seller_name}
                </p>
              </span>
            </div>

            <div className="flex justify-between">
              <div className="text-lg font-semibold">
                Starting Bid: ₹{startingBid.toLocaleString("en-IN")}
              </div>
              <div className="text-lg font-semibold">Current Bid: ₹00</div>
            </div>

            <div className="text-sm text-gray-600">
              Starts: {new Date(auction.start_time).toLocaleString()}
              <br />
              Ends: {new Date(auction.end_time).toLocaleString()}
            </div>

            <div className="">
              <Input
                type="number"
                label="Your Bid Amount (₹)"
                placeholder="Enter your bid"
                value={bidAmount}
                onChange={handleBidAmountChange}
              />
              <button
                onClick={handlePlaceBidClick}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                Place Bid
              </button>
            </div>
          </div>
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
            <div>{renderedBids}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuctionDescPage;
