import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"



function ImageComponent({currentUser,profilePic}){
    const uploadPic=(e,type)=>{
        const file=e.target.files[0]
        if(!file) return
        const formData=new FormData()
        formData.append('media',file)
    }
    
    return(
        <>
        <div>
            <div className="absolute left-8 top-20">
                <div className="relative">
                    <img src={profilePic} alt="profile pic" className="w-32 h-32 rounded-full border-4 border-white object-cover" />
                    <label className="absolute bottom-0 right-0 bg-white text-xs px-1 rounded-full py-0.5 cursor-pointer shadow">
                        ✎
                        <input type="file" accept="image/*" hidden onChange={(e)=>uploadPic(e,'profile')} />
                    </label>
                </div>
            </div>
        </div>
        </>
    )
}

export default ImageComponent