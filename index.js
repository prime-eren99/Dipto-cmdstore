const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Endpoint to get command URLs
app.get('/commands', (req, res) => {
  const cmdUrlsPath = path.join(__dirname, 'cmdUrls.json');
  fs.readFile(cmdUrlsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading cmdUrls.json:', err);
      return res.status(500).send('Internal Server Error');
    }
    try {
      const cmdUrls = JSON.parse(data);
      res.json(cmdUrls);
    } catch (parseErr) {
      console.error('Error parsing cmdUrls.json:', parseErr);
      res.status(500).send('Internal Server Error');
    }
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to Dipto-cmdstore API!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
