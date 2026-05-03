const express = require('express');
const app = express();

const productsRoutes = require('./routes/productsRoutes');
const ordersRoutes = require('./routes/ordersRoutes');

app.use(express.json());
app.use(express.static('./views'));

app.use('/api', productsRoutes);
app.use('/api', ordersRoutes);



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});