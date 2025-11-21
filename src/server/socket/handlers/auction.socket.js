import {
  getAuctionById,
  getAuctionSnapshot,
} from "../repositories/auction.repo.js";

export function auctionHandler(io) {
  io.on("connection", (socket) => {
    console.log("a user connected:", socket.id);

    socket.on("ping", (cb) => {
      console.log("Ping received from client:", socket.id);
      cb(`Pong from server to ${socket.id}`);
    });

    socket.on("auction:join", async ({ auctionId }, cb) => {
      try {
        if (!socket.user) return cb?.({ ok: false, error: "unauthenticated" });
        const auction = await getAuctionById(auctionId);
        if (!auction) return cb?.({ ok: false, error: "not_found" });
        await socket.join(`auction:${auctionId}`);

        const snapshot = await getAuctionSnapshot(auctionId);
        socket.emit("auction:snapshot", snapshot);
        const room = io.sockets.adapter.rooms.get(`auction:${auctionId}`);
        const count = room ? room.size : 0;
        io.to(`auction:${auctionId}`).emit("presence:update", { count });

        return cb?.({ ok: true, snapshot });
      } catch (error) {
        console.error(error);
        return cb?.({ ok: false, error: "server_error" });
      }
    });

    socket.on("auction:leave", ({ auctionId }) => {
      socket.leave(`auction:${auctionId}`);
      const room = io.sockets.adapter.rooms.get(`auction:${auctionId}`);
      const count = room ? room.size : 0;
      io.to(`auction:${auctionId}`).emit("presence:update", { count });
      cb?.({ ok: true });
    });

    socket.on("place-bid", ({ auctionId, amount }, cb) => {
      if (!socket.user) return cb?.({ ok: false, error: "unauthenticated" });
      if (typeof amount !== "number" || amount <= 0)
        return cb?.({ ok: false, error: "invalid_amount" });

      const bid = {
        id: `temp-${Date.now()}`,
        auctionId,
        userId: socket.user.sub || socket.user.id,
        amount,
        createdAt: new Date().toISOString(),
      };

      io.to(`auction:${auctionId}`).emit("bid:update", { auctionId, bid });
      return cb?.({ ok: true, bid });
    });

    socket.on("disconnect", () => {
      console.log("user disconnected:", socket.id);
    });
  });
}
