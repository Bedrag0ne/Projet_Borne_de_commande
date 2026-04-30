const express = require('express');
const router = express.Router();

const controller = require('../controllers/productsController');

router.get('/products', controller.getAllProducts);

module.exports = router;