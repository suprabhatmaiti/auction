export const initialState = {
  title: "",
  description: "",
  category: "",
  startingBid: "",
  auctionRunTime: { days: 0, hours: 0, minutes: 0, seconds: 0 },
  imageFile: null,
};

export function useAuctionPageReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "UPDATE_AUCTION_RUN_TIME":
      console.log(action.payload);
      return {
        ...state,
        auctionRunTime: {
          ...state.auctionRunTime,
          [action.payload.name]: action.payload.value,
        },
      };
    case "RESET_FORM":
      return initialState;
    case "SET_IMAGE":
      return { ...state, imageFile: action.file };
    default:
      return state;
  }
}
