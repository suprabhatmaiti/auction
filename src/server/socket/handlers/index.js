import { auctionHandler } from "./auction.socket.js";

export function socketHandlers(io) {
  auctionHandler(io);
}
