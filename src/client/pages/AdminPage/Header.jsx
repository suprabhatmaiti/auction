import React, { useEffect, useRef, useState } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";
import useAuth from "../../hooks/useAuth";
import { FaListCheck } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";

export default function Header() {
  const { logout, user } = useAuth();
  const [mobilemenu, setMobileMenu] = useState(false);

  const headerRef = useRef(null);

  const onLogoutClick = () => {
    logout();
  };
  const toggleMenu = () => {
    setMobileMenu(!mobilemenu);
  };

  return (
    <>
      {/* Menu button */}
      <button
        onClick={toggleMenu}
        className="text-2xl md:hidden cursor-pointer absolute top-6 left-1 hover:bg-gray-200 p-2 rounded-full"
      >
        <IoMdMenu className="size-8" />
      </button>

      {/* BACKDROP */}
      {mobilemenu && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setMobileMenu(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <div
        // ref={headerRef}
        className={`
      fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 p-5
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

        {/* Admin info */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-semibold">
            A
          </div>
          <div>
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500">Administrator</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 cursor-pointer">
            <HiViewGrid className="text-lg" />
            <span className="text-sm font-medium">Dashboard</span>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 cursor-pointer">
            <FaListCheck className="text-lg" />
            <span className="text-sm font-medium">Auctions</span>
          </div>
        </nav>

        {/* Logout */}
        <div
          className="flex items-center space-x-3 p-3 rounded-lg bg-red-50 hover:text-red-600 cursor-pointer mt-auto"
          onClick={onLogoutClick}
        >
          <FaSignOutAlt className="text-lg" />
          <span className="text-sm font-medium">Logout</span>
        </div>
      </div>
    </>
  );
}
