const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders');

router.get('/users/:userId', orderController.getUserOrders);
router.get('/:id', orderController.getOrderById);

router.post('/', orderController.addOrder);
module.exports = router;
