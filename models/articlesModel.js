const db = require("../db/database");

function getAllProducts() {
  const promise = new Promise((resolve,reject) => {
    db.all(
      `
      SELECT a.id, a.name, a.base_price_cents, img_a.file_name AS product_image, s.id AS size_id, s.name AS size_name, asz.price_cents AS size_price_cents, img_s.file_name AS size_image
      FROM articles a
      LEFT JOIN images img_a ON  a.image_id = img_a.id
      LEFT JOIN article_sizes asz ON a.id = asz.article_id
      LEFT JOIN sizes s ON asz.size_id = s.id
      LEFT JOIN images img_s ON asz.image_id = img_s.id
      WHERE a.type = 'product';
      `,
      [],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
  });
  return promise;
}


module.exports = {
  getAllProducts
};