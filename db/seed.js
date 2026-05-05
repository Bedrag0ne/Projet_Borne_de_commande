const db = require("./database");

db.serialize(() => {
  db.run("DELETE FROM images");
  db.run("DELETE FROM restaurants");
  db.run("DELETE FROM categories");
  db.run("DELETE FROM articles");
  db.run("DELETE FROM orders");
  db.run("DELETE FROM order_items");

  db.run(`
    INSERT INTO restaurants VALUES
    (1,'Kebabier');
  `);

  db.run(`
    INSERT INTO images VALUES
    (1,'Assiette_Kebab.png',1),
    (2,'Boissons.png',1),
    (3,'Coca-Cola.png',1),
    (4,'Desserts.png',1),
    (5,'Plats.png',1),
    (6,'Tiramisu.png',1);
  `);
  
  db.run(`
    INSERT INTO categories VALUES
    (1,'Plats',5,1),
    (2,'Boissons',2,1),
    (3,'Desserts',4,1);
  `);

  db.run(`
    INSERT INTO articles VALUES
    (1,'Assiette Kebab',700,1,1,1),
    (2,'Coca-Cola',200,2,3,1),
    (3,'Tiramisu',400,3,6,1);
  `);

  console.log("Seed terminé");
});

db.close();