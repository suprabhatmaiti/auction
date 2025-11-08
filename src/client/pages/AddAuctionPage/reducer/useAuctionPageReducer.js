export const initialState = {
  title: '',
  description: '',
  category: '',
  startingBid: '',
  auctionEndTime: '',
  imageFile: null,
};

export function useAuctionPageReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM':
      return initialState;
    case 'SET_IMAGE':
      return { ...state, imageFile: action.file };
    default:
      return state;
  }
}
