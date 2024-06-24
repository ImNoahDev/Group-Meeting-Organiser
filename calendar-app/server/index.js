// server/index.js
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const DATA_FILE = path.join(__dirname, 'dates.json');

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Get all dates
app.get('/api/dates', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) {
      console.error(`Error reading dates.json: ${err}`);
      return res.status(500).send(err);
    }
    const dates = JSON.parse(data);
    res.send(dates);
  });
});

// Update dates
app.post('/api/dates', (req, res) => {
  const dates = req.body;
  fs.writeFile(DATA_FILE, JSON.stringify(dates), (err) => {
    if (err) {
      console.error(`Error writing dates.json: ${err}`);
      return res.status(500).send(err);
    }
    console.log(`[${new Date().toISOString()}] Updated dates.json with:`, dates);
    res.send(dates);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
