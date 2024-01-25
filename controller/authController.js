const User = require('./../models/usersmodels');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const {authServcie,userService,tokenService,emailService} = require('./../services')


exports.signup = catchAsync(async (req,res,next) =>{
const user = await userService.createUser(req.body);
const tokens = await tokenService.generateAuthTokens(user);
res.status(httpStatus.CREATED).send({user,tokens});


} );

exports.login = catchAsync(async (req,res,next) =>{
const {email,password} = req.body;
const user = await authServcie.loginUserWithEmailAndPassword(email,password);
const tokens = await tokenService.generateAuthTokens(user);
res.send({user,tokens});

});