import { useState } from "react";
import { IoCheckboxOutline, IoCheckbox } from "react-icons/io5";
import { useAuctionListContext } from "../context/useAuctionListContext";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

function AuctionStatus() {
  const { state, dispatch } = useAuctionListContext();

  const toggleShowOnlyEnded = () => {
    dispatch({
      type: "SET_SHOW_ONLY_ENDED",
      showOnlyEnded: !state.showOnlyEnded,
    });
    dispatch({ type: "MARK_PENDING_CHANGES" });
  };

  return (
    <div className="border-b border-gray-200 pb-4 mt-8 pr-4">
      <h2 className="font-semibold mb-4">Auction Status</h2>
      <div
        onClick={toggleShowOnlyEnded}
        className="flex gap-2 items-center cursor-pointer text-violet-700"
      >
        <div>
          {state.showOnlyEnded ? (
            <IoCheckbox size={20} />
          ) : (
            <MdOutlineCheckBoxOutlineBlank size={20} />
          )}
        </div>
        <div>
          <h2 className="text-violet-500">Show Preveously Ended Auctions</h2>
        </div>
      </div>
    </div>
  );
}

export default AuctionStatus;
