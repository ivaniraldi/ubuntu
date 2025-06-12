const express = require('express');
const router = express.Router();

router.get('/index', (req, res) => {
  res.json({
    message: 'Este es el endpoint de la API de índice.',
    data: [],
    timestamp: new Date().toISOString()
  });
});

module.exports = router;