const express = require('express');
const app = express();

const productsRoutes = require('./routes/productsRoutes');

app.use('/api', productsRoutes);

app.use(express.json());
app.use(express.static('./views'));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});