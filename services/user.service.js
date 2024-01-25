const httpStatus = require('http-status');
const {User} = require('./../models');
const AppError = require('../utils/appError');

const createUser = async(userBody) =>{
    if(await User.isEmailTaken(userBody.email)){
        throw new AppError('Email already taken',httpStatus.BAD_REQUEST);
    }
    return User.create(userBody);
}


module.exports = {
    createUser
}