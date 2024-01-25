const Joi = require('joi');
const {password,objectId} = require('./custom.validation');

const updateUser = {
    params:Joi.object().keys({
        userId:Joi.required().custom(objectId),
    }),
    body:Joi.object()
     .keys({
        email:Joi.string().email(),
        password:Joi.string().custom(password),
        name:Joi.string(),
    })
   
};

module.exports = {
    updateUser
};