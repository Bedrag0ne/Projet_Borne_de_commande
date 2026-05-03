const db = require("../db/database");

function getAllProducts() {
  const promise = new Promise((resolve,reject) => {
    db.all(
      `
      SELECT articles.id, articles.name, articles.price_cents, images.name AS thumbnail
      FROM articles
      JOIN images ON  articles.image_id = images.id
      WHERE articles.restaurant_id = 1;
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