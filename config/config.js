const Joi = require('joi');


const envVarsSchema = Joi.object()
.keys({
    NODE_ENV:Joi.string().valid('production','development'),
    PORT:Joi.number().default(3000),
    MONGODB_URL:Joi.string().required().description('Mongo Db url'),
    JWT_SECRET:Joi.string().required().description('JWT secret key'),
    JWT_EXPIRES_IN:Joi.number().default(30).description('minutes after which access tokens expire'),
})
.unknown();

const {value:envVars,error} = envVarsSchema.prefs({errors:{label:'key'}}).validate(process.env);

if(error){
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env:envVars.NODE_ENV,
    port:envVars.PORT,
    mongoose:{
        url:envVars.MONGODB_URL+ (envVars.NODE_ENV === 'test' ? '-test':''),
    },
    jwt:{
        secret:envVars.JWT_SECRET,
        accessExpirationMinutes:envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays:envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes:envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    },
};