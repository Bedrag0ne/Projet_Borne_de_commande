const express = require('express');
const router = express.Router();

const controller = require('../controllers/ordersController');

router.post('/orders', controller.createOrder);
router.get('/orders', controller.getAllOrders);
router.get("/orders/items", controller.getAllItems);
router.get("/orders/:id", controller.getOrderById);


module.exports = router;