const { type } = require('@testing-library/user-event/dist/type')
const mongoose=require('mongoose')

const RegisterAccountsSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    // dob:{
    //     day:{type:Number,required:true},
    //     month:{type:String,required:true},
    //     year:{type:String,required:true}
    // },
    dob:{type:Date,required:true},
    gender:{type:String,required:true},
    profilePic:{
        fileId:mongoose.Schema.Types.ObjectId,
        fileName:String,
        contentType:String
    },
    statusMessage:{type:String,default:'Hey there! I am using ChatApp'},
    IsActive:{type:Boolean,default:false},
    lastSeen:{type:Date,default:Date.now()},
    createdAt:{type:Date,default:Date.now()}

})

module.exports=mongoose.model('RegisterAccounts',RegisterAccountsSchema)