const express = require('express');
const router = express.Router();

const controller = require('../controllers/articlesController');

router.get('/products', controller.getAllProducts);

module.exports = router;