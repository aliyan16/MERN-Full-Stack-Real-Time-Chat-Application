import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"



function ImageComponent({userId,profilePic,fetchUserProfile}){
    // const userId=currentUser._id
    const uploadPic=(e)=>{
        const file=e.target.files[0]
        if(!file) return
        const formData=new FormData()
        formData.append('media',file)
        axios.post(`http://localhost:5000/update-user-profilePic/${userId}`,formData).then(
            ()=>{fetchUserProfile()}
        ).catch(
            e=> console.error('Error uploading profile pic: ',e)
        )
    }
    
    return(
        <>
        <div>
            <div className="flex flex-col items-center space-y-2">
                <div className="relative">
                    <img src={profilePic} alt="profile pic" className="w-32 h-32 rounded-full border-4 border-white object-cover shadow" />
                    <label className="absolute bottom-1 right-1 bg-white text-xs px-1 rounded-full py-0.5 cursor-pointer shadow">
                        ✎
                        <input type="file" accept="image/*" hidden onChange={(e)=>uploadPic(e)} />
                    </label>
                </div>
            </div>
        </div>
        </>
    )
}

export default ImageComponent