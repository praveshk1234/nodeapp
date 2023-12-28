const express = require('express');
const productController = require("./productController/product.js");
const app = express();
app.get('/', productController.getProducts)
  

  app.listen(3000, () => {
    console.log(`Example app listening on port`)
  })