import api from "./api";

async function withTimeout(ms = 5000, promise) {
  let t;
  const timeout = new Promise((_, reject) => {
    t = setTimeout(() => reject(new Error("timeout")), ms);
  });
  return Promise.race([p, timeout]).finally(() => clearTimeout(t));
}

function narmalize(snap, auctionId) {
  if (!snap) return null;
  return {
    auctionId: Number(snap.auctionId ?? auctionId),
    seq: Number(snap.seq ?? 0),
    current_price: Number(snap.current_price ?? snap.current_highest_bid ?? 0),
    end_time: snap.end_time ?? snap.endsAt ?? snap.ends_at ?? null,
    recentBids: snap.recentBids ?? snap.recent_bids ?? snap.bids ?? [],
    raw: snap,
  };
}

export async function fetchSnapshotRobust(auctionId) {
  const res = await withTimeout(
    5000,
    api.get(`/api/auctions/get-auction/${auctionId}/snapshot`)
  );
  return narmalize(res.data ?? res, auctionId);
}

let pendingPromises = null;

export async function fetchSnapshotDebounced(auctionId, wait = 300) {
  if (pendingPromises) {
    return pendingPromises;
  }
  pendingPromises = new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const snap = await fetchSnapshotRobust(auctionId);
        resolve(snap);
      } catch (err) {
        reject(err);
      } finally {
        pendingPromises = null;
      }
    }, wait);
  });
  return pendingPromises;
}
