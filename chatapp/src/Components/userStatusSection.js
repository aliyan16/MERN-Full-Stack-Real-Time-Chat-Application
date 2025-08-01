import { FaUser } from "react-icons/fa"

function UserStatusSection({onUserClick,allUsers}){
    return(
        <>
        <div>
            <h3 className="font-semibold mb-2 text-white">Users</h3>
            <div className="space-y-1" >
                {allUsers.map((user)=>{
                    return(
                        <div key={user._id} onClick={()=>onUserClick(user)} className="cursor-pointer p-2 bg-black text-white rounded-lg shadow hover:bg-blue-100 hover:text-black flex items-center" >
                            {user?.profilePic?.fileId?(
                                <img src={`http://localhost:5000/media/${user.profilePic.fileId}`} alt="profile" className="object-cover rounded-full w-8 h-8"/>
                            ):(
                                <FaUser/>
                            )}
                            <span className={`inline-block w-2 h-2 mr-2 rounded-full ${user.IsActive?'bg-green-500':'bg-gray-400'}`}></span>
                            {user.firstName} {user.lastName}
                        {user.name}

                        </div>
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default UserStatusSection