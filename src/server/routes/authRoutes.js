import express from 'express';
import {refreshToken,register, login} from '../controllers/authController.js'

const router = express.Router();

router.post("/register",register);

router.post("/login",login);
router.post("/refresh-token",refreshToken);

export default router;

