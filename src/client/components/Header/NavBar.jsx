import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function NavBar() {
  const activeClass =
    "text-violet-800 font-bold border-b-2 border-violet-600 pb-1";
  const inActiveClass = "text-violet-600 hover:text-violet-800";
  const { isLoggedIn } = useAuth();
  return (
    <nav className="hidden md:flex justify-center gap-8 text-violet-600 font-medium">
      {!isLoggedIn && (
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeClass : inActiveClass)}
        >
          Home
        </NavLink>
      )}

      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? activeClass : inActiveClass)}
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) => (isActive ? activeClass : inActiveClass)}
      >
        Profile
      </NavLink>
    </nav>
  );
}

export default NavBar;
