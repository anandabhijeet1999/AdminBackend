import Agent from '../models/Agent.js';
import bcrypt from 'bcryptjs';

export const addAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    let agent = await Agent.findOne({ email });
    if (agent) return res.status(400).json({ msg: 'Agent already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    agent = new Agent({ name, email, mobile, password: hashedPassword });
    await agent.save();
    res.json(agent);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

export const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
