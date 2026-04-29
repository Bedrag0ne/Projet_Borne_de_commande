const articlesService = require('../services/articlesService');

async function getAllProducts(req, res) {
  try {
    const products = await articlesService.getAllProducts();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

module.exports = {
  getAllProducts
};