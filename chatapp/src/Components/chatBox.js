import react, { useEffect, useRef, useState } from "react";




function ChatBox({chatUser,messages,onSendMessage,currentUser}){
    // const [messages,setMessages]=useState([])
    const [input,setInput]=useState('')
    const messagesEndRef=useRef(null)

    const handleSend=()=>{
        if(input.trim()){
            onSendMessage(input)
            setInput('')
        }
    }
    useEffect(()=>{
        messagesEndRef.current?.scrollIntoView({behavior:'smooth'})
    },[messages])
    return(
        <>
        <div className="flex flex-col h-full">
            <div className="text-xl font-semibold mb-4">
                {chatUser.firstName} {chatUser.lastName}
                <span className={`inline-block w-2 h-2 ml-2  rounded-full ${chatUser.IsActive?'bg-green-500':'bg-gray-400'}`}></span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 border p-4 rounded-lg bg-gray-50">

                {messages.map((msg)=>(
                    <div key={msg._id} className={`p-2 rounded-md w-fit ${msg.sender===currentUser._id?'bg-blue-100 ml-auto':'bg-gray-200'}`}>
                        {msg.content}
                        <div className="text-xs text-gray-500 mt-1">
                            {new Date(msg.createdAt).toLocaleTimeString([],{house:'2-digit',minute:'2-digit'})}


                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />

            </div>
            <div className="mt-4 flex">
                <input type="text" className="flex-1 border rounded-l px-4 py-2" value={input} onChange={(e)=> setInput(e.target.value)} placeholder="Type a message" onKeyPress={(e)=>e.key==='Enter' && handleSend()} />
                <button onClick={handleSend} className="bg-blue-600 text-white px-4 rounded-r-lg">Send</button>

            </div>

            

        </div>
        </>
    )
}

export default ChatBox