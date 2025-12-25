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
    `SELECT 
      b.id AS bid_id,
      u.name AS bidder_name,
      b.amount AS bid_amount,
      b.created_at AS bid_time
    FROM bids b
    JOIN users u ON b.bidder_id = u.id
    WHERE b.auction_id = $1
    ORDER BY b.created_at DESC
    LIMIT 20`,
    [auctionId]
  );
  return {
    auctionId,
    isActive: auction.is_active,
    seq: Number(auction.seq || 0),
    current_price: auction.current_price,
    end_time: auction.end_time,
    recent_bids: bids.rows,
  };
}
