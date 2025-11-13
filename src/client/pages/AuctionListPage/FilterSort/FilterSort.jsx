import { useReducer } from "react";
import Categories from "./Categories";
import PriceRange from "./PriceRange";
import SortBy from "./SortBy";
import { useAuctionListContext } from "../context/useAuctionListContext";
import { ApplyButton } from "./ApplyButton";

function FilterSort({}) {
  const { state } = useAuctionListContext();
  // console.log("Current State is : ", state);
  return (
    <div className="w-full">
      <Categories />
      <PriceRange />
      <SortBy />
      <ApplyButton />
    </div>
  );
}

export default FilterSort;
