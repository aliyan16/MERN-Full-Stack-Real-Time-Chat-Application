import react from "react";
import {FaUser} from 'react-icons/fa'


function ChatListSection({chats,onChatClick}){
    return(
        <>
        <div className="mt-6">
            <h3 className="font-semibold mb-2 text-white">Chats</h3>
            <div className="space-y-1">
                {chats.map((chat)=>(
                    <div key={chat._id} onClick={()=>onChatClick(chat)} className="items-center cursor-pointer flex space-x-2 p-2 bg-black text-white rounded-lg shadow hover:bg-blue-100 hover:text-black">
                        {chat.profilePic?(
                            <img src={`http://localhost:5000/media/${chat.profilePic.fileId}`} alt="profile" className="object-cover rounded-full w-8 h-8"/>
                        ):(
                            <FaUser/>
                        )}
                        <span className="font-semibold">{chat.firstName} {chat.lastName}</span>
                        <span className="text-sm text-gray-400 truncate hover:text-gray-600">{chat.lastMessage?.content || 'Media'}</span>

                    </div>
                ))}

            </div>

        </div>
        </>
    )
}


export default ChatListSection