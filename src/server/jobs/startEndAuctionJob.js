import cron from "node-cron";
import { pool } from "../config/db.js";

export const startEndAuctionJob = () => {
  // Run every 15 seconds
  cron.schedule("*/10 * * * * *", async () => {
    try {
      const result = await pool.query(
        `UPDATE auctions
         SET status = 'ended', updated_at = NOW()
         WHERE end_time < NOW() AND status != 'ended'
         RETURNING id, title, status`,
      );

      if (result.rows.length > 0) {
        console.log(
          `[${new Date().toISOString()}] Ended ${result.rows.length} auction(s):`,
          result.rows.map((row) => `${row.id} - ${row.title}`),
        );
      }
    } catch (error) {
      console.error("Error in endAuctionJob:", error);
    }
  });

  console.log("End Auction Job started - checking every 10 seconds");
};
