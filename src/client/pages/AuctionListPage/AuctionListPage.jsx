import FilterSort from "./FilterSort/FilterSort";
import AuctionList from "./AuctionList/AuctionList";
import { useState } from "react";
import { useAuctionListContext } from "./context/useAuctionListContext";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";

function AuctionListPage() {
  const [filterSortMenuOpen, setFilterSortMenuOpen] = useState(false);
  const { state } = useAuctionListContext();

  const toggleFilterSortMenu = () => {
    setFilterSortMenuOpen(!filterSortMenuOpen);
  };

  return (
    <>
      <LoadingOverlay loading={state.loading} />
      <div className="min-h-screen relative bg-gray-50">
        {/* Mobile Filter & Sort Button */}
        <div className="md:hidden w-full text-white flex items-center justify-end px-4 py-1 shadow-md">
          <button
            onClick={toggleFilterSortMenu}
            className="text-gray-700 border border-gray-400 hover:bg-white hover:shadow-lg cursor-pointer px-4 py-1 rounded-lg font-semibold flex items-center gap-2"
          >
            Filter & Sort
          </button>
        </div>

        <div className="flex gap-4 px-8">
          {/* Filter & Sort sidebar */}
          <div className="hidden md:flex md:flex-row w-1/4 border-r border-gray-200 pt-8">
            <FilterSort />
          </div>

          {/* Auction list */}
          <div className="w-full md:pt-8">
            <AuctionList />
          </div>
        </div>

        {/* Mobile Filter & Sort Drawer */}
        {filterSortMenuOpen && (
          <div className="absolute inset-0 backdrop-blur-sm bg-opacity-30 z-40 flex justify-start md:hidden">
            <div className="bg-white w-3/4 max-w-xs h-full shadow-lg p-4 relative transform transition-transform duration-300">
              {/* Close button */}
              <button
                className="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                onClick={toggleFilterSortMenu}
              >
                ✕
              </button>

              <div>
                <FilterSort />
              </div>
            </div>

            {/* Clicking outside closes drawer */}
            <div className="flex-1" onClick={toggleFilterSortMenu}></div>
          </div>
        )}
      </div>
    </>
  );
}

export default AuctionListPage;
