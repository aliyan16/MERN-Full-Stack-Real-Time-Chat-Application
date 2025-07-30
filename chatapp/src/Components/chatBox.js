import { useEffect, useRef, useState } from "react";




function ChatBox({chatUser,messages,onSendMessage,currentUser}){
    // const [messages,setMessages]=useState([])
    const [input,setInput]=useState('')
    const messagesEndRef=useRef(null)
    const [media,setMedia]=useState(null)

    const handleSend = async () => {
        if (!input.trim() && !media) return;

        const formData = new FormData();
        formData.append("sender", currentUser._id);
        formData.append("receiver", chatUser._id);
        formData.append("content", input);
        if (media) {
            formData.append("media", media);
        }

        try {
            const res = await fetch("http://localhost:5000/message", {
            method: "POST",
            body: formData,
            });

            if (res.ok) {
            setInput("");
            setMedia(null);
            // onSendMessage(input)
            }
        } catch (err) {
            console.error("Failed to send message", err);
        }
    };

    useEffect(()=>{
        messagesEndRef.current?.scrollIntoView({behavior:'smooth'})
    },[messages])
    return(
        <>
        <div className="flex flex-col h-full">
            <div className="text-xl font-semibold mb-4 text-white">
                {chatUser.firstName} {chatUser.lastName}
                <span className={`inline-block w-2 h-2 ml-2  rounded-full ${chatUser.IsActive?'bg-green-500':'bg-gray-400'}`}></span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 border border-black p-4 rounded-lg bg-gray-700">

                {messages.map((msg)=>(
                    <div key={msg._id} className={`p-2 rounded-md w-fit ${msg.sender===currentUser._id?'bg-blue-100 ml-auto':'bg-gray-200'}`}>
                        <div key={msg._id} className={`p-2 rounded-md w-fit ${msg.sender === currentUser._id ? 'bg-blue-100 ml-auto' : 'bg-gray-200'}`}>
                            {msg.media?.fileId ? (
                                <img
                                src={`http://localhost:5000/media/${msg.media.fileId}`}
                                alt="media"
                                className="max-w-xs rounded"
                                />
                            ) : (
                                <div>{msg.content}</div>
                            )}
                            <div className="text-xs text-gray-500 mt-1">
                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />

            </div>
            <div className="mt-4 flex items-center space-x-2">
                {/* <input type="text" className="flex-1 border rounded-l px-4 py-2" value={input} onChange={(e)=> setInput(e.target.value)} placeholder="Type a message" onKeyPress={(e)=>e.key==='Enter' && handleSend()} /> */}
                <input
                    type="text"
                    className="flex-1 border rounded-l px-4 py-2"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message"
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setMedia(e.target.files[0])}
                    className="hidden"
                    id="file-upload"
                />
                <label htmlFor="file-upload" className="bg-gray-300 px-3 py-2 rounded cursor-pointer">
                    📎
                </label>

                <button onClick={handleSend} className="bg-blue-600 text-white px-4 rounded-r-lg">
                    Send
                </button>

            </div>

            

        </div>
        </>
    )
}

export default ChatBox