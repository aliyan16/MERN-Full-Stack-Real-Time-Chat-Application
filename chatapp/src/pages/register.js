import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [RegisterData,setRegisterData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    dob:{day:'',month:'',year:''},
    gender:''
  })

  const handleChange=async(e)=>{
    const {name,value}=e.target
    if(['day','month','year'].includes(name)){
      setRegisterData(prev=>({
        ...prev,
        dob:{
          ...prev.dob,
          [name]:value
        }
      }))

    }else{
      setRegisterData(prev=>({
        ...prev,
        [name]:value
      }))
    }
  }



  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const res=await axios.post('http://localhost:5000/register',RegisterData)
      alert(res.data.message || 'Registeration successful')
    }catch(e){
      console.error('Registration failed: ',e)
      alert(e.response?.data?.message)

    }

  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Your Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={RegisterData.firstName}
              onChange={handleChange}
              className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={RegisterData.lastName}
              onChange={handleChange}
              className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={RegisterData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={RegisterData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="gender"
            value={RegisterData.gender}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            type="date"
            name="dob"
            value={RegisterData.dob}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
