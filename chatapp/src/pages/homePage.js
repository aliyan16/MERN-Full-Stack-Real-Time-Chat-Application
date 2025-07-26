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

    const handleSelectChat=(user)=>{
        setSelectedChat(user)
        setSelectedChat((prev)=>{
            if(!prev.find((chat)=>chat._id===user._id)){
                return [...prev,user]
            }
            return prev
        })
    }
    const fetchUsers=async()=>{
        try{
            const users=await axios.get('http://localhost:5000/get-users')
            setAllUsers(users.data)

        }catch(e){
            console.error('Couldnot Fetch Users: ',e)
        }
    }
    useEffect(()=>{fetchUsers()},[])

    useEffect(()=>{
        if(currentUser?._id){
            socket.emit('user-online',currentUser._id)
        }
        socket.on('update-users',()=>{
            fetchUsers()
        })
        return ()=>{
            socket.off('update-users')
        }
    },[currentUser])
    


    return(
        <>
        <div className="flex h-screen" >
            <LeftSideBar chatList={chatList} onSelectChat={handleSelectChat} allUsers={allUsers} />
            <RightSideBar selectedChat={selectedChat} />
        </div>
        </>
    )
}

export default HomePage