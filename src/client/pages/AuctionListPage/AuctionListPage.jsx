import FilterSort from './FilterSort/FilterSort';
import AuctionList from './AuctionList/AuctionList';
import { useState } from 'react';
import { RiMenuFold2Line, RiMenuFoldLine } from "react-icons/ri";

function AuctionListPage() {
  const [selectedCategories, setSelectedCategories] = useState({});
  const [filterSortMenuOpen, setFilterSortMenuOpen] = useState(false);

  return (
    <div className="min-h-screen  relative bg-gray-50">
     
      {/* div for small screens */}
      <div className="md:hidden w-full text-white flex items-center justify-end px-4 py-1 shadow-md">
            <button
            onClick={() => setFilterSortMenuOpen(true)}
            className='text-gray-700 border border-gray-400 hover:bg-white hover:shadow-lg cursor-pointer px-4 py-1 rounded-lg font-semibold flex items-center gap-2'
            >
            Filter & Sort
            </button>
        </div>

         {/* Container */}
      <div className="flex gap-4">

        {/* Desktop filter panel */}
        <div className="hidden md:block w-1/4 border-r border-gray-200 pt-8">
          <FilterSort
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>

        {/* Auction list */}
        <div className="w-full pt-8">
          <AuctionList selectedCategories={selectedCategories} />
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filterSortMenuOpen && (
        <div className="absolute inset-0 backdrop-blur-sm bg-opacity-30 z-40 flex justify-start">
          <div className="bg-white w-3/4 max-w-xs h-full shadow-lg p-4 relative transform transition-transform duration-300">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setFilterSortMenuOpen(false)}
            >
              ✕
            </button>

            <FilterSort
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>

          {/* Clicking outside closes drawer */}
          <div
            className="flex-1"
            onClick={() => setFilterSortMenuOpen(false)}
          ></div>
        </div>
      )}
    </div>
  );
}

export default AuctionListPage;
