import PriceRange from "../FilterSort/PriceRange";
import SortBy from "../FilterSort/SortBy";

const initialState = {
  auctions: [],
  PriceRange: [0, 10000],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  SortByValue: "newest",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_AUCTIONS_START":
      return { ...state, loading: true, error: null };
    case "FETCH_AUCTIONS_SUCCESS":
      return {
        ...state,
        loading: false,
        auctions:
          action.page === 1
            ? action.auctions
            : [...state.auctions, ...action.auctions],
        page: action.page,
        totalPages: action.totalPages,
      };
    case "FETCH_AUCTIONS_FAILURE":
      return { ...state, loading: false, error: action.error };
    case "SET_PRICE_RANGE":
      return { ...state, PriceRange: action.PriceRange };
    case "SET_SORT_BY":
      return { ...state, SortByValue: action.SortByValue };
    default:
      return state;
  }
};

export { initialState, reducer };
