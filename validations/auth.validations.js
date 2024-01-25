const Joi = require('joi');
const {password} = require('./custom.validation')

const register= {
    body: Joi.object().keys({
            name:Joi.string().required(),
            password:Joi.string().required().custom(password),
            passwordConfirm: Joi.any().valid(Joi.ref('password')).required(),
            email:Joi.string().required().email(),
        }),
};

const login = {
    body:Joi.object().keys({
        email:Joi.string().required(),
        password:Joi.string().required()
    })
};

module.exports = {
    register,
    login
};