
import { useReducer, useState } from "react";
import AuthPage from "../../pages/AuthPage/AuthPage";
import useAuth from "../../hooks/useAuth";
import RightSection from "./RightSection";
import NavBar from "./NavBar";
import LogoSection from "./LogoSection";
import MobileMenu from "./MobileMenu";
import {initialState, reducer} from './hooks/useAuthReducer'


function Header() {
  const [state, dispatch] = useReducer(reducer,initialState);

  const {user,isLoggedIn,logout} = useAuth();

  const HandleLoginClick = ()=>{
    dispatch({
      type:"OPEN_AUTH_MODAL",
      payload: "login",
      
    });
  }

  return (
    <div>
      <header className="relative z-50 border-b border-gray-300 flex justify-between items-center h-15 p-4">
          <LogoSection/>
          <NavBar/>
          <RightSection isLoggedIn={isLoggedIn} onLoginClick={HandleLoginClick} />
          <MobileMenu isLoggedIn={isLoggedIn} onLoginClick={HandleLoginClick} />
      </header>

      <AuthPage
          isOpen={state.isAuthModalOpen}
          onClose={() => dispatch({ type: "CLOSE_AUTH_MODAL" })}
          mode={state.authMode}
          onModeChange={(mode) => dispatch({ type: "SET_AUTH_MODE", payload: mode })}
        />
    </div>

  );
}

export default Header;
