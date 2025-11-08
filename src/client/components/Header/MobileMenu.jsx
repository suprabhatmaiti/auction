import { CgClose, CgMenu } from 'react-icons/cg';
import { NavLink } from 'react-router-dom';
import { initialState, reducer } from './hooks/useAuthReducer';
import { useEffect, useReducer, useRef } from 'react';
import useAuth from '../../hooks/useAuth';

function MobileMenu({ isLoggedIn, onLoginClick }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { logout } = useAuth();
  const menuRef = useRef();

  const handleLoginClick = (e) => {
    onLoginClick();
    e.preventDefault();
    // dispatch({ type: 'TOGGLE_MENU' });
  };

  const handleOutsideClick = (e) => {
    if (!menuRef.current?.contains(e.target)) {
      dispatch({ type: 'TOGGLE_MENU' });
    }
  };

  useEffect(() => {
    if (!state.isMenuOpen) return;
    document.addEventListener('pointerdown', handleOutsideClick);

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
    };
  }, [state.isMenuOpen, handleOutsideClick]);

  const handleLogoutClick = async (e) => {
    e.preventDefault();
    console.log('Logging out...');
    try {
      await logout();
      alert('Logged out successfully.');
      dispatch({ type: 'TOGGLE_MENU' });
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to logout. Please try again.');
    }
  };

  const onNavLinkClick = () => {
    dispatch({ type: 'TOGGLE_MENU' });
  };

  return (
    <div>
      {!isLoggedIn ? (
        <button
          onClick={handleLoginClick}
          className=" bg-violet-700 hover:bg-violet-800 text-white px-6 py-2 rounded-lg font-semibold transition cursor-pointer active:scale-95 md:hidden  "
        >
          Login
        </button>
      ) : (
        <div ref={menuRef}>
          <button className="md:hidden p-1 text-gray-700 cursor-pointer" onClick={onNavLinkClick}>
            {state.isMenuOpen ? <CgClose size={24} /> : <CgMenu size={24} />}
          </button>
          {state.isMenuOpen && (
            <form className="absolute top-16 left-0 w-full bg-white shadow-md border-t border-gray-200 flex flex-col items-center py-4 space-y-3 md:hidden">
              <NavLink
                to="/"
                onClick={onNavLinkClick}
                className="text-violet-700 font-medium hover:text-violet-900"
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard"
                onClick={onNavLinkClick}
                className="text-violet-700 font-medium hover:text-violet-900"
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/profile"
                onClick={onNavLinkClick}
                className="text-violet-700 font-medium hover:text-violet-900"
              >
                Profile
              </NavLink>
              <button
                onClick={handleLogoutClick}
                className="bg-white hover:bg-gray-200 text-violet-600 px-6 py-2 rounded-lg font-semibold transition cursor-pointer border border-gray-500"
              >
                Logout
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default MobileMenu;

{
  /* 
      {state.isMenuOpen && (
        <form className="absolute top-16 left-0 w-full bg-white shadow-md border-t border-gray-200 flex flex-col items-center py-4 space-y-3 md:hidden">
          <NavLink
            to="/"
            onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
            className="text-violet-700 font-medium hover:text-violet-900"
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
            className="text-violet-700 font-medium hover:text-violet-900"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/profile"
            onClick={() => dispatch({ type: 'TOGGLE_MENU' })}
            className="text-violet-700 font-medium hover:text-violet-900"
          >
            Profile
          </NavLink> */
}
