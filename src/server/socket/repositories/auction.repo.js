import { pool } from "../../config/db.js";
export async function getAuctionById(auctionId) {
  const res = await pool.query("SELECT * FROM auctions WHERE id = $1", [
    auctionId,
  ]);
  return res.rows[0] || null;
}
export async function getAuctionSnapshot(auctionId) {
  const auction = await getAuctionById(auctionId);
  if (!auction) return null;
  const bids = await pool.query(
    "SELECT id,bidder_id,amount,created_at from bids WHERE auction_id=$1 ORDER BY created_at DESC LIMIT 20",
    [auctionId]
  );
  return {
    auctionId,
    seq: Number(auction.seq || 0),
    current_price: auction.current_price,
    end_time: auction.end_time,
    recent_bids: bids.rows,
  };
}
