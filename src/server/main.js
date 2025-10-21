import express from "express";
import ViteExpress from "vite-express";
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'
import auctionRoutes from './routes/auctionRoutes.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/auction",auctionRoutes);


app.get("/api", (req, res) => {
  res.send(" Vite + React!");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);