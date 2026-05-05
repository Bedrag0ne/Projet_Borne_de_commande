const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const productsRoutes = require('./routes/productsRoutes');
const ordersRoutes = require('./routes/ordersRoutes');

app.use(express.json());
app.use(express.static('views'));

app.use('/api', productsRoutes);
app.use('/api', ordersRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});