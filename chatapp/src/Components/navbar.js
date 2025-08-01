import { FaHome } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import ProfileDropDown from "./profileDropDown"


function Navbar({currentUser,setCurrentUser}){
    const navigate=useNavigate()
    return(
        <>
        <header className="flex items-center justify-between p-2 bg-black shadow-md sticky top-0 z-50">
            <span>
                
            </span>
            <div className="space-x-2" >
                <FaHome onClick={()=>navigate('/home')} className="text-white text-3xl cursor-pointer" />
            </div>
            <div className="space-x-8 text-white text-2xl">
                <ProfileDropDown currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            </div>
        </header>
        </>
    )
}


export default Navbar