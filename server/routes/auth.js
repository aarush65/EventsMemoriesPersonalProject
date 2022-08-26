import express from "express";
import {getToken, getRefreshToken} from '../controllers/auth.js';
const router = express.Router();

router.post('/',getToken);
router.post('/refresh-token', getRefreshToken);



export default router;