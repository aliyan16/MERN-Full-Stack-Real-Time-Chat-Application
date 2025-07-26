import react, { useState } from "react";




function ChatBox(){
    const [messages,setMessages]=useState([])
    const [input,setInput]=useState('')

    const handleSend=()=>{
        if(input.trim()){
            const newMessage={text:input,fromME:true}
            setMessages((prev)=>[...prev,newMessage])
            setInput('')
        }
    }
    return(
        <>
        <div className="flex flex-col h-full">
            <div className="text-xl font-semibold mb-4">
                <div className="flex-1 overflow-y-auto space-y-2 border p-4 rounded-lg bg-gray-50">
                    {messages.map((msg,index)=>(
                        <div key={index} className={`p-2 rounded-md w-fit ${msg.fromME?'bg-blue-100 ml-auto':'bg-gray-200'}`}>
                            {msg.text}

                        </div>
                    ))}

                </div>
                <div className="mt-4 flex">
                    <input type="text" className="flex-1 border rounded-l px-4 py-2" value={input} onChange={(e)=> setInput(e.target.value)} placeholder="Type a message" />
                    <button onClick={handleSend} className="bg-blue-600 text-white px-4 rounded-r-lg">Send</button>

                </div>

            </div>

        </div>
        </>
    )
}

export default ChatBox