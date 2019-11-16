const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.json({
    payload: "Welcome. Read the Docs before starting",
    err: false
  })
});

module.exports = router;
