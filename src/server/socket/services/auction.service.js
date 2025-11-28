import { pool } from "../../config/db.js"; // adjust path if needed

export async function placeBid({ auctionId, userId, bidAmount }) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // lock auction row
    const r = await client.query(
      `SELECT id, current_price , min_increment, end_time, status
       FROM auctions WHERE id = $1 FOR UPDATE`,
      [auctionId]
    );

    if (r.rowCount === 0) {
      throw new Error("auction_not_found");
    }

    const auction = r.rows[0];

    if (auction.status !== "open") {
      throw new Error("auction_closed");
    }

    if (auction.end_time && new Date(auction.end_time) < new Date()) {
      throw new Error("auction_ended");
    }

    const current = Number(auction.current_price || 0);
    const minInc = Number(auction.min_increment || 1);
    const amount = Number(bidAmount);

    console.log(amount);
    if (Number.isNaN(amount) || amount <= 0) {
      const err = new Error("invalid_amount");
      throw err;
    }

    if (amount < current + minInc) {
      const err = new Error("low_bid_amount");
      err.minAccept = current + minInc;
      throw err;
    }

    // insert bid
    const ins = await client.query(
      `INSERT INTO bids (auction_id, bidder_id, amount) VALUES ($1, $2, $3) RETURNING id, created_at`,
      [auctionId, userId, amount]
    );
    const bidRow = ins.rows[0];

    // anti-sniping extension
    const EXTEND_MS = 20 * 1000;
    let newEndTime = auction.end_time ? new Date(auction.end_time) : null;
    const now = new Date();
    if (newEndTime && newEndTime - now < EXTEND_MS) {
      newEndTime = new Date(newEndTime.getTime() + EXTEND_MS);
    }

    // update auction row: current_price, highest bid id, seq, end_time
    await client.query(
      `UPDATE auctions
       SET current_price = $1,
           current_highest_bid_id = $2,
           seq = COALESCE(seq, 0) + 1,
           end_time = $3
       WHERE id = $4`,
      [bidAmount, bidRow.id, newEndTime, auctionId]
    );

    const seqR = await client.query(`SELECT seq FROM auctions WHERE id = $1`, [
      auctionId,
    ]);
    const seq = seqR.rows[0].seq;

    await client.query("COMMIT");

    return {
      ok: true,
      bid: {
        id: bidRow.id,
        auctionId,
        bidder_id: userId,
        amount: bidAmount,
        created_at: bidRow.created_at,
      },
      seq,
      endsAt: newEndTime,
    };
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    throw error;
  } finally {
    client.release();
  }
}
