import express from "express";
import ViteExpress from "vite-express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import auctionRoutes from "./routes/auctionRoutes.js";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server as IOServer } from "socket.io";
import { socketAuth } from "./socket/socketAuth.js";

import { auctionHandler } from "./socket/handlers/auction.socket.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(cors());
// // ✅ Allow only your frontend
// const allowedOrigins = [
//   "http://localhost:3001",   // your React app during development
//   "https://yourfrontend.com" // your production frontend (optional)
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true, // needed for sending cookies or JWTs
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/auction", auctionRoutes);

app.use("/uploads", express.static("uploads"));

app.get("/api", (req, res) => {
  res.send(" Vite + React!");
});

const httpServer = createServer(app);
const io = new IOServer(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    withCredentials: true,
  },
});
socketAuth(io);

auctionHandler(io);

ViteExpress.bind(app, httpServer);

httpServer.listen(PORT, () =>
  console.log(`Server is listening on port ${PORT}...`)
);
