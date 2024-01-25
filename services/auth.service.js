const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');

const Token = require('../models/token.model');
const AppError = require('../utils/appError');
const {tokenTypes} = require('../config/tokens');

const loginUserWithEmailAndPassword = async(email,password) =>{
    const user = await userService.getUserByEmail(email);
    if(!user || !(await user.isPasswordMatch(password))){
        throw new AppError(httpStatus.UNAUTHORIZED,'Incorrect email and password');
    }
    return user;
}

module.exports = {
    loginUserWithEmailAndPassword,
}