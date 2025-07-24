import React, { useState } from "react";
import SignIn from "../pages/sigin";
import Register from "../pages/register";
import {Routes,Route } from "react-router-dom";

function Routing(){
    const [currentUser,setCurrentUser]=useState(null)
    return(
        <>
        <Routes>
            <Route path="/register" element={<Register/>} />
            <Route path="/" element={<SignIn setCurrentUser={setCurrentUser} />} />
        </Routes>
        </>
    )
}
export default Routing