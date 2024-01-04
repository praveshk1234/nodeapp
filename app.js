const express = require('express');
const productRouter = require("./routes/productRoutes.js");
const app = express();
app.use(express.json());
app.set('views', './views');
app.set('view engine', 'ejs');
app.use('/', productRouter);
app.listen(3000, () => {
    console.log(`Example app listening on port`)
  })