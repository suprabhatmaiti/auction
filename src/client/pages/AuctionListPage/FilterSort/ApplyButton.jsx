import { useAuctionListContext } from "../context/useAuctionListContext";
export function ApplyButton() {
  const { state, dispatch } = useAuctionListContext();
  const toggleFilterSortMenu = () => {
    dispatch({ type: "APPLY_FILTER" });
    dispatch({ type: "CLEAR_PENDING_CHANGES" });
  };
  return (
    <div className="flex flex-row flex-wrap justify-around mt-4">
      <button className="sm:w-auto cursor-pointer bg-white hover:bg-violet-600 hover:text-white text-violet-600 px-4 py-1 rounded-lg font-semibold shadow-md active:scale-95 transition border border-gray-500">
        Cancel
      </button>
      <button
        onClick={toggleFilterSortMenu}
        disabled={!state.hasPendingChanges || state.loading}
        className="bg-violet-700 hover:bg-violet-800 text-white px-4 py-1 rounded-lg font-semibold transition cursor-pointer active:scale-95"
      >
        {state.loading ? "Applying..." : "Apply"}
      </button>
    </div>
  );
}
