import { useEffect, useRef, useState } from "react"
import { FaUser, FaUserCircle } from "react-icons/fa"
import { useNavigate } from "react-router-dom"



function ProfileDropDown({currentUser,setCurrentUser}){
    const [isOpen,setIsOpen]=useState(false)
    const navigate=useNavigate()
    const dropDownRef=useRef(null)
    // const handleClickOutside=(e)=>{
    //     if(dropDownRef.current && !dropDownRef.current.contains(e.target)){
    //         setIsOpen(false)
    //     }
    // }
    useEffect(()=>{
        // handleClickOutside()
        const handleClickOutside=(e)=>{
            if(dropDownRef.current && !dropDownRef.current.contains(e.target)){
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown',handleClickOutside)
        return()=>{
            document.removeEventListener('mousedown',handleClickOutside)
        }
    },[])

    return(
        <>
        <div className="relative" ref={dropDownRef}>
            <button onClick={()=>setIsOpen(!isOpen)} className="flex items-center focus:outline-none">
                {currentUser?.profilePic?.fileId?(

                    <img src={`http://localhost:5000/media/${currentUser.profilePic.fileId}`} alt="Profile pic" className="w-8 h-8 rounded-full object-cover cursor-pointer" />
                ):(
                    <FaUser/>
                )}
            </button>
            {isOpen &&(
                <div className="absolute right-0 mt-2 w-48 bg-black rounded-md shadow-lg py-1 z-50">
                    <button onClick={()=>navigate('/profile')} className="flex items-center px-4 py-3 text-sm text-white hover:bg-gray-100 hover:text-black w-full text-left">
                        <FaUserCircle className="mr-2"/>
                        Profile
                    </button>
                    <button onClick={()=>{setCurrentUser(null); navigate('/');}} className="flex items-center px-4 py-3 text-sm text-white hover:bg-gray-100 hover:text-black w-full text-left">
                        Logout
                    </button>
                </div>
            )}
            


        </div>
        </>
    )
}

export default ProfileDropDown