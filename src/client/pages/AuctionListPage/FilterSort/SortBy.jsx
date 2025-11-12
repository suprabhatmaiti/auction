import { useState } from "react";
import { IoRadioButtonOffOutline, IoRadioButtonOn } from "react-icons/io5";
import { useAuctionListContext } from "../context/useAuctionListContext";

function SortBy() {
  const { state, dispatch } = useAuctionListContext();
  const values = [
    { label: "Ending Soonest", value: "endingSoonest" },
    { label: "Highest Bid", value: "highestBid" },
    { label: "Newest First", value: "newestFirst" },
  ];

  const renderedValues = values.map((value) => {
    return (
      <div
        onClick={() => toggleSortByValues(value.value)}
        key={value.value}
        className="flex gap-2 items-center cursor-pointer text-violet-700"
      >
        {state.SortByValue[value.value] ? (
          <IoRadioButtonOn />
        ) : (
          <IoRadioButtonOffOutline />
        )}
        <h2 className="text-violet-500">{value.label}</h2>
      </div>
    );
  });
  const toggleSortByValues = (value) => {
    dispatch({
      type: "SET_SORT_BY",
      SortByValue: value,
    });
  };

  return (
    <div className="border-b border-gray-200 pb-2 mt-8 pr-4 ">
      <h2 className="font-semibold">Sort By</h2>
      <div className="mt-4">{renderedValues}</div>
    </div>
  );
}

export default SortBy;
