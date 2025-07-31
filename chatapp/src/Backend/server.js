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

    socket.on('send-message',async(message)=>{
        try{
            const newMessage=new Message(message)
            await newMessage.save()
            io.emit('new-message',newMessage)
        }catch(e){
            console.error('Error saving message: ',e)

        }
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
                io.emit('new-message',newMessage)
                res.status(201).json(newMessage)
            })

        }
        else{
            const newMessage=new Message(newMessageData)
            await newMessage.save()
            io.emit('new-message',newMessage)
            res.status(201).json(newMessage)
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

app.get('/messages',async(req,res)=>{
    try{
        const {userId,contactId}=req.query
        const messages=await Message.find({
            $or:[
                {sender:userId,receiver:contactId},
                {sender:contactId,receiver:userId}
            ]
        }).sort({createdAt:1})
        res.json(messages)
    }catch(e){
        console.error('Error fetching messages: ',e)
        res.status(500).json({error:"Server error"})

    }
})


app.get('/chat-list/:userId',async(req,res)=>{
    try{
        const {userId}=req.params
        const chats=await Message.aggregate([
            {
                $match:{
                    $or:[
                        {sender:new mongoose.Types.ObjectId(userId)},
                        {receiver:new mongoose.Types.ObjectId(userId)}
                    ]
                }
            },
            {
                $sort:{createdAt:-1}
            },
            {
                $group:{
                    _id:{
                        $cond:[
                            {
                                $eq:[
                                    '$sender',new mongoose.Types.ObjectId(userId)
                                ]
                            },
                            '$receiver',
                            '$sender'

                        ]
                    },
                    lastMessage:{$first:'$$ROOT'}
                },
            },
            {
                $lookup:{
                    from:'registeraccounts',
                    localField:'_id',
                    foreignField:'_id',
                    as:'user'
                }
            },
            {
                $unwind:'$user'
            },
            {
                $project:{
                    _id:'$user._id',
                    firstName:'$user.firstName',
                    lastName:'$user.lastName',
                    profilePic:'$user.profilePic',
                    IsActive:'$user.IsActive',
                    lastSeen:'$user.lastSeen',
                    lastMessage:1
                }
            }
        ])
        res.json(chats)
    }catch(e){
        console.error('Error fetching chatlist: ',e)
        res.status(500).json({error:'Server Error'})

    }
})

// app.get('/media/:id',async(req,res)=>{
//     try{
//         const fileId=mongoose.Types.ObjectId(req.params.id)
//         if(!fileId){
//             return res.status(400).json({message:'Invalid file ID'})
//         }
//         const file=await mongoose.connection.db.collection('uploads.files').findOne({_id:fileId})
//         if(!file){
//             return res.status(404).json({message:'File not found'})
//         }
//         const downloadStream=gfs.openDownloadStream(file._id)
//         res.set('Content-Type',file.contentType)
//         downloadStream.pipe(res)
//     }catch(e){
//         console.error('Error fetching file')
//         res.status(500).json({error:'Server error'})
//     }
// })

app.get('/media/:id',async(req,res)=>{
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({message:'Invalid file ID'})
        }
        const fileId=new mongoose.Types.ObjectId(req.params.id)
        const file=await mongoose.connection.db.collection('uploads.files').findOne({_id:fileId})
        if(!file){
            return res.status(404).json({message:'File not found'})
        }
        const downloadStream=gfs.openDownloadStream(file._id)
        res.set('Content-Type',file.contentType)
        downloadStream.pipe(res)
    }catch(e){
        console.log('Error fetching media',e)
        res.status(500).send('Error fetching media')


    }
})


server.listen(port,()=>{
    console.log(`backend is running on port ${port}`)
})