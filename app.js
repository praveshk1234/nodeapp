const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError')
const globalErrorHandle = require('./controller/errorController')

const userRouter = require("./routes/userRoutes.js");

const app = express();

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}
app.use(express.json());

app.use('/', userRouter);

app.all('*',(req,res,next) =>{
  next(new AppError(`Can't find ${req.originalUrl} on this server`,404))
})


app.use(globalErrorHandle);

module.exports =app
