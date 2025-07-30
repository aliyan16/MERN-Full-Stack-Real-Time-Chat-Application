import react from "react";
import ChatBox from "./chatBox";


function RightSideBar({selectedChat,messages,onSendMessage,currentUser}){
    return(
        <>
        <div className="flex-1 bg-gray-700 p-6">
            {selectedChat?(
                <ChatBox chatUser={selectedChat} messages={messages} onSendMessage={onSendMessage} currentUser={currentUser} />
            ):(
                <div className="text-center text-gray-400 text-xl mt-40">
                    Start a chat by selecting a user

                </div>
            )}

        </div>
        </>
    )
}

export default RightSideBar