import express from "express";
import ViteExpress from "vite-express";
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'
import auctionRoutes from './routes/auctionRoutes.js'

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:3000",  
  credentials: true
}));

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

app.use("/api/auth",authRoutes);
app.use("/api/auction",auctionRoutes);


app.get("/api", (req, res) => {
  res.send(" Vite + React!");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);