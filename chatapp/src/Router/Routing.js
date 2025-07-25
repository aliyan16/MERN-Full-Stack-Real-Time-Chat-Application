import React, { useState } from "react";
import SignIn from "../pages/sigin";
import Register from "../pages/register";
import {Routes,Route } from "react-router-dom";
import HomePage from "../pages/homePage";

function Routing(){
    const [currentUser,setCurrentUser]=useState(null)
    return(
        <>
        <Routes>
            <Route path="/register" element={<Register/>} />
            <Route path="/" element={<SignIn setCurrentUser={setCurrentUser} />} />
            <Route path="/home" element={<HomePage/>} />
        </Routes>
        </>
    )
}
export default Routing