const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();


// Route for serving the 'contactus.html' file
router.get('/contactus', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'contactus.html'));
});

// Route for handling the form submission
router.post('/contactus', (req, res, next) => {
  // Process the form data here (save to database, send email, etc.)

  // Redirect to '/success' with a success message
  res.redirect('/success');
});

// Route for showing the success message
router.get('/success', (req, res, next) => {
  res.send('Form successfully filled');
});

module.exports = router;
  

