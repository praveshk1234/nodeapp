const Joi = require('joi');
const pick = require('../utils/pick');
const ApiError = require('../utils/appError');

const validate = (schema) =>(req,res,next) =>{
const validSchema = pick(schema,['params','query','body']);
const object = pick(req,Object.keys(validSchema));
const {value,error} = Joi.compile(validSchema)
    .prefs({errors:{label:'key'},abortEarly:false})
    .validate(object)
    if(error){
        const errorMessage = error.details.map((details)=>details.message).join(', ');
        return next(new ApiError(errorMessage,400))
    }
    Object.assign(req,value);
    return next();
}

module.exports = validate;
// exports.userValidate = Joi.object({
//     name:Joi
//         .string()
//         .pattern(new RegExp('^[a-zA-Z]{3,20}$'))
//         .required(),
//     email:Joi.string().email().required(),
//     password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
//     passwordConfirm:Joi.ref('password')
// })
// .with('password','passwordConfirm')
// .options({ abortEarly: false });

// exports.updateValidate = Joi.object({
//     email:Joi.string().email().required()
// })
