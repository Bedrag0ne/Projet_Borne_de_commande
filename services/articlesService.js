const articlesModel = require('../models/articlesModel');

async function getAllProducts() {
  const products = {};
  const rows = await articlesModel.getAllProducts();

  for (const row of rows) {
    if (!products[row.id]) {
      products[row.id] = {
        id: row.id,
        name: row.name,
        basePriceCents: row.base_price_cents,
        productImage: row.product_image,
        sizes: []
      };
    }

    if (row.size_id !== null) {
      products[row.id].sizes = products[row.id].sizes.concat([{
        sizeId: row.size_id,
        sizeName: row.size_name,
        sizePriceCents: row.size_price_cents,
        sizeImage: row.size_image
      }]);
    } else {
      products[row.id].sizes = null;
    }
  }
  return Object.values(products);
}

module.exports = {
  getAllProducts
};