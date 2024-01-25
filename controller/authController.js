const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {authServcie,userService,tokenService,emailService} = require('./../services')


exports.signup = catchAsync(async (req,res) =>{
const user = await userService.createUser(req.body);
const tokens = await tokenService.generateAuthTokens(user);
res.status(httpStatus.CREATED).send({user,tokens});


} );

exports.login = catchAsync(async (req,res) =>{
const {email,password} = req.body;
const user = await authServcie.loginUserWithEmailAndPassword(email,password);
const tokens = await tokenService.generateAuthTokens(user);
res.send({user,tokens});

});

exports.refreshTokens = catchAsync(async (req,res)=>{
  const tokens = await authServcie.refreshAuth(req.body.refreshToken);
  res.send({...tokens})
})

exports.forgotPassword = catchAsync(async (req,res)=>{
  const resetPasswordToken= await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send()
})

