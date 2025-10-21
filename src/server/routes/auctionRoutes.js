import express from 'express';
import { createAuction } from "../controllers/auctionController.js";
import {verifyToken} from '../middleware/verifyToken.js'

const router = express.Router();

router.post("/create",verifyToken,createAuction);

export default router;