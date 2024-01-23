const AppError = require('./../utils/appError');


const sendErrorDev = (err,res) =>{
    res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack
    })
}

const handleDuplicateFieldsDB = err =>{
    const value = err.keyValue.email;

    // const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
 
    const message=`Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message,400);
}

const sendErrorProd = (err,res) =>{

    if(err.isOperational){
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message
        })
    } else{
        res.status(500).json({
            status:'error',
            message:'Something went very wrong!'
        });
    }
};
module.exports = (err,req,res,next) => { 
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'development'){
        sendErrorDev(err,res);
    }

    else if(process.env.NODE_ENV === 'production'){
        let error = { ...err};


        if (error.code === 11000) error= handleDuplicateFieldsDB(error); 
      
        sendErrorProd(error,res);
    }
};