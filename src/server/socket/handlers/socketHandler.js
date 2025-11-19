export function socketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("a user connected:", socket.id);

    socket.on("ping", (cb) => {
      console.log("Ping received from client:", socket.id);
      cb(`Pong from server to ${socket.id}`);
    });

    socket.on("auction:join", async ({ auctionId }) => {
      socket.join(`auction:${auctionId}`);
      // get all socket objects in this room
      const sockets = await io.in(`auction:${auctionId}`).fetchSockets();

      // list of socket IDs
      const socketIds = sockets.map((s) => s.id);

      // list of user IDs (if authenticated)
      const userIds = sockets.map((s) => s.user?.id);

      console.log("Sockets in room:", socketIds);
      console.log("Users in room:", userIds);
    });

    // if (socket.room.has("auction:123")) {
    //   console.log(`Socket ${socket.id} is in the user room.`);
    // }
    socket.on("auction:leave", ({ auctionId }) => {
      socket.leave(`auction:${auctionId}`);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected:", socket.id);
    });
  });
}
