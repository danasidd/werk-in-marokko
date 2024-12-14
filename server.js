// server.js
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name from the current module's URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 3003;

// Enable CORS
app.use(cors());

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Root route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API route to fetch jobs
app.get('/api/jobs', async (req, res) => {
  const bearerToken = process.env.LOXO_BEARER_TOKEN;

  const myHeaders = {
    Authorization: `Bearer ${bearerToken}`,
  };

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  try {
    const response = await fetch("https://app.loxo.co/api/linkrs/jobs?query=country_code=MA", requestOptions);
    const result = await response.json();
    
    // Log the entire result to see its structure
    console.log('API Response:', result);

    // Check if the expected data structure exists
    if (result && result.jobs && result.jobs.length > 0) {
      res.json(result);
    } else {
      res.status(200).send('No job listings found.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching job listings');
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});