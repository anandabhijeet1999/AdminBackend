import express from 'express';
import { login, sinup } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/sinup', sinup);

export default router;
