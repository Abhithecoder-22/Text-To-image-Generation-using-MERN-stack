const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// use sharp for image manipulation
const sharp = require('sharp'); 
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/api/generate-image', async (req, res) => {
  const { text } = req.body;

  // If the text input is not provided or empty, send an error message
  if (!text) {
    return res.status(400).json({ error: 'Text input is missing' });
  }

  try {
    const imageBuffer = await sharp(Buffer.from(text)).resize(400, 400).toBuffer();
    res.set('Content-Type', 'image/png/jpg/gif');
    res.send(imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});