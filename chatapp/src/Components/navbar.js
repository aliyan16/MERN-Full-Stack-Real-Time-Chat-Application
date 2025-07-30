import { FaHome } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import ProfileDropDown from "./profileDropDown"


function Navbar({currentUser}){
    const navigate=useNavigate()
    return(
        <>
        <header>
            <div>
                <FaHome onClick={()=>navigate('/home')} />
            </div>
            <div>
                <ProfileDropDown currentUser={currentUser} />
            </div>
        </header>
        </>
    )
}


export default Navbar