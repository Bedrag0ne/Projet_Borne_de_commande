const db = require("../db/database");

function insertOrder(restaurantId){
  const dt = new Date().toISOString().split('T')[0];
  const promise = new Promise((resolve,reject) => {
    db.run(
      `INSERT INTO orders (order_date,status,restaurant_id) VALUES (?,?,?)`,
      [dt,'preparing',restaurantId],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
  return promise;
}

async function insertOrderItem({orderId,articleId,quantity,restaurantId}){
  const unitPriceCents = await getUnitPriceCents(articleId,restaurantId);
  const promise = new Promise((resolve,reject) => {
    db.run(
      'INSERT INTO order_items (order_id,article_id,quantity,unit_price_cents,restaurant_id) VALUES (?,?,?,?,?)',
      [orderId,articleId,quantity,unitPriceCents,restaurantId],
      function (err) {
        if (err) reject(err);
        else resolve();
      }
    );
  });
  return promise;
}

function getUnitPriceCents(articleId,restaurantId) {
  const promise = new Promise((resolve, reject) => {
    db.get(
      "SELECT price_cents FROM articles WHERE id = ? AND restaurant_id = ?",
      [articleId, restaurantId],
      (err, row) => {
        if (err) reject(err);
        else resolve(row ? row.price_cents : null);
      }
    );
  });
  return promise;
}

function getAllOrders() {
  const promise = new Promise((resolve, reject) => {
    db.all("SELECT * FROM orders", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
  return promise;
}

function getOrderById(id) {
  const promise = new Promise((resolve, reject) => {
    db.all("SELECT * FROM orders WHERE id = ?", [id], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
  return promise;
}

function getAllItems() {
  const promise = new Promise((resolve, reject) => {
    db.all("SELECT * FROM order_items", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
  return promise;
}

module.exports = {
  insertOrder,
  insertOrderItem,
  getAllOrders,
  getOrderById,
  getAllItems
};