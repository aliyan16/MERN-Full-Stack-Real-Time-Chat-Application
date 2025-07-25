const mongoose=require('mongoose')


const MessageSchema=new mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId,ref:'RegisterAccounts',required:true},
    receiver:{type:mongoose.Schema.Types.ObjectId,ref:'RegisterAccounts',required:true},
    content:{type:String,default:''},
    media:{
        fileId:mongoose.Schema.Types.ObjectId,
        fileName:String,
        contentType:String
    },
    seen:{type:Boolean,default:false},
    seenAt:{type:Date,default:Date.now()}
},{
    timestamps:true
}
)


module.exports=mongoose.model('Message',MessageSchema)