import { useReducer } from "react";
import Categories from "./Categories";
import PriceRange from "./PriceRange";
import SortBy from "./SortBy";
import { useAuctionListContext } from "../context/useAuctionListContext";
import { ApplyButton } from "./ApplyButton";

function FilterSort({}) {
  const { state } = useAuctionListContext();
  return (
    <div className="w-full">
      <Categories />
      <PriceRange />
      <SortBy />
      {state.hasPendingChanges && <ApplyButton />}
    </div>
  );
}

export default FilterSort;
