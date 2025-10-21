import { NavLink} from "react-router-dom";


function NavBar(){
    const activeClass = "text-violet-800 font-bold border-b-2 border-violet-600 pb-1";
    const inActiveClass ="text-violet-600 hover:text-violet-800";
    return(
        <nav className="hidden md:flex gap-8 text-violet-600 font-medium">
        <NavLink to="/" className={({ isActive }) =>
          isActive ? activeClass : inActiveClass
        }>Home</NavLink>

        <NavLink to="/dashboard" className={({ isActive }) =>
          isActive ? activeClass : inActiveClass
        }>Dashboard</NavLink>

        <NavLink to="/profile" className={({ isActive }) =>
          isActive ? activeClass : inActiveClass
        }>Profile</NavLink>
      </nav>
    )
}

export default NavBar;