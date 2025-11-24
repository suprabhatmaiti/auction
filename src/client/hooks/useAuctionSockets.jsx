import { useRef, useState } from "react";

export default function useAuctionSocket(auctionId) {
  const socketRef = useRef(null);
  const [auction, setAuction] = useState(null);
  const [recentBids, setRecentBids] = useState([]);
  const [seq, setSeq] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const applySnapshot = useCallback((snap) => {
    if (!snap) return;
    setSeq(Number(snap.seq ?? 0));
    setRecentBids(snap.recentBids ?? []);
    setAuction((prev) => ({
      ...(prev || {}),
      //   ...snap.raw,
      current_price: snap.current_price,
      end_time: snap.end_time,
    }));
  }, []);

  const placeBid = async (amount) => {};
}
