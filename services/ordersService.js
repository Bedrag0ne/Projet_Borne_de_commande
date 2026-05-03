const ordersModel = require('../models/ordersModel');

async function createOrder(items,restaurantId) {
  const orderId = await ordersModel.insertOrder(restaurantId);
  for (const item of items) {
    await ordersModel.insertOrderItem({
      orderId,
      ...item,
      restaurantId
    });
  }
  return {orderId};
}

async function getAllOrders() {
  return await ordersModel.getAllOrders();
}

async function getOrderById(id) {
  return await ordersModel.getOrderById(id);
}

async function getAllItems() {
  return await ordersModel.getAllItems();
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getAllItems
};