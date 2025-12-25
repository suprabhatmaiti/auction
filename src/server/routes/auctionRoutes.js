import express from "express";
import {
  createAuction,
  getAuctions,
  getAuctionById,
  endAuction,
  getUnapprovedAuctions,
  approveAuction,
  finalizeExpiredAuctions,
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
router.get("/end-auction/:id", verifyToken, endAuction);
router.get("/get-unapproved-auctions", verifyToken, getUnapprovedAuctions);
router.post("/approve-auction/:id", verifyToken, approveAuction);
router.post("/finalize-expired-auction", finalizeExpiredAuctions);

export default router;
