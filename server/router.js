const express = require('express');

const router = new express.Router();

const { geProducts, getProduct, filterProducts, searchProduct, filterProduct } = require('../controllers/product');

router.get('/products', geProducts)
router.get('/product/:id', getProduct)
router.get('/products/:productId', filterProducts)
router.get('/products/search/:keyword', searchProduct)
router.post('/product/filter', filterProduct)

module.exports = router;
