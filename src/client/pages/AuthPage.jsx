// src/components/LoginModal.jsx
import { useEffect, useState } from "react";
import Input from "../components/Input/Input";

function AuthPage({ isOpen, onClose, mode = 'login', onModeChange }) {


  const isLoginPageOpen = mode ==='login';

  if (!isOpen) return null;
  return (
    <div className=" fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-8 shadow-lg rounded-lg relative">
        <button onClick={onClose} className="absolute right-0 top-0 px-3 rounded-r-lg bg-gray-100 hover:shadow-lg hover:bg-gray-300 text-xl">x</button>
        <h2 className="text-violet-600 font-bold text-2xl px-12 ">{!isLoginPageOpen ? "Sign up to E-Auction" : "Sign in to your Account"}</h2>
        <div className="my-4 p-4">
          <form>
            {!isLoginPageOpen && <div><Input placeholder='Full Name' required/></div>}
            <Input type='Email' placeholder='Email' required/>
            <Input type='Password' placeholder='Password' required/>
            {!isLoginPageOpen && <div><Input placeholder='Confirm Password' required/></div>}
            {isLoginPageOpen && <p className="text-violet-600 py-3 cursor-pointer hover:text-violet-800">Forget your password</p>}
            <button onClick={onClose} type="button" className="bg-violet-600 text-white w-full rounded-lg h-10 font-bold hover:bg-violet-800 cursor-pointer">{(!isLoginPageOpen?'Sign up':'Login')}</button>
          </form>
          <p className="text-center p-4">{!isLoginPageOpen?"Already have an account? ":"Don't have an account? "} <span onClick={()=>onModeChange(isLoginPageOpen?'signup': 'login')} className="text-violet-600 cursor-pointer hover:text-violet-900">{!isLoginPageOpen ? "Login" : "Sign up"}</span> </p>
        </div>
      </div>
  </div>
  )
}

export default AuthPage;
