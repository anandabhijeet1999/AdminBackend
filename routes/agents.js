import express from 'express';
import auth from '../middleware/auth.js';
import { addAgent, getAgents } from '../controllers/agentController.js';

const router = express.Router();

router.post('/', auth, addAgent);
router.get('/', auth, getAgents);

export default router;
