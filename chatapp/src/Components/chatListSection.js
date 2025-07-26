import react from "react";


function ChatListSection({chats,onChatClick}){
    return(
        <>
        <div className="mt-6">
            <h3 className="font-semibold mb-2">Chats</h3>
            <div className="space-y-1">
                {chats.map((chat)=>(
                    <div key={chat._id} onClick={()=>onChatClick(chat)} className="cursor-pointer p-2 bg-white rounded-lg shadow hover:bg-blue-100">
                        {chat.name}

                    </div>
                ))}

            </div>

        </div>
        </>
    )
}


export default ChatListSection