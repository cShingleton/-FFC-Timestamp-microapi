const express = require('express');
const path = require('path');
const router = express.Router();

// GET /
// Get homepage
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// GET /:date
router.get('/:date', (req, res, next) => {
  
  
  // if the first character is a letter
  if (/[a-z]/i.test(req.params.date.charAt(0))) {
    const formatDateParam = `${req.params.date} 12:00:00`;
    const asUnix = Math.round((new Date(formatDateParam)).getTime() / 1000);
    const asNatural = req.params.date.replace(/[-]/g, ' ');
    res.json({
      unix: asUnix,
      natural: (!asUnix) ? null : asNatural
    });
  
  // if the first character is a number 
  } else if (/[0-9]/i.test(req.params.date.charAt(0))) {
    const humanDate = new Date(req.params.date * 1000);
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const year = humanDate.getFullYear();
    const month = months[humanDate.getMonth()];
    const date = humanDate.getDate();
    const formattedDate = `${month} ${date}, ${year}`;

    res.json({
      unix: (isNaN(humanDate)) ? null : parseInt(req.params.date),
      natural: (isNaN(humanDate)) ? null : formattedDate
    });
  }
  
});

module.exports = router;
