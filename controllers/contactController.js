import Contact from '../models/Contact.js';
import Agent from '../models/Agent.js';
import { parse } from 'csv-parse';
import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import distributeContacts from '../utils/distributeContacts.js';

// Helper to get a field from possible column names
function getField(obj, possibleNames) {
  for (const name of possibleNames) {
    if (obj[name] !== undefined && obj[name] !== "") return obj[name];
  }
  return undefined;
}

const possibleFirstNames = ['FirstName', 'firstname', 'first_name', 'first name', 'Name', 'name'];
const possiblePhones = ['Phone', 'phone', 'PhoneNumber', 'phone_number', 'phone number'];

export const uploadContacts = async (req, res) => {
  if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });

  let contacts = [];
  const ext = path.extname(req.file.originalname).toLowerCase();

  try {
    if (ext === '.csv') {
      const fileContent = fs.readFileSync(req.file.path);
      parse(fileContent, { columns: true, trim: true }, async (err, records) => {
        if (err) return res.status(400).json({ msg: 'Invalid CSV file' });
        contacts = records;
        await processContacts(contacts, res);
      });
    } else if (ext === '.xlsx' || ext === '.xls') {
      const workbook = XLSX.readFile(req.file.path);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      contacts = XLSX.utils.sheet_to_json(sheet);
      await processContacts(contacts, res);

    } else {
      return res.status(400).json({ msg: 'Invalid file type' });
    }
  } catch (err) {
    res.status(500).send('Server error');
  }
};

async function processContacts(contacts, res) {
  if (!contacts.every(c => getField(c, possibleFirstNames) && getField(c, possiblePhones))) {
    const columns = contacts[0] ? Object.keys(contacts[0]) : [];
    return res.status(400).json({ msg: 'Invalid file structure', columns });
  }
  const agents = await Agent.find();
  if (agents.length === 0) return res.status(400).json({ msg: 'No agents found' });

  const distributed = distributeContacts(contacts, agents);

  let allContacts = [];
  for (const agentId in distributed) {
    const agentContacts = distributed[agentId].map(c => ({
      firstName: getField(c, possibleFirstNames),
      phone: getField(c, possiblePhones),
      notes: c.Notes || c.notes || '',
      agent: agentId
    }));
    const saved = await Contact.insertMany(agentContacts);
    allContacts = allContacts.concat(saved);
  }
  res.json({ msg: 'Contacts uploaded and distributed', contacts: allContacts });
}

export const getContactsByAgent = async (req, res) => {
  try {
    const contacts = await Contact.find({ agent: req.params.agentId });
    res.json(contacts);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
