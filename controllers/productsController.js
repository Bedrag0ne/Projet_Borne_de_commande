const productsService = require('../services/productsService');

async function getAllProducts(req, res) {
  try {
    const products = await productsService.getAllProducts();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

module.exports = {
  getAllProducts
};