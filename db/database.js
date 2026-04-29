const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Database opened successfully");
  }
});

db.run("PRAGMA foreign_keys = ON");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      file_name TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      image_id INTEGER,
      FOREIGN KEY (image_id) REFERENCES images(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      base_price_cents INTEGER,
      type TEXT NOT NULL,
      category_id INTEGER,
      image_id INTEGER,
      FOREIGN KEY (category_id) REFERENCES categories(id)
      FOREIGN KEY (image_id) REFERENCES images(id)
    )
  `);
  // type : 'product' or 'menu'

  db.run(`
    CREATE TABLE IF NOT EXISTS menu_items (
      menu_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      FOREIGN KEY (menu_id) REFERENCES articles(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES articles(id) ON DELETE CASCADE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER,
      order_date TEXT,
      status TEXT,
      FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
    )
  `);
  // order_date : format:'YYYY/MM/DD'
  // status : 'preparing','ready','delivered','cancelled'

  db.run(`
    CREATE TABLE IF NOT EXISTS payements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      amount_cents INTEGER NOT NULL,
      method TEXT,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    )
  `);
  // method : 'card','cash','online'

  db.run(`
    CREATE TABLE IF NOT EXISTS sizes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS article_sizes (
      article_id INTEGER NOT NULL,
      size_id INTEGER NOT NULL,
      price_cents INTEGER NOT NULL,
      image_id INTEGER,
      FOREIGN KEY (image_id) REFERENCES images(id)
      FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
      FOREIGN KEY (size_id) REFERENCES sizes(id) ON DELETE CASCADE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      article_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      unit_price_cents INTEGER NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS options (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price_cents INTEGER NOT NULL,
      image_id INTEGER,
      FOREIGN KEY (image_id) REFERENCES images(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS item_options (
      item_id INTEGER NOT NULL,
      option_id INTEGER NOT NULL,
      FOREIGN KEY (item_id) REFERENCES order_items(id) ON DELETE CASCADE,
      FOREIGN KEY (option_id) REFERENCES options(id) ON DELETE CASCADE
    )
  `);
});

module.exports = db;