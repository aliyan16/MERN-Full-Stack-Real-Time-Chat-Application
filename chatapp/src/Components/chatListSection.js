import react from "react";
import {FaUser} from 'react-icons/fa'


function ChatListSection({chats,onChatClick}){
    return(
        <>
        <div className="mt-6">
            <h3 className="font-semibold mb-2">Chats</h3>
            <div className="space-y-1">
                {chats.map((chat)=>(
                    <div key={chat._id} onClick={()=>onChatClick(chat)} className="cursor-pointer flex space-x-2 p-2 bg-white rounded-lg shadow hover:bg-blue-100">
                        {chat.profilePic?(
                            <FaUser/>
                        ):(
                            <FaUser/>
                        )}
                        <span className="font-semibold">{chat.firstName} {chat.lastName}</span>
                        <span className="text-sm text-gray-500 truncate">{chat.lastMessage?.content || 'Media'}</span>

                    </div>
                ))}

            </div>

        </div>
        </>
    )
}


export default ChatListSection