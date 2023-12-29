const router = require('express').Router();

const products = require('./../productController/product.js');



router.get('/', products.findAll);

module.exports = router;