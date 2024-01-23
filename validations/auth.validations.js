const Joi = require('joi');
const {password} = require('./custom.validation')

const register= {
    body:Joi.object().keys({
            name:Joi.string().required(),
            password:Joi.string().required().custom(password),
            passwordConfirm:Joi.string().required(),
            email:Joi.string().required().email(),
        }),
}

module.exports = {
    register
}