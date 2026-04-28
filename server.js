const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('./views'));

const orderRoutes = require('./routes/orderRoutes');

app.use('/orders', orderRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});