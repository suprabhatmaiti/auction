import { useReducer, useState } from 'react';
import AuthPage from '../../pages/AuthPage/AuthPage';
import useAuth from '../../hooks/useAuth';
import UserControlSection from './UserControlSection/UserControlSection';
import NavBar from './NavBar';
import LogoSection from './LogoSection';
import MobileMenu from './MobileMenu';
import { initialState, reducer } from './hooks/useAuthReducer.js';

function Header() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isLoggedIn } = useAuth();

  const HandleLoginClick = () => {
    dispatch({
      type: 'OPEN_AUTH_MODAL',
      payload: 'login',
    });
  };

  return (
    <div>
      <header className="relative w-full z-50 border-b border-gray-300 flex justify-between items-center h-15 p-4 bg-white shadow-md">
        <div className="md:w-1/4">
          <LogoSection />
        </div>
        <div className="md:w-2/4">{isLoggedIn && <NavBar />}</div>
        <div className="hidden md:flex justify-end items-center gap-8 w-1/4">
          <UserControlSection isLoggedIn={isLoggedIn} onLoginClick={HandleLoginClick} />
        </div>
        <div className=" md:hidden flex justify-end items-center">
          <MobileMenu isLoggedIn={isLoggedIn} onLoginClick={HandleLoginClick} />
        </div>
      </header>

      <AuthPage
        isOpen={state.isAuthModalOpen}
        onClose={() => dispatch({ type: 'CLOSE_AUTH_MODAL' })}
        mode={state.authMode}
        onModeChange={(mode) => dispatch({ type: 'SET_AUTH_MODE', payload: mode })}
      />
    </div>
  );
}

export default Header;
