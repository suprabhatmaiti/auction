import { CgBell, CgProfile } from "react-icons/cg";
import { IoLogoCss3 } from "react-icons/io";
import Button from "../Button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthPage from "../../pages/AuthPage";

function Header() {
  const [IsAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="bg-black/10 flex justify-between items-center h-15 px-4">

      <div className="w-1/5 flex items-center gap-2">
        <IoLogoCss3 className="size-10 text-violet-500" />
        <h3 className="font-bold text-lg">E-Auction</h3>
      </div>



      <div className="w-2/5 flex justify-around text-violet-600 font-medium">
        
        <NavLink to="/" className={({isActive})=>(
          isActive ? "text-violet-800 font-bold border-b-2 border-violet-600 pb-1 " : "text-violet-600 hover:text-violet-800" 
        )}>
          Home
        </NavLink>
        <NavLink to="/dashboard" className={({isActive})=>(
          isActive ? "text-violet-800 font-bold border-b-2 border-violet-600 pb-1 " : "text-violet-600 hover:text-violet-800" 
        )}>
          Dashboard
        </NavLink>
        <NavLink to="/profile" className={({isActive})=>(
          isActive ? "text-violet-800 font-bold border-b-2 border-violet-600 pb-1 " : "text-violet-600 hover:text-violet-800" 
        )}>
          Profile
        </NavLink>
        
      </div>

      <div className="flex justify-around w-1/5 items-center gap-1">
        <CgBell className="size-6 cursor-pointer" />
        <CgProfile className="size-6 cursor-pointer" />
        <button onClick={()=>setIsAuthModalOpen(true)} className="cursor-pointer bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-bold transition">Login</button>
        {/* <button className="cursor-pointer bg-white hover:bg-gray-100 text-violet-500 px-6 py-3 rounded-lg font-bold transition shadow-md">Sign Up</button> */}

        
      </div>

      <AuthPage isOpen={IsAuthModalOpen} onClose={()=>setIsAuthModalOpen(false)} />
    </div>

  );
}

export default Header;
