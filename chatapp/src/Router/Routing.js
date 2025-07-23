import React from "react";
import SignIn from "../pages/sigin";
import Register from "../pages/register";
import {Routes,Route } from "react-router-dom";

function Routing(){
    return(
        <>
        <Routes>
            <Route path="/" element={<Register/>} />
            <Route path="/signin" element={<SignIn/>} />
        </Routes>
        </>
    )
}
export default Routing