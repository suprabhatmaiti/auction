import { CgProfile, CgLogOut, CgBell } from "react-icons/cg";
import { FiSettings, FiHelpCircle, FiHeart, FiClock } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import useAuth from "../../../hooks/useAuth";

function RightSection({ isLoggedIn, onLoginClick }) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClick = () => setIsOpen((prev) => !prev);

  const handleLogoutClick = (e) => {
    logout();
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      
      if (!dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="hidden md:flex justify-around items-center gap-8">
      {isLoggedIn ? (
        <div className="relative flex items-center gap-4" ref={dropdownRef}>
          <CgProfile
            onClick={handleClick}
            className="size-6 cursor-pointer hover:scale-110 hover:text-violet-600 transition-transform duration-200"
          />

          {/* Dropdown */}
          <div
            className={`${isOpen ? "flex" : "hidden"} absolute right-0 top-8 
              bg-white border border-gray-300 rounded-lg shadow-lg 
              flex-col gap-1 w-52 py-2 transition-all duration-200 z-50`}
          >
            <div className="hover:bg-gray-100 px-3 py-2 flex items-center gap-2 cursor-pointer rounded-md transition-all duration-200">
              <CgProfile className="size-5 text-gray-600" />
              <span className="font-semibold">{user?.name}</span>
            </div>

            <div className="hover:bg-gray-100 px-3 py-2 flex items-center gap-2 cursor-pointer rounded-md transition-all duration-200">
              <FiSettings className="size-5 text-gray-600" />
              <span className="font-medium">Settings</span>
            </div>

            <div className="hover:bg-gray-100 px-3 py-2 flex items-center gap-2 cursor-pointer rounded-md transition-all duration-200">
              <CgBell className="size-5 text-gray-600" />
              <span className="font-medium">Notifications</span>
            </div>

            <div className="hover:bg-gray-100 px-3 py-2 flex items-center gap-2 cursor-pointer rounded-md transition-all duration-200">
              <FiHeart className="size-5 text-gray-600" />
              <span className="font-medium">Saved Items</span>
            </div>

            <div className="hover:bg-gray-100 px-3 py-2 flex items-center gap-2 cursor-pointer rounded-md transition-all duration-200">
              <FiClock className="size-5 text-gray-600" />
              <span className="font-medium">Recent Activity</span>
            </div>

            <div className="hover:bg-gray-100 px-3 py-2 flex items-center gap-2 cursor-pointer rounded-md transition-all duration-200">
              <FiHelpCircle className="size-5 text-gray-600" />
              <span className="font-medium">Help & Support</span>
            </div>

            <div
              onClick={handleLogoutClick}
              className="hover:bg-gray-100 px-3 py-2 flex items-center gap-2 cursor-pointer rounded-md transition-all duration-200 text-red-500"
            >
              <CgLogOut className="size-5" />
              <span className="font-semibold">Logout</span>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={onLoginClick}
          className="cursor-pointer bg-violet-600 hover:bg-violet-700 active:scale-95 text-white px-6 py-3 rounded-lg font-bold transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Login
        </button>
      )}
    </div>
  );
}

export default RightSection;
