import react from "react";

import UserStatusSection from './userStatusSection'
import ChatListSection from './chatListSection'


function LeftSideBar({chatList,onSelectChat,allUsers,currentUser}){
    const otherUsers=allUsers.filter(user=>user._id!==currentUser?._id)
    return(
        <>
        <div className="w-1/4 border-r bg-gray-800 p-4 flex flex-col" >
        <UserStatusSection onUserClick={onSelectChat} allUsers={otherUsers} />
        <ChatListSection chats={chatList} onChatClick={onSelectChat} />
        </div>
        </>
    )
}

export default LeftSideBar