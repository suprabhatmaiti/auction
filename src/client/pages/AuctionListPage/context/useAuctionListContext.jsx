import { createContext, use, useReducer } from "react";

const initialState = {
  auctions: [],
  categories: {},
  priceRange: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  SortByValue: { newestFirst: true },
  applyFilter: false,
  hasPendingChanges: false,
  searchTerm: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_AUCTIONS_START":
      return { ...state, loading: true, error: null };
    case "FETCH_AUCTIONS_SUCCESS":
      return {
        ...state,
        loading: false,
        auctions: action.auctions,
        page: action.page,
        totalPages: action.totalPages,
      };
    case "FETCH_AUCTIONS_FAILURE":
      return { ...state, loading: false, error: action.error };
    case "SET_PRICE_RANGE":
      return { ...state, priceRange: action.priceRange };
    case "SET_SORT_BY":
      return {
        ...state,
        SortByValue: {
          [action.SortByValue]: true,
        },
      };
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.categories]: !state.categories[action.categories],
        },
      };
    case "RESET":
      return initialState;

    case "APPLY_FILTER":
      return {
        ...state,
        applyFilter: !state.applyFilter,
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.page,
        totalPages: action.totalPages,
      };

    case "SET_SEARCH":
      return {
        ...state,
        searchTerm: action.searchTerm,
      };
    case "MARK_PENDING_CHANGES":
      return { ...state, hasPendingChanges: true };

    case "CLEAR_PENDING_CHANGES":
      return { ...state, hasPendingChanges: false };
    case "CLEAR_FILTERS":
      return {
        ...state,

        auctions: [],
        totalPages: 1,
        page: 1,
      };
    default:
      return state;
  }
};

const AuctionContext = createContext();

export const AuctionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuctionContext.Provider value={{ state, dispatch }}>
      {children}
    </AuctionContext.Provider>
  );
};

export function useAuctionListContext() {
  return use(AuctionContext);
}
