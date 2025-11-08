import express from 'express';
import { createAuction, getAuctions } from '../controllers/auctionController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { upload } from '../lib/upload.js';

const router = express.Router();

router.post('/create', verifyToken, upload.single('image'), createAuction);
router.get('/get-auctions', verifyToken, getAuctions);

export default router;
