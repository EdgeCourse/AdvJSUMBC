const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Configure multer to save uploaded files
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

app.use(express.static('public')); // Serve static HTML

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
  console.log('Uploaded:', req.file.originalname);
  res.send(`✅ File uploaded as ${req.file.originalname}`);
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
