import {
  getAuctionById,
  getAuctionSnapshot,
} from "../repositories/auction.repo.js";
import { placeBid } from "../services/auction.service.js";

export function auctionHandler(io) {
  io.on("connection", (socket) => {
    console.log("a user connected:", socket.id);

    socket.on("ping", (cb) => {
      console.log("Ping received from client:", socket.id);
      cb(`Pong from server to ${socket.id}`);
    });

    socket.on("auction:join", async ({ auctionId }, cb) => {
      try {
        if (!auctionId) return cb?.({ ok: false, error: "invalid_auction_id" });

        if (!socket.user) return cb?.({ ok: false, error: "unauthenticated" });

        const auction = await getAuctionById(auctionId);
        if (!auction) return cb?.({ ok: false, error: "not_found" });

        await socket.join(`auction:${auctionId}`);

        const snapshot = await getAuctionSnapshot(auctionId);
        socket.emit("auction:snapshot", snapshot);

        const room = io.sockets.adapter.rooms.get(`auction:${auctionId}`);
        const count = room ? room.size : 0;
        io.to(`auction:${auctionId}`).emit("presence:update", { count });

        return cb?.({
          ok: true,
          snapshot,
          recent_bids: snapshot.recent_bids ?? [],
        });
      } catch (error) {
        console.error("auction:join error:", err);
        return cb?.({ ok: false, error: "server_error" });
      }
    });
    socket.on("auction:snapshot", async ({ auctionId }, cb) => {
      try {
        const snapshot = await getAuctionSnapshot(auctionId);
        socket.emit("auction:snapshot", snapshot);
        return cb?.({ ok: true, snapshot });
      } catch (error) {
        return cb?.({ ok: false, error: "Server Error" });
      }
    });

    socket.on("auction:leave", ({ auctionId }) => {
      try {
        socket.leave(`auction:${auctionId}`);
        const room = io.sockets.adapter.rooms.get(`auction:${auctionId}`);
        const count = room ? room.size : 0;
        io.to(`auction:${auctionId}`).emit("presence:update", { count });
        cb?.({ ok: true });
      } catch (error) {
        console.error("auction:leave error:", err);
        return cb?.({ ok: false, error: "server_error" });
      }
    });

    socket.on("place-bid", async ({ auctionId, amount }, cb) => {
      try {
        if (!socket.user) return cb?.({ ok: false, error: "unauthenticated" });
        const userId = socket.user.id;
        if (typeof amount !== "number" || amount <= 0)
          return cb?.({ ok: false, error: "invalid_amount" });
        const result = await placeBid({ auctionId, userId, amount });
        console.log(result);

        io.to(`auction:${auctionId}`).emit("bid:update", {
          auctionId,
          bid: result.bid,
          seq: result.seq,
          endsAt: result.endsAt,
        });
        return cb?.({
          ok: true,
          bid: result.bid,
          seq: result.seq,
          endsAt: result.endsAt,
        });
      } catch (error) {
        console.log(error);
        const response = { ok: false, error: error.message };
        if (error.minAccept) {
          response.minAccept = error.minAccept;
        }
        return cb?.(response);
      }
    });

    socket.on("disconnect", () => {
      console.log("user disconnected:", socket.id);
    });
  });
}
