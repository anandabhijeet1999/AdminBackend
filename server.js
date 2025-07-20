import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

import authRoutes from './routes/auth.js';
import agentRoutes from './routes/agents.js';
import contactRoutes from './routes/contacts.js';

const app = express();
let PORT = process.env.PORT || 8000;
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', ]
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/contacts', contactRoutes);

app.listen(PORT, () => {
  console.log(" Sever is running on  ", `http://localhost:${PORT}`);
});

