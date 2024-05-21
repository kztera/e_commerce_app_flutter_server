const express = require('express');
const router = express.Router();

const checkoutController = require('../controllers/checkout');

router.post('/momo', checkoutController.checkout);

module.exports = router;
