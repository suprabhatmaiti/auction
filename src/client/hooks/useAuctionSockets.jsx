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
    setLoading(true);
    setSeq(Number(snap.seq ?? 0));
    setRecentBids(snap.recent_bids ?? []);
    setAuction((prev) => ({
      ...(prev || {}),
      current_price: Number(snap.current_price),
      end_time: snap.end_time,
    }));
    setLoading(false);
    setError(null);
  }, []);

  const fetchSnapshot = useCallback(async () => {
    const snap = await fetchSnapshotDebounced(auctionId);
    applySnapshot(snap);
  }, [auctionId, applySnapshot]);

  const emitWithAck = useCallback((event, data) => {
    if (!socketRef.current) return;

  useEffect(() => {
  }, []);
}
