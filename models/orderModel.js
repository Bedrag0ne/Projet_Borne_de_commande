const db = require("../db/database");

function createOrder(items, total) {
  db.run("INSERT INTO orders (items, total) VALUES (?, ?)",
    [JSON.stringify(items), total]);
}

module.exports = {
  createOrder
};