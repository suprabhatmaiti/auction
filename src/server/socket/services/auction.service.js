import { pool } from "../../config/db.js";

export async function placeBid({ auctionId, userId, amount }) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const r = await client.query(
      `SELECT id, current_price as current_highest_bid,min_increment,end_time,status FROM auctions WHERE id = $1 FOR UPDATE`,
      [auctionId]
    );
    if (r.rowCount === 0) {
      throw new Error("Auction_not_found");
    }
    const auction = r.rows[0];
    if (auction.status !== "open") {
      throw new Error("auction_closed");
    }
    if (auction.end_time && new Date(auction.end_time) < new Date()) {
      throw new Error("auction_ended");
    }
    const current = Number(auction.current_highest_bid || 0);
    const minInc = Number(auction.min_increment || 1);
    if (amount < current + minInc) {
      const err = new Error("low_bid_amount");
      err.lowAmount = current_minInc;
      throw err;
    }

    const ins = await client.query(
      `INSERT INTO bids (auction_id, user_id, amount) VALUES ($1,$2,$3) RETURNING id, created_at`,
      [auctionId, userId, amount]
    );
    const bidRow = ins.rows[0];
    const EXTEND_MS = 20 * 1000;

    let endTime = auction.end_time ? new Date(auction.ends_at) : null;
    const now = new Date();
    if (endTime && endTime - now < EXTEND_MS) {
      endTime = new Date(endTime.getTime() + EXTEND_MS);
    }
    await client.query(
      `UPDATE auctions SET current_price=$1, current_highest_bid_id=$2,seq=COALESCE(seq,0)+1, end_time=$3 WHERE id = $4 `,
      [amount, bidRow.id, newEndsAt, auctionId]
    );

    const seqR = await client.query(`SELECT seq FROM auctions WHERE id=$1`, [
      auctionId,
    ]);
    const seq = seqR.rows[0].seq;

    await client.query("COMMIT");

    return {
      ok: true,
      bid: {
        id: bidRow.id,
        auctionId,
        userId,
        amount,
        createdAt: bidRow.created_at,
      },
      seq,
      endsAt: endTime,
    };
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    throw error;
  } finally {
    client.release();
  }
}
