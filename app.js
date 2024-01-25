const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const {jwtStrategy} = require('./config/passport.js');
const AppError = require('./utils/appError')
const {errorHandler, erroConverter} = require('./middlewares/error.js')

const routes = require("./routes");

const app = express();

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}
app.use(express.json());

//jwt authentication
app.use(passport.initialize());
passport.use('jwt',jwtStrategy);

//v1 api routes
app.use('/v1', routes);

app.all('*',(req,res,next) =>{
  next(new AppError(`Can't find ${req.originalUrl} on this server`,404))
})

app.use(erroConverter);

app.use(errorHandler);

module.exports =app
