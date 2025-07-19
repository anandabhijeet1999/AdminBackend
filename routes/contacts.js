import express from 'express';
import auth from '../middleware/auth.js';
import multer from 'multer';
import { uploadContacts, getContactsByAgent } from '../controllers/contactController.js';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/upload', auth, upload.single('file'), uploadContacts);
router.get('/:agentId', auth, getContactsByAgent);

export default router;
