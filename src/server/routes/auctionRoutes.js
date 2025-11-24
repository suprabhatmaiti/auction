import express from "express";
import {
  createAuction,
  getAuctions,
  getAuctionById,
  getAuctionSnap,
} from "../controllers/auctionController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { uploadProductImages } from "../lib/upload.js";

const router = express.Router();

router.post(
  "/create",
  verifyToken,
  uploadProductImages.single("image"),
  createAuction
);
router.get("/get-auctions", verifyToken, getAuctions);
router.get("/get-auction/:id", verifyToken, getAuctionById);
router.get("/get-auction/:id/snapshot", verifyToken, getAuctionSnap);

export default router;
