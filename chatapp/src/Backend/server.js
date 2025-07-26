const mongoose=require('mongoose')
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const RegisterAccounts=require('./models/RegisterSchema')
const Message=require('./models/MessageSchema')
const bcrypt=require('bcrypt')

const multer=require('multer')
const {GridFsStorage}=require('multer-gridfs-storage')

const upload=multer({storage:multer.memoryStorage()})

const http=require('http')
const {Server}=require('socket.io')

const app=express()
const port=5000

mongoUrl='mongodb+srv://aliyanm12376:aliyan123@cluster0.kzpdbcw.mongodb.net/chatApp'

let gfs

app.use(bodyParser.json())
app.use(cors())

mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('open',()=>{
    console.log('DB Connected')
    gfs=new mongoose.mongo.GridFSBucket(mongoose.connection.db,{bucketName:'uploads'})
})

mongoose.connection.on('error',()=>{
    console.log('Database connection error')
})

const server=new http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET,POST']
    }
})

const onlineUsers=new Set()

io.on('connection',(socket)=>{
    console.log('A user connected')
    socket.on('user-online',async(userId)=>{
        socket.userId=userId
        onlineUsers.add(userId)
        await RegisterAccounts.findByIdAndUpdate(userId,{IsActive:true})
        io.emit('update-users')
    })
    socket.on('disconnect',async()=>{
        const userId=socket.userId
        if(userId){
            onlineUsers.delete(userId)
            await RegisterAccounts.findByIdAndUpdate(userId,{
                IsActive:false,
                lastSeen:new Date()
            })
            io.emit('update-users')
        }
    })
})

app.post('/register',async(req,res)=>{
    try{
        const {firstName,lastName,email,password,dob,gender}=req.body
        const user=await RegisterAccounts.findOne({email})
        if(user){
            return res.status(400).json({error:'User already exists'})
        }
        const saltRounds=15
        const hashedPassword=await bcrypt.hash(password,saltRounds)
        const newUser=new RegisterAccounts({firstName,lastName,email,password:hashedPassword,dob,gender})
        await newUser.save()
        res.status(201).json({message:'Account created successfully'})
    }catch(e){
        console.error('error creating account')
        res.status(500).json({error:'Server error'})
    }
})

app.post('/signin',async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await RegisterAccounts.findOne({email})
        if(!user){
            return res.status(404).json({error:"User not Found"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({error:'Invalid Email/Password'})
        }
        res.json({
            message:'SignIn Successful',
            user:{
                _id:user._id,
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                profilePic:user.profilePic
            }
        })

    }catch(e){
        console.error('Could not SignIn')
        res.status(500).json({error:'Server error'})

    }
})

app.post('/message',upload.single('media'),async(req,res)=>{
    try{
        const {sender,receiver,content,seen,seenAt}=req.body
        const newMessageData={
            sender,
            receiver,
            content,
            seen,
            seenAt
        }
        if(req.file){
            const fileName=`${Date.now()}-${req.file.originalname}`
            const bucket=new mongoose.mongo.GridFSBucket(mongoose.connection.db,{
                bucketName:'uploads'
            })
            const uploadStream=bucket.openUploadStream(fileName,{
                contentType:req.file.mimetype
            })
            uploadStream.end(req.file.buffer)
            uploadStream.on('finish',async()=>{
                newMessageData.media={
                    fileId:uploadStream.id,
                    fileName:fileName,
                    contentType:req.file.mimetype
                }
                const newMessage=new Message(newMessageData)
                await newMessage.save()
                res.status(201).json({message:'Message sent successfully'})
            })

        }
        else{
            const newMessage=new Message(newMessageData)
            await newMessage.save()
            res.status(201).json({message:'Message sent successfully'})
        }

    }catch(e){
        console.error('Message couldnot be send')
        res.status(500).json({error:'Server error'})
    }
})

app.get('/get-users',async(req,res)=>{
    try{
        const users=await RegisterAccounts.find({},'firstName lastName profilePic IsActive lastSeen')
        res.json(users)

    }catch(e){
        console.error('Error fetching users: ',e)
        res.status(500).json({error:'Server Error'})
    }
})

server.listen(port,()=>{
    console.log(`backend is running on port ${port}`)
})