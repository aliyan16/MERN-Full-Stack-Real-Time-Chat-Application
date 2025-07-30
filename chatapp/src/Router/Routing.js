import React, { useState } from "react";
import SignIn from "../pages/sigin";
import Register from "../pages/register";
import {Routes,Route } from "react-router-dom";
import HomePage from "../pages/homePage";
import Navbar from "../Components/navbar";

function Routing(){
    const [currentUser,setCurrentUser]=useState(null)
    return(
        <>
        <div className="flex flex-col h-screen" >
            <Navbar currentUser={currentUser}/>
            <Routes>
                <Route path="/register" element={<Register/>} />
                <Route path="/" element={<SignIn setCurrentUser={setCurrentUser} />} />
                <Route path="/home" element={<HomePage currentUser={currentUser} />} />
        </Routes>
        </div>
        
        </>
    )
}
export default Routing