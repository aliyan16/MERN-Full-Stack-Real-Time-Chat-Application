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
        <div className="bg-gray-700 min-h-screen flex flex-col items-center pt-20 space-y-6">
            <div className="bg-white px-6 py-2 rounded-md text-center shadow">
                <h3 className="text-gray-800 text-xl font-semibold">Hello {currentUser.lastName} !</h3>
            </div>
            <div className="flex flex-col items-center space-y-4 bg-white p-6 rounded-xl shadow-md">
                <ImageComponent userId={userId} profilePic={profilePic}  fetchUserProfile={fetchUserProfile}/>
                <UserStatus currentUser={currentUser} userStatus={userStatus} setUserStatus={setUserStatus} fetchUserProfile={fetchUserProfile}/>

            </div>
            
        </div>
        </>
    )
}

export default UserProfile