import { CgClose, CgMenu } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import {initialState, reducer} from './hooks/useAuthReducer'
import { useReducer } from "react";
import useAuth from "../../hooks/useAuth";

function MobileMenu({ isLoggedIn, onLoginClick}){
    const [state,dispatch] = useReducer(reducer,initialState);
    const {logout}= useAuth();
    const handleLoginClick = (e) => {
        onLoginClick();
        e.preventDefault();
        dispatch({type: "TOGGLE_MENU"});
    }

    const handleLogoutClick = (e) => {
        e.preventDefault();
        dispatch({type: "TOGGLE_MENU"});
    }
    return(
        <>
        
            <button
                className="md:hidden p-1 text-gray-700"
                onClick={() => dispatch({ type: "TOGGLE_MENU" }) }
                >
                {state.isMenuOpen ? <CgClose size={24} /> : <CgMenu size={24} />}
            </button>
            {state.isMenuOpen && (
                <form className="absolute top-16 left-0 w-full bg-white shadow-md border-t border-gray-200 flex flex-col items-center py-4 space-y-3 md:hidden">
                    <NavLink to="/" onClick={() => dispatch({ type: "TOGGLE_MENU" })} className="text-violet-700 font-medium hover:text-violet-900">
                        Home
                    </NavLink>
                    <NavLink to="/dashboard" onClick={() => dispatch({ type: "TOGGLE_MENU" })} className="text-violet-700 font-medium hover:text-violet-900">
                        Dashboard
                    </NavLink>
                    <NavLink to="/profile" onClick={() => dispatch({ type: "TOGGLE_MENU" })} className="text-violet-700 font-medium hover:text-violet-900">
                        Profile
                    </NavLink>
                    {!isLoggedIn? (
                        <button
                        onClick={handleLoginClick}
                        className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg font-semibold transition cursor-pointer"
                        >
                        Login
                        </button> 
                    ):<button
                        onClick={logout}
                        className="bg-white hover:bg-gray-200 text-violet-600 px-6 py-2 rounded-lg font-semibold transition cursor-pointer border border-gray-500"
                        >
                        Logout
                        </button> }
                </form>
            )}
        </>
    )   
    
}


export default MobileMenu;