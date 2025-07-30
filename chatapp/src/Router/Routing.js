import React, { useState } from "react";
import SignIn from "../pages/sigin";
import Register from "../pages/register";
import {Routes,Route, useLocation } from "react-router-dom";
import HomePage from "../pages/homePage";
import Navbar from "../Components/navbar";
import UserProfile from "../pages/profilePage";

function Routing(){
    const [currentUser,setCurrentUser]=useState(null)
    const location=useLocation()
    const isAuthPage=location.pathname==='/' || location.pathname==='/register'
    return(
        <>
        <div className="flex flex-col h-screen" >
            { !isAuthPage && <Navbar currentUser={currentUser}/>}
            <Routes>
                <Route path="/register" element={<Register/>} />
                <Route path="/" element={<SignIn setCurrentUser={setCurrentUser} />} />
                <Route path="/home" element={<HomePage currentUser={currentUser} />} />
                <Route path="/profile" element={<UserProfile currentUser={currentUser} />} />
        </Routes>
        </div>
        
        </>
    )
}
export default Routing