const User = require('./../models/usersmodels');
const validate = require('./../middlewares/validate')
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync (async (req,res)=>{

     const users = await User.find();
  
     res.status(200).json({
            status:"success",
            results:users.length,
            data:{
                users:users
            }
         }
     );

 })

exports.getUser = catchAsync(async(req,res) =>{
   
        const user = await User.findById(req.params.id);
       res.status(200).json(
        {
            status:'success',
            data:{
                user:user
            }
        }
       )
})
exports.createUser =catchAsync( async (req,res,next)=>{

    const { error }=  validate.userValidate.validate(req.body);

    if (error) {
     
      throw new Error(error.details[0].message);
    }
    const newUser = await User.create(req.body);
   

    res.status(201).json(
        {
            status:"success",
            data: {
                user: {
                    email:newUser.email,
                    password:newUser.password
                }
             }
        }
    )



})

exports.updateUser = catchAsync(async(req,res) => {
  const user =await  User.findByIdAndUpdate(req.params.userId,req.body);
  res.send(user)
})

exports.deleteUser = async (req,res) =>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
         status:'success',
         data:null   
        })
    }
    catch(err){
        res.status(400).json({
            status:'fail',
            data:err
        })
    }
}
