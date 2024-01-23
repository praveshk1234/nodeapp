const mongoose = require('mongoose');
const dotenv = require('dotenv');
process.on('uncaughtException',err =>{
    console.log('UNCAUGHT EXCEPTION! Shutting down')
    console.log(err.name,err.message)
    process.exit(1);
  })

  dotenv.config({ path: './config.env' });
  const app = require('./app');

const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'));

  
  app.listen(3000, () => {
    console.log(`Example app listening on port`)
  })