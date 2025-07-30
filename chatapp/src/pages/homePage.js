import React, { useState,useEffect } from "react";
import LeftSideBar from "../Components/leftSideBar";
import RightSideBar from "../Components/rightSideBar";
import axios from 'axios'
import io from 'socket.io-client'

const socket=io('http://localhost:5000')

function HomePage({currentUser}){
    const [selectedChat,setSelectedChat]=useState(null)
    const [chatList,setChatList]=useState([])
    const [allUsers,setAllUsers]=useState([])
    const [messages,setMessages]=useState([])

    const handleSelectChat=async(user)=>{
        setSelectedChat(user)
        try{
            const res=await axios.get(`http://localhost:5000/messages?userId=${currentUser._id}&contactId=${user._id}`)
            setMessages(res.data)
        }catch(e){
            console.error('Could not fetch messages')
        }
        
    }

    const fetchUsers=async()=>{
        try{
            const users=await axios.get('http://localhost:5000/get-users')
            setAllUsers(users.data)

        }catch(e){
            console.error('Couldnot Fetch Users: ',e)
        }
    }

    const fetchChats=async()=>{
        try{
            const res=await axios.get(`http://localhost:5000/chat-list/${currentUser._id}`)
            setChatList(res.data)
        }catch(e){
            console.error('Error fetching chat list')

        }
    }
    useEffect(()=>{fetchUsers()},[])
    useEffect(()=>{
        if(currentUser?._id){
            fetchChats()
        }
    },[currentUser])

    useEffect(()=>{
        if(currentUser?._id){
            socket.emit('user-online',currentUser._id)
        }
        socket.on('update-users',()=>{
            fetchUsers()
        })
        socket.on('new-message',(message)=>{
            if((message.sender===selectedChat?._id && message.receiver===currentUser._id) || (message.receiver===selectedChat?._id && message.sender===currentUser._id)){
                setMessages(prev=>[...prev,message])
            }
        })
        return ()=>{
            socket.off('update-users')
            socket.off('new-message')
        }
    },[currentUser,selectedChat])

    const sendMessage=async(content)=>{
        if(!content.trim()||!selectedChat){return}
        try{
            const newMessage={
                sender:currentUser._id,
                receiver:selectedChat._id,
                content:content,
                seen:false
            }
            const res=await axios.post('http://localhost:5000/message',newMessage)
            setMessages(prev=>[...prev,res.data])
            socket.emit('send-message',newMessage)
        }catch(e){
            console.error('Couldnot send message: ',e)

        }
    }
    


    return(
        <>
        <div className="flex h-screen" >
            <LeftSideBar chatList={chatList} onSelectChat={handleSelectChat} allUsers={allUsers} currentUser={currentUser}/>
            <RightSideBar selectedChat={selectedChat} messages={messages} onSendMessage={sendMessage} currentUser={currentUser} />
        </div>
        </>
    )
}

export default HomePage