const express = require('express');
const router = express.Router();
const productcontroller = require('./../ProductController/productcontroller');


router
  .route('/')
  .get(productcontroller.getProducts)
  

module.exports = router;