import express from 'express';
import { createAuction } from "../controllers/auctionController.js";
import {verifyToken} from '../middleware/verifyToken.js'
import { upload } from '../lib/upload.js';

const router = express.Router();

router.post("/create",verifyToken, upload.single("image"),createAuction);

export default router;