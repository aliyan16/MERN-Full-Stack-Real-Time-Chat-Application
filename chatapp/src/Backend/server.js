const mongoose=require('mongoose')
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const RegisterAccounts=require('./models/RegisterSchema')
const bycrypt=require('bycrypt')


const app=express()
const port=5000

mongoUrl='mongodb+srv://aliyanm12376:aliyan123@cluster0.kzpdbcw.mongodb.net/chatApp'


app.use(bodyParser.json())
app.use(cors())

mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('open',()=>{
    console.log('DB Connected')
})


app.post('/register',async(req,res)=>{
    try{
        const {firstName,lastName,email,password,dob,gender}=req.body
        const user=await RegisterAccounts.findOne(email)
        if(user){
            return res.status(400).json({error:'User already exists'})
        }
        const saltRounds=15
        const hashedPassword=await bycrypt.hash(password,saltRounds)
        const newUser=new RegisterAccounts({firstName,lastName,email,hashedPassword,dob,gender})
        await newUser.save()
        res.status(201).json({message:'Account created successfully'})
    }catch(e){
        console.error('error creating account')
        res.status(500).json({error:'Server error'})
    }
})

