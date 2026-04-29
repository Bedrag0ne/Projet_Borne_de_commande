const express = require('express');
const app = express();

const articlesRoutes = require('./routes/articlesRoutes');

app.use(express.json());
app.use(express.static('./views'));

app.use('/api', articlesRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});