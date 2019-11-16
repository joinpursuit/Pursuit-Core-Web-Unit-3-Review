const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.json({
    payload: "This is /tags",
    err: false
  })
});

module.exports = router;
