const orderModel = require('../models/orderModel');

function createOrder(req, res) {
  const {items, total} = req.body;

  orderModel.createOrder(items, total);

  res.send('Order created successfully');
}

module.exports = {
  createOrder
};