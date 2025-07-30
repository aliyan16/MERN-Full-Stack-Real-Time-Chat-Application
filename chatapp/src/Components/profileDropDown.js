import { useState } from "react"
import { FaUser, FaUserCircle } from "react-icons/fa"
import { useNavigate } from "react-router-dom"



function ProfileDropDown({currentUser}){
    const [isOpen,setIsOpen]=useState(false)
    const navigate=useNavigate()

    return(
        <>
        <div className="">
            <button onClick={()=>setIsOpen(!isOpen)} >
                {currentUser?.profilePic?.fileId?(

                    <img src={`http://localhost:5000/media/${currentUser.profilePic.fileId}`} alt="Profile pic" />
                ):(
                    <FaUser/>
                )}
            </button>
            {isOpen &&(
                <div>
                    <button onClick={()=>navigate('/profile')}>
                        <FaUserCircle/>
                        Profile
                    </button>
                </div>
            )}
            


        </div>
        </>
    )
}

export default ProfileDropDown