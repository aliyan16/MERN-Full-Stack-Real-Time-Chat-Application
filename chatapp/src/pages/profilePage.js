import ImageComponent from "../Components/profileComponents/imageComponent"
import axios from "axios"
import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import UserStatus from "../Components/profileComponents/statusComponent"
function UserProfile({currentUser}){
    const [profilePic,setProfilePic]=useState(null)
    const [userStatus,setUserStatus]=useState('')
    const userId=currentUser._id

    const fetchUserProfile=async()=>{
        try{
            if(!userId){return}
            const res=await axios.get(`http://localhost:5000/get-user-profile/${userId}`).then(
                res=>{
                    if(res.data.profilePic){
                        setProfilePic(`http://localhost:5000/media/${res.data.profilePic.fileId}`)
                    }
                    if(res.data.statusMessage){
                        setUserStatus(res.data.statusMessage)
                    }
                }
            )
            

        }catch(e){
            console.error('Error fetching profile')
        }
    }

    useEffect(()=>{
        fetchUserProfile()
    },[userId])
    return(
        <>
        <div className="bg-gray-700 min-h-screen">
            <div className="bg-white w-1/12 rounded-md text-center ml-12 mt-20">
                <h3 className="text-gray-800">Hello {currentUser.lastName} !</h3>
            </div>
            <ImageComponent userId={userId} profilePic={profilePic}  fetchUserProfile={fetchUserProfile}/>
            <UserStatus currentUser={currentUser} />

        </div>
        </>
    )
}

export default UserProfile