const productsModel = require('../models/productsModel');

async function getAllProducts() {
  const products = [];
  const rows = await productsModel.getAllProducts();
  for (const row of rows) {
    products.push({
      id: row.id,
      name: row.name,
      priceCents: row.price_cents,
      thumbnail: row.thumbnail
    });
  }
  return products;
}

module.exports = {
  getAllProducts
};