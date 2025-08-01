import axios from "axios"
import { useState } from "react"




function UserStatus({currentUser,userStatus,setUserStatus,fetchUserProfile}){
    const [isEditing,setIsEditing]=useState(false)

    const handleChange=(e)=>{
        setUserStatus(e.target.value)

        
    }
    const handleKeyDown=async(e)=>{
        if(e.key==='Enter'){
            e.preventDefault()
            try{
                const res=await axios.post(`http://localhost:5000/update-user-status/${currentUser._id}`,{statusMessage:userStatus})
                fetchUserProfile()
                setIsEditing(false)
            }catch(e){
                console.error('Error updating user status: ',e)
            }
        }
    }
    return(
        <>
        <div className="w-full text-blue-500">
            <div className="text-blue-400 flex items-center justify-between">
                {isEditing?(
                    <input type="text" value={userStatus} onChange={handleChange} onKeyDown={handleKeyDown} className="mt-1 p-2 w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>

                ):(
                    <span className="text-black">{userStatus}</span>
                )}
                <label onClick={()=> setIsEditing(true)}>
                    ✎
                </label>
            </div>
        </div>
        </>
    )
}

export default UserStatus