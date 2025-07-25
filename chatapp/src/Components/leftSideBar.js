import react from "react";

import UserStatusSection from './userStatusSection'
import ChatListSection from './chatListSection'


function LeftSideBar({chatList,onSelectChat}){
    return(
        <>
        <div className="w-1/4 border-r bg-gray-100 p-4 flex flex-col" >
        <UserStatusSection onUserClick={onSelectChat} />
        <ChatListSection chats={chatList} onChatClick={onSelectChat} />
        </div>
        </>
    )
}

export default LeftSideBar