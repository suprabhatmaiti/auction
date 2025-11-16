import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useAuctionListContext } from "../context/useAuctionListContext";

function PriceRange() {
  const { state, dispatch } = useAuctionListContext();
  const handleChange = (event) => {
    dispatch({ type: "SET_PRICE_RANGE", priceRange: event });
    dispatch({ type: "MARK_PENDING_CHANGES" });
  };

  return (
    <div className="mt-8 pr-4 border-b border-gray-200 pb-2">
      <h2 className="font-semibold">Price Range</h2>
      <div className="py-4 w-full flex flex-col gap-2">
        <RangeSlider
          min={0}
          max={10000}
          step={100}
          value={state.priceRange}
          onInput={handleChange}
        />
        <div className="flex justify-between">
          <p className="text-gray-600">${state.priceRange[0]}</p>
          <p className="text-gray-600">${state.priceRange[1]}</p>
        </div>
      </div>
    </div>
  );
}

export default PriceRange;
