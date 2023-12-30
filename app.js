
const express=require('express');
const productRotes = require('./routes/productroutes');

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use('/api/v1/products', productRotes);

module.exports = app;