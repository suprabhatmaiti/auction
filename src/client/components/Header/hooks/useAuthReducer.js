export const initialState = {
  isAuthModalOpen: false,
  authMode:"login",
  isMenuOpen:false,
}

export function reducer(state,action){
  switch(action.type){
    case "OPEN_AUTH_MODAL":
      return{
        ...state,
        isAuthModalOpen:true,
        authMode:action.payload || 'login',
      }
      case "CLOSE_AUTH_MODAL":
        return{
          ...state,
          isAuthModalOpen:false,
        }
      case "SET_AUTH_MODE":
        return { ...state, authMode: action.payload };

      case "TOGGLE_MENU":
        return{
          ...state,
          isMenuOpen:!state.isMenuOpen
        }
      default:
        return state;
  }

}