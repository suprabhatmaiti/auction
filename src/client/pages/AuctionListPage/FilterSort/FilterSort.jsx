import { useReducer } from "react";
import Categories from "./Categories";
import PriceRange from "./PriceRange";
import SortBy from "./SortBy";
import { useAuctionListContext } from "../context/useAuctionListContext";

function FilterSort({}) {
  const { state } = useAuctionListContext();
  console.log("Current State is : ", state);
  return (
    <div className="w-full px-8 py-6 ">
      <Categories />
      <PriceRange />
      <SortBy />
    </div>
  );
}

export default FilterSort;
