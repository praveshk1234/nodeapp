const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const {roles} = require('../config/roles')
const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, 'Please provide a name']
        },
        email:{
            type:String,
            required:true,
            unique: true,
            required: [true, 'Please provide your email'],
            validate:[validator.isEmail, 'Please provide a valid email']
        },
        role:{
            type:String,
            enum:roles,
            default:'user'
        },
        password:{
            type:String,
            required:[true, 'Please provide a password'],
            select:false
        },
        passwordConfirm:{
            type:String,
            required:[true, 'Please confirm your password'],
            validate:{
                validator:function(el){
                    return el === this.password;
                },
                message:'Passwords are not the same!!'
            }
        }
    }
);
userSchema.pre('save',async function(next){
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 12);
      }
      next();
})

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword){
return await bcrypt.compare(candidatePassword,userPassword);
};

const User = mongoose.model('user',userSchema);
module.exports = User;