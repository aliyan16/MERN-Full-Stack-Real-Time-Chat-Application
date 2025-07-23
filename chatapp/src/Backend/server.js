const mongoose=require('mongoose')
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')


const app=express()
const port=5000

mongoUrl='mongodb+srv://aliyanm12376:aliyan123@cluster0.kzpdbcw.mongodb.net/chatApp'


app.use(bodyParser.json())
app.use(cors())