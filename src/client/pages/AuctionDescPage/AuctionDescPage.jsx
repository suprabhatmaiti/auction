import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import tigerImage from "../../assets/tiger.svg";
import Input from "../../components/Input/Input";
import useAuth from "../../hooks/useAuth";
import { getSocket } from "../../utils/getSocket.js";
import LoadingOverlay from "../../LoadingOverlay.jsx";
// import BiddingHistory from "./Biddinghistory.jsx";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

function AuctionDescPage() {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true); // page-level loading
  const [err, setErr] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const { user } = useAuth();
  const [seq, setSeq] = useState(0);
  const [recentBids, setRecentBids] = useState([]);
  const [placing, setPlacing] = useState(false); // placing state for button

  const socketRef = useRef(null);

  // --- helper: emit with ack + timeout
  const emitWithAck = useCallback(
    (socketInstance, event, payload, timeout = 8000) => {
      return new Promise((resolve, reject) => {
        if (!socketInstance) return reject(new Error("no_socket"));
        let done = false;
        const timer = setTimeout(() => {
          if (done) return;
          done = true;
          reject(new Error("ack_timeout"));
        }, timeout);

        try {
          socketInstance.emit(event, payload, (res) => {
            if (done) return;
            done = true;
            clearTimeout(timer);
            resolve(res);
          });
        } catch (err) {
          if (done) return;
          done = true;
          clearTimeout(timer);
          reject(err);
        }
      });
    },
    []
  );

  // --- helper: fetch snapshot (fallback to your get-auction route)
  const fetchSnapshot = useCallback(async (auctionId) => {
    try {
      const r = await api.get(`/api/auctions/${auctionId}/snapshot`);
      return r.data;
    } catch (e) {
      // fallback
      const r2 = await api.get(`/api/auction/get-auction/${auctionId}`);
      // normalize to snapshot-like shape
      const a = r2.data.auction ?? r2.data;
      return {
        auctionId: a.id ?? auctionId,
        seq: Number(a.seq ?? 0),
        current_price: Number(
          a.current_price ?? a.currentPrice ?? a.start_price ?? 0
        ),
        end_time: a.end_time ?? a.ends_at ?? null,
        recent_bids: r2.data.recentBids ?? [],
        ...a,
      };
    }
  }, []);

  // --- apply snapshot to state
  const applySnapshot = useCallback((snap) => {
    if (!snap) return;
    setSeq(Number(snap.seq ?? 0));
    setRecentBids(snap.recent_bids ?? snap.recentBids ?? snap.bids ?? []);
    setAuction((prev) => ({
      ...(prev || {}),
      title: snap.title ?? prev?.title,
      description: snap.description ?? prev?.description,
      image_url: snap.image_url ?? prev?.image_url,
      category: snap.category ?? prev?.category,
      start_time: snap.start_time ?? prev?.start_time,
      end_time: snap.end_time ?? prev?.end_time,
      current_price: Number(
        snap.current_price ??
          snap.current_highest_bid ??
          prev?.current_price ??
          prev?.start_price ??
          0
      ),
      seller_name: snap.seller_name ?? prev?.seller_name,
      seller_id: snap.seller_id ?? prev?.seller_id,
    }));
  }, []);

  // --- inbound handlers (defined here so we can .off them on cleanup)
  const onSnapshot = useCallback(
    (snap) => {
      // server-sent snapshot
      applySnapshot(snap);
    },
    [applySnapshot]
  );

  const onBidUpdate = useCallback(
    async (payload) => {
      if (!payload) return;
      const payloadAuctionId = Number(
        payload.auctionId ?? payload?.result?.auctionId
      );
      if (String(payloadAuctionId) !== String(id)) return;
      const incomingSeq = Number(payload.seq ?? payload?.result?.seq ?? 0);
      const bid = payload.bid ?? payload?.result?.bid ?? null;

      // if we haven't set seq yet, allow bootstrap
      if (seq === 0 && incomingSeq >= 0) {
        if (incomingSeq) setSeq(incomingSeq);
        if (bid) {
          setRecentBids((prev) => {
            const filtered = (prev || []).filter(
              (b) => String(b.id) !== String(bid.id)
            );
            return [bid, ...filtered].slice(0, 5);
          });
        }
        return;
      }

      // gap detection: missed events
      if (incomingSeq && incomingSeq > seq + 1) {
        try {
          const snap = await fetchSnapshot(id);
          applySnapshot(snap);
        } catch (e) {
          console.error("snapshot fetch failed after gap:", e);
        }
        return;
      }

      // normal update
      if (incomingSeq) setSeq(incomingSeq);
      if (bid) {
        setAuction((prev) => ({
          ...(prev || {}),
          current_price: Number(bid.amount ?? bid),
        }));
        setRecentBids((prev) => {
          const filtered = (prev || []).filter((b) => {
            // remove pending placeholders that match amount + bidder criteria
            if (String(b.id).startsWith("pending:")) {
              return !(
                b.amount === bid.amount &&
                (b.bidder_id === bid.bidder_id ||
                  b.bidder_name === bid.bidder_name)
              );
            }
            return String(b.id) !== String(bid.id);
          });
          return [bid, ...filtered].slice(0, 5);
        });
      }

      // if endsAt provided, update end_time
      if (payload.endsAt ?? payload?.result?.endsAt) {
        setAuction((prev) => ({
          ...(prev || {}),
          end_time: payload.endsAt ?? payload?.result?.endsAt,
        }));
      }
    },
    [id, seq, fetchSnapshot, applySnapshot]
  );

  const onPresence = useCallback((p) => {
    // optional: you can show presence count
    // console.log("presence update", p);
  }, []);

  // --- mount: connect socket, attach listeners, join room, request snapshot
  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      setErr("");
      try {
        // initial REST fetch for basic auction details (keeps your current UX)
        const { data } = await api.get(`/api/auction/get-auction/${id}`, {
          withCredentials: true,
        });
        if (cancelled) return;
        setAuction(data.auction || data);

        if (!socketRef.current) socketRef.current = getSocket();
        const s = socketRef.current;

        // remove previous handlers then attach to avoid duplicates
        s.off("auction:snapshot", onSnapshot);
        s.off("bid:update", onBidUpdate);
        s.off("presence:update", onPresence);

        s.on("auction:snapshot", onSnapshot);
        s.on("bid:update", onBidUpdate);
        s.on("presence:update", onPresence);

        if (!s.connected) s.connect();

        // join with ack -> server may return snapshot in ack
        s.emit("auction:join", { auctionId: Number(id) }, (res) => {
          if (!res) {
            // fallback to REST snapshot
            fetchSnapshot(id)
              .then((snap) => applySnapshot(snap))
              .catch(() => {});
            return;
          }
          if (!res.ok) {
            console.error("join failed", res);
            fetchSnapshot(id)
              .then((snap) => applySnapshot(snap))
              .catch(() => {});
            return;
          }
          if (res.snapshot) applySnapshot(res.snapshot);
          else if (res.recent_bids) setRecentBids(res.recent_bids);
          else
            fetchSnapshot(id)
              .then((snap) => applySnapshot(snap))
              .catch(() => {});
        });
      } catch (error) {
        if (cancelled) return;
        console.error(error);
        setErr(
          error.response?.data?.error ||
            error.response?.data?.message ||
            error.message ||
            "Failed to load auction"
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      // cleanup listeners and leave room
      try {
        const s = socketRef.current;
        if (s && s.connected) {
          s.emit("auction:leave", { auctionId: Number(id) }, () => {});
          s.off("auction:snapshot", onSnapshot);
          s.off("bid:update", onBidUpdate);
          s.off("presence:update", onPresence);
        }
      } catch (e) {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // --- place bid: optimistic UI + ack handling
  const handlePlaceBidClick = async () => {
    if (!auction) return;
    if (!user) {
      alert("Please login to place a bid.");
      return;
    }
    if (user.id === auction.seller_id) {
      alert("Sellers cannot bid on their own auctions.");
      return;
    }

    const amountNum = Number(bidAmount);
    const price = Number(auction.current_price ?? auction.start_price ?? 0);

    if (Number.isNaN(amountNum) || amountNum <= price) {
      alert("Bid amount must be greater than current price.");
      return;
    }

    // ensure socket exists and connected
    if (!socketRef.current) socketRef.current = getSocket();
    if (!socketRef.current.connected) socketRef.current.connect();

    setPlacing(true);

    // optimistic pending bid
    const pendingId = `pending:${Date.now()}`;
    const pendingBid = {
      id: pendingId,
      bidder_id: user.id,
      bidder_name: user.name,
      amount: amountNum,
      created_at: new Date().toISOString(),
      pending: true,
    };
    setRecentBids((prev) => [pendingBid, ...(prev || [])].slice(0, 5));

    try {
      const res = await emitWithAck(
        socketRef.current,
        "place-bid",
        { auctionId: Number(id), amount: amountNum },
        8000
      );

      if (!res || !res.ok) {
        // remove pending
        setRecentBids((prev) => prev.filter((b) => b.id !== pendingId));
        if (res?.minAccept) {
          alert("Bid too low. Minimum accepted: " + res.minAccept);
          // re-sync
          try {
            const snap = await fetchSnapshot(id);
            applySnapshot(snap);
          } catch (e) {}
        } else {
          alert("Bid failed: " + (res?.error || "unknown"));
        }
        return;
      }

      // success ack: server will broadcast bid:update to everyone (including us)
      // If server provides bid in ack, update immediately
      if (res.bid) {
        setRecentBids((prev) => {
          const withoutPending = (prev || []).filter(
            (b) => b.id !== pendingId && String(b.id) !== String(res.bid.id)
          );
          return [res.bid, ...withoutPending].slice(0, 5);
        });
        if (typeof res.seq !== "undefined") setSeq(Number(res.seq));
      }
    } catch (err) {
      // timeout or network error
      setRecentBids((prev) => prev.filter((b) => b.id !== pendingId));
      console.error("place-bid error", err);
      alert("Network error placing bid. Please try again.");
      // resync to be safe
      try {
        const snap = await fetchSnapshot(id);
        applySnapshot(snap);
      } catch {}
    } finally {
      setPlacing(false);
      setBidAmount("");
    }
  };

  if (loading)
    return (
      <div className="p-8">
        <LoadingOverlay loading={true} />
      </div>
    );
  if (err) return <div className="p-8 text-red-600">Error: {err}</div>;
  if (!auction) return <div className="p-8">Auction not found.</div>;

  const imgSrc = `${API_BASE}/${auction.image_url}`;
  const price = Number(auction.current_price ?? auction.start_price ?? 0);
  const startingBid = Number(auction.start_price);

  const renderedBids = recentBids.map((bid) => {
    return (
      <div key={bid.id} className="flex justify-between">
        <div>{bid.bidder_name ?? bid.bidder_id}</div>
        <div>
          ₹{Number(bid.amount).toLocaleString("en-IN")}
          {bid.pending ? " (pending)" : ""}
        </div>
        <div className="hidden md:block">
          {bid.created_at ? new Date(bid.created_at).toLocaleString() : ""}
        </div>
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
                  {auction.seller_name === user?.name
                    ? "You"
                    : auction.seller_name}
                </p>
              </span>
            </div>

            <div className="flex justify-between">
              <div className="text-lg font-semibold">
                Starting Bid: ₹{startingBid.toLocaleString("en-IN")}
              </div>
              <div className="text-lg font-semibold">
                Current Bid: ₹{price.toLocaleString("en-IN")}
              </div>
            </div>

            <div className="text-sm text-gray-600">
              Starts:{" "}
              {auction.start_time
                ? new Date(auction.start_time).toLocaleString()
                : "—"}
              <br />
              Ends:{" "}
              {auction.end_time
                ? new Date(auction.end_time).toLocaleString()
                : "—"}
            </div>

            <div className="">
              <Input
                type="number"
                label="Your Bid Amount (₹)"
                placeholder="Enter your bid"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
              />
              <button
                onClick={handlePlaceBidClick}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
                disabled={placing}
              >
                {placing ? "Placing..." : "Place Bid"}
              </button>
            </div>
          </div>
        </div>

        {/* Bidding history */}
        <div>
          <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">
            Bidding History
          </h2>
          <div className="text-sm mt-3 text-gray-700 space-y-2">
            <div className="flex justify-between font-medium">
              <div>Bidder</div>
              <div>Bid Amount</div>
              <div className="hidden md:block">Time</div>
            </div>
            <div>{renderedBids}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuctionDescPage;
