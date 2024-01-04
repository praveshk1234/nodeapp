const express = require('express');
let ejs = require('ejs');
const productRouter = require("./routes/productRoutes.js");
const app = express();
app.use(express.json());
app.set('views', './views');
app.set('view engine', 'ejs');
app.use('/', productRouter);

const logger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
app.use(logger);
app.listen(3000, () => {
    console.log(`Example app listening on port`)
  })