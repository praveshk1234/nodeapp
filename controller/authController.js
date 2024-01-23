const User = require('../models/usersmodels');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');

function createSendToken(user,statusCode,res){
    const id = user._id;
    const token = jwt.sign({id}, process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRES_IN });
    user.password = undefined;
    user.passwordConfirm = undefined;
    res.status(statusCode).json({
        status:'success',
        token,
        data:{
            user
        }
    })
    return token;
}

exports.signup = catchAsync(async (req,res,next) =>{
    const newUser = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm
        
    })
   createSendToken(newUser,201,res);


} );

exports.login = catchAsync(async (req,res,next) =>{

    const {email,password} = req.body;

    if(!email || !password){
     return next(new AppError('Please provide email and password',400));
    }

    // check if user exist or password is correct
    const user = await User.findOne({email}).select('+password');

    if(!user || !(await user.correctPassword(password,user.password))){
      return next(new AppError('Incorrect email or password',401));
    }

    createSendToken(user,200,res)

});