import { RxCross1 } from "react-icons/rx";
import Card from "../../../components/Card/Card";
import api from "../../../utils/api";
import { useEffect, useState } from "react";
import { useAuctionListContext } from "../context/useAuctionListContext";

function AuctionList({}) {
  let [auctions, setAuctions] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { state, dispatch } = useAuctionListContext();

  // const SortByValue =
  //   Object.keys(state.SortByValue).find((key) => state.SortByValue[key]) ||
  //   "newestFirst";

  // if (SortByValue === "endingSoonest") {
  //   auctions.sort(
  //     (a, b) => new Date(a.end_time).getTime() - new Date(b.end_time).getTime()
  //   );
  // } else if (SortByValue === "highestBid") {
  //   auctions.sort((a, b) => b.current_price - a.current_price);
  // } else if (SortByValue === "newestFirst") {
  //   auctions.sort(
  //     (a, b) =>
  //       new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  //   );
  // }
  // if (state.priceRange) {
  //   const [minPrice, maxPrice] = state.priceRange;
  //   auctions = auctions.filter(
  //     (auction) =>
  //       auction.current_price >= minPrice && auction.current_price <= maxPrice
  //   );
  // }

  const activeCategories = Object.keys(state.categories)
    .filter((key) => state.categories[key])
    .join(",");

  useEffect(() => {
    setAuctions([]);
    setPage(1);
    setTotalPages(1);
  }, [state.applyFilter]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        dispatch({ type: "FETCH_AUCTIONS_START" });
        const { data } = await api.get("/api/auction/get-auctions", {
          params: {
            categories: activeCategories,
            activeOnly: false,
            startPrice: state.priceRange[0],
            endPrice: state.priceRange[1],
            page,
            pageSize: 12,
            sortBy:
              Object.keys(state.SortByValue).find(
                (key) => state.SortByValue[key]
              ) || "newest",
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
        dispatch({
          type: "FETCH_AUCTIONS_SUCCESS",
          auctions: data.auctions || [],
          totalPages: data.pagination?.totalPages || 1,
          replace: page === 1,
        });
        const newItems = data?.auctions || [];
        const pg = data?.pagination || {};
        setAuctions((prev) => (page === 1 ? newItems : [...prev, ...newItems]));
        if (pg.currentPage !== page) {
          setPage(pg.currentPage);
        }
        setTotalPages(pg.totalPages || 1);
      } catch (error) {
        console.log("Error fetching auctions:", error);
      }
    };
    fetchAuctions();
  }, [state.page, state.loading]);

  const hasMore = page < totalPages;

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const BASE_URL = "http://localhost:3000";

  const renderedAuctions = auctions.map((auction) => (
    <div key={auction.id} className="w-[40%] sm:w-[48%] md:w-[32%] lg:w-[23%]">
      <Card
        key={auction.id}
        image={`${BASE_URL}/${auction.image_url}`}
        name={auction.title}
        currentbid={auction.current_price}
        button="Bid Now"
        id={auction.id}
      />
    </div>
  ));

  const handleRemoveCategory = (category) => {
    dispatch({
      type: "SET_CATEGORIES",
      categories: category,
    });
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
      <div className="mb-4">
        <h2 className="font-bold text-xl md:text-2xl mb-1">
          All Active Auctions
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Browse through our curated collection of items up for auction
        </p>
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
        {auctions.length === 0 ? "No Auctions Found" : renderedAuctions}
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
