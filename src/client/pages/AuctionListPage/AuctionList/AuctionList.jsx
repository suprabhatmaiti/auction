import { RxCross1 } from "react-icons/rx";
import Card from "../../../components/Card/Card";
import api from "../../../utils/api";
import { useEffect, useState } from "react";
import { useAuctionListContext } from "../context/useAuctionListContext";
import { toast } from "react-toastify";
import Input from "../../../components/Input/Input";
import { FaSearch } from "react-icons/fa";
function AuctionList({}) {
  const [reload, setReload] = useState(false);
  const { state, dispatch } = useAuctionListContext();

  const SortByValue =
    Object.keys(state.SortByValue).find((key) => state.SortByValue[key]) ||
    "newestFirst";
  let SortByParams;

  if (SortByValue === "endingSoonest") {
    SortByParams = "end_time";
  } else if (SortByValue === "highestBid") {
    SortByParams = "price";
  } else if (SortByValue === "newestFirst") {
    SortByParams = "newest";
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setReload(!reload);
  };

  const activeCategories = Object.keys(state.categories)
    .filter((key) => state.categories[key])
    .join(",");

  useEffect(() => {
    dispatch({ type: "CLEAR_FILTERS" });
  }, [state.applyFilter, reload]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        dispatch({ type: "FETCH_AUCTIONS_START" });
        const { data } = await api.get("/api/auction/get-auctions", {
          params: {
            categories: activeCategories,
            activeOnly: true,
            sortBy: SortByParams,
            page: state.page,
            startPrice: state.priceRange[0],
            endPrice: state.priceRange[1],
            pageSize: 12,
            search: state.searchTerm,
          },
          withCredentials: true,
        });
        if (!data) {
          dispatch({
            type: "FETCH_AUCTIONS_FAILURE",
            error: "No data received from server",
          });
          return;
        }
        const newItems = data?.auctions || [];
        dispatch({
          type: "FETCH_AUCTIONS_SUCCESS",
          auctions:
            state.page === 1 ? newItems : [...state.auctions, ...newItems],
          page: data?.pagination?.currentPage || 1,
          totalPages: data?.pagination?.totalPages || 1,
        });

        const pg = data?.pagination || {};

        if (pg.currentPage !== state.page) {
          dispatch({ type: "SET_PAGE", page: pg.currentPage });
        }
      } catch (error) {
        toast.error("Error fetching auctions");
      } finally {
        dispatch({
          type: "FETCH_AUCTIONS_FAILURE",
          error: "No data received from server",
        });
      }
    };
    fetchAuctions();
  }, [state.page, state.applyFilter, reload]);

  const hasMore = state.page < state.totalPages;

  const handleLoadMore = () => {
    if (hasMore) {
      dispatch({ type: "SET_PAGE", page: state.page + 1 });
    }
  };

  const BASE_URL = "http://localhost:3000";

  const renderedAuctions = state.auctions.map((auction) => {
    const endIn = new Date(auction.end_time) - new Date();

    return (
      <div
        key={auction.id}
        className="w-[40%] sm:w-[48%] md:w-[32%] lg:w-[23%]"
      >
        <Card
          image={`${BASE_URL}/${auction.image_url}`}
          name={auction.title}
          currentbid={auction.current_price}
          button="Bid Now"
          id={auction.id}
          endIn={endIn}
        />
      </div>
    );
  });

  const handleRemoveCategory = (category) => {
    dispatch({
      type: "SET_CATEGORIES",
      categories: category,
    });
    setReload(!reload);
  };
  const onSearchChange = (e) => {
    const value = e.target.value;
    dispatch({ type: "SET_SEARCH", searchTerm: value });
  };

  const activeCategoriesList = activeCategories
    ? activeCategories.split(",")
    : [];

  const renderedSelectedCategories = activeCategoriesList.map((category) => (
    <div
      key={category}
      className="bg-violet-300 rounded-xl px-3 py-1 flex justify-center items-center gap-1 cursor-pointer"
    >
      <p className="text-sm font-medium">{category}</p>
      <RxCross1
        className="text-sm hover:text-red-600"
        onClick={() => handleRemoveCategory(category)}
      />
    </div>
  ));

  return (
    <div className="px-4 md:px-8 py-6 ">
      {/* Header */}
      <div>
        <div className="mb-4">
          <h2 className="font-bold text-xl md:text-2xl mb-1">
            All Active Auctions
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Browse through our curated collection of items up for auction
          </p>
        </div>
        <div>
          <form
            onSubmit={handleSearch}
            className="flex items-center justify-between gap-1"
          >
            <input
              className="border border-gray-400 w-full rounded-full p-2"
              type="text"
              placeholder="Search Auction"
              value={state.searchTerm}
              onChange={onSearchChange}
            />
            <button className="text-blue-600 text-xl font-5xl hover:bg-gray-200 rounded-full p-2 cursor-pointer">
              <FaSearch />
            </button>
          </form>
        </div>
      </div>

      {/* Selected Categories */}
      <div>
        {state.categories && (
          <div className="flex flex-wrap gap-2 md:gap-4 mb-6">
            {renderedSelectedCategories}
          </div>
        )}
      </div>
      {/* Auction Cards */}
      <div className="flex flex-wrap  gap-6">
        {state.auctions.length === 0 ? "No Auctions Found" : renderedAuctions}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-8 pb-20">
        <button
          onClick={handleLoadMore}
          disabled={!hasMore || state.loading}
          className="bg-gray-700 hover:bg-gray-600 disabled:opacity-40 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          {state.loading ? "Loading..." : hasMore ? "Load More" : "No More"}
        </button>
      </div>
    </div>
  );
}

export default AuctionList;
