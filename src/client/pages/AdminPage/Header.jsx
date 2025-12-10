import React, { useEffect, useRef, useState } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";
import useAuth from "../../hooks/useAuth";
import { FaListCheck } from "react-icons/fa6";
import { LuTrophy } from "react-icons/lu";
import { FaRegHandshake } from "react-icons/fa";

import { IoMdMenu } from "react-icons/io";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";

export default function Header() {
  const { logout, user, loading, isAdmin } = useAuth();
  const [mobilemenu, setMobileMenu] = useState(false);

  const onLogoutClick = async () => {
    await logout();
  };
  const toggleMenu = () => {
    setMobileMenu(!mobilemenu);
  };

  return (
    <div>
      <button
        onClick={toggleMenu}
        className="text-2xl md:hidden cursor-pointer absolute top-6 left-1 hover:bg-gray-200 p-2 rounded-full"
      >
        <IoMdMenu className="size-8" />
      </button>

      {mobilemenu && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setMobileMenu(false)}
        ></div>
      )}

      {/* SIDEBAR */}

      <div
        className={`
    fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200
    transform transition-all duration-300 md:static md:translate-x-0
    ${mobilemenu ? "translate-x-0" : "-translate-x-full"}
  `}
      >
        <div
          onClick={toggleMenu}
          className={`absolute right-2 top-2 cursor-pointer bg-gray-200 hover:text-red-500 px-2 rounded-lg ${
            !mobilemenu ? "hidden" : "block"
          } `}
        >
          X
        </div>

        <div className="flex items-center space-x-3 mb-8 px-6 mt-4">
          <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-semibold">
            A
          </div>
          <div>
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm font-semibold text-gray-500">Administrator</p>
          </div>
        </div>

        <div className="px-6">
          <div className="space-y-2">
            <button className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all ">
              <HiViewGrid className="text-lg" />
              Auction Approval
            </button>
            <button className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all ">
              <LuTrophy className="text-lg" />
              Manage Winner
            </button>
            <button className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all ">
              <FaRegHandshake className="text-lg" />
              Handle Disputes
            </button>
          </div>
        </div>
        <div className="fixed bottom-0 w-full px-6 py-4">
          <button
            onClick={onLogoutClick}
            className="flex items-center gap-2 p-3 rounded-lg hover:bg-red-50 text-red-600 cursor-pointer transition-all w-full"
          >
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
