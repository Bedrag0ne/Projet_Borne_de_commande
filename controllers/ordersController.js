const ordersService = require('../services/ordersService');

async function createOrder(req,res) {
  try {
    const {items,restaurantId} = req.body;
    const order = await ordersService.createOrder(items,restaurantId);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Server Error"});
  }
}

async function getAllOrders(req,res){
  try {
    const orders = await ordersService.getAllOrders();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Server Error"});
  }
}

async function getOrderById(req,res) {
  try {
    const id = req.params.id;
    const orders = await ordersService.getOrderById(id);
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Server Error"});
  }
}

async function getAllItems(req,res) {
  try {
    const items = await ordersService.getAllItems();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Server Error"});
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getAllItems
};