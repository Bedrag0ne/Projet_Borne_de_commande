const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db/database.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Database opened successfully");
  }
});

module.exports = db;