import react from "react";

const Users=[
    {_id:'1',name:'Aliyan',online:true},
    {_id:'2',name:'Burak',online:false}
]


function UserStatusSection({onUserClick}){
    return(
        <>
        <div>
            <h3 className="font-semibold mb-2">Users</h3>
            <div className="space-y-1" >
                {Users.map((user)=>{
                    <div key={user._id} onClick={()=>onUserClick(user)} className="cursor-pointer p-2 bg-white rounded-lg shadow hover:bg-blue-100" >
                        <span className={`inline-block w-2 h-2 mr-2 rounded-full ${user.online?'bg-green-500':'bg-gray-400'}`}></span>
                        {user.name}

                    </div>
                })}
            </div>
        </div>
        </>
    )
}

export default UserStatusSection