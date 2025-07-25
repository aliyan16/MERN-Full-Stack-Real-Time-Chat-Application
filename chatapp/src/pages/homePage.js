import React, { useState } from "react";
import LeftSideBar from "../Components/leftSideBar";
import RightSideBar from "../Components/rightSideBar";

function HomePage(){
    const [selectedChat,setSelectedChat]=useState(null)
    const [chatList,setChatList]=useState([])

    const handleSelectChat=(user)=>{
        setSelectedChat(user)
        setSelectedChat((prev)=>{
            if(!prev.find((chat)=>chat._id===user._id)){
                return [...prev,user]
            }
            return prev
        })
    }


    return(
        <>
        <div className="flex h-screen" >
            <LeftSideBar chatList={chatList} onSelectChat={handleSelectChat} />
            <RightSideBar selectedChat={selectedChat} />
        </div>
        </>
    )
}

export default HomePage