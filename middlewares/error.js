const AppError = require('../utils/appError');
const httpStatus = require('http-status')
const config = require('../config/config');
const mongoose = require('mongoose');


const erroConverter = (err,req,res,next) =>{
    let error = err;
    if(!(error instanceof AppError)){
        const statusCode= error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode]
        error = new AppError(message,statusCode)
    }
    next(error);
}
const errorHandler = (err,req,res,next) => { 
//   err.statusCode = err.statusCode || 500;
  let {statusCode,message} = err;
  if(config.env === 'production' && !err.isOperational){
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;
  
  const response = {
    code:statusCode,
    message,
    ...(config.env === 'development' && {stack:err.stack}),
  };

  res.status(statusCode).send(response);

};

module.exports = {
    errorHandler,
    erroConverter,
}