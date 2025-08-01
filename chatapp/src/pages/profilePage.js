import ImageComponent from "../Components/profileComponents/imageComponent"
import axios from "axios"
import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
function UserProfile({currentUser}){
    const [profilePic,setProfilePic]=useState(null)
    const [userStatus,setUserStatus]=useState('')
    const {userId}=useParams()

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
            <ImageComponent currentUser={currentUser} profilePic={profilePic} />

        </div>
        </>
    )
}

export default UserProfile