const mongoose=require('mongoose')
const SignUpModel=mongoose.Schema({
   email: {
    type: String,
    required: true
   },
   password:{
    type: String,
    required: true
   }
})

const SignUp= mongoose.model('SignUp',SignUpModel);

module.exports= SignUp;