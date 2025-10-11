var express = require('express');
var router = express.Router();

// Import the outfits array from closet.js for demo (simulate shared data)
const closet = require('./closet');

// For demo, use a hardcoded vote count
let voteCount = 42;

router.get('/', function(req, res, next) {
  // Try to get outfits from closet.js (if exported), else use a static number
  let outfitCount = closet.getOutfitCount ? closet.getOutfitCount() : 2;
  res.render('stats', {
    title: 'Style Stats',
    outfitCount,
    voteCount
  });
});

module.exports = router;
