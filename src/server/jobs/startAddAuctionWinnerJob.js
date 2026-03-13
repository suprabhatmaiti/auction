import cron from "node-cron";
import { pool } from "../config/db.js";

export const startAddAuctionWinnerJob = () => {
  // Run every 10 seconds
  cron.schedule("*/10 * * * * *", async () => {
    try {
      // Find ended auctions without a winner
      const endedAuctions = await pool.query(
        `
        SELECT DISTINCT a.id, a.seller_id
        FROM auctions a
        WHERE a.status = 'ended' 
        AND a.winner_id IS NULL
        `,
      );

      if (endedAuctions.rows.length === 0) {
        return;
      }

      // Process each ended auction
      for (const auction of endedAuctions.rows) {
        const auctionId = auction.id;
        const sellerId = auction.seller_id;

        // Get the highest bid for this auction
        const highestBid = await pool.query(
          `
          SELECT b.id, b.bidder_id, b.amount
          FROM bids b
          WHERE b.auction_id = $1
          ORDER BY b.amount DESC
          LIMIT 1
          `,
          [auctionId],
        );

        if (highestBid.rows.length > 0) {
          const bid = highestBid.rows[0];

          // Insert into auction_wins table
          await pool.query(
            `
            INSERT INTO auction_wins (seller_id, auction_id, winner_id, winning_bid_id, winning_amount)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (auction_id) DO NOTHING
            `,
            [sellerId, auctionId, bid.bidder_id, bid.id, bid.amount],
          );

          // Update auctions table with winner_id
          await pool.query(
            `
            UPDATE auctions
            SET winner_id = $1, updated_at = NOW()
            WHERE id = $2 AND winner_id IS NULL
            `,
            [bid.bidder_id, auctionId],
          );

          console.log(
            `[${new Date().toISOString()}] Auction ${auctionId} winner assigned: User ${bid.bidder_id} with bid ${bid.amount}`,
          );
        }
      }
    } catch (error) {
      console.error("Error in addAuctionWinnerJob:", error);
    }
  });

  console.log("Add Auction Winner Job started - checking every 10 seconds");
};
