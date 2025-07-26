import react from "react";
import ChatBox from "./chatBox";


function RightSideBar({selectedChat}){
    return(
        <>
        <div className="flex-1 bg-white p-6">
            {selectedChat?(
                <ChatBox chatUser={selectedChat} />
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