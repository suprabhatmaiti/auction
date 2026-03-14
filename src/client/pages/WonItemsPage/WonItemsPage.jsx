import { useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";

function WonItemsPage() {
  const [wonAuctions, setWonAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalWonItems, setTotalWonItems] = useState(0);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchWonAuctions = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/api/auction/won-auctions", {
          params: {
            page,
            pageSize: 12,
          },
          withCredentials: true,
        });

        setWonAuctions(data.wonAuctions || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalWonItems(data.pagination?.totalWonItems || 0);
      } catch (error) {
        toast.error("Failed to fetch won auctions");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWonAuctions();
  }, [page]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const renderedWonItems = wonAuctions.map((auction) => (
    <div
      key={auction.id}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img
          src={`${BASE_URL}/${auction.image_url}`}
          alt={auction.title}
          className="w-full h-full object-cover"
          onError={(e) =>
            (e.currentTarget.src = "https://via.placeholder.com/400x300")
          }
        />
        <span className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          Won
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {auction.title}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {auction.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700">
            {auction.category}
          </span>
          <span className="text-xs text-gray-500">
            Seller: {auction.seller_name}
          </span>
        </div>

        <div className="space-y-2 border-t pt-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Starting Bid:</span>
            <span className="text-sm font-semibold text-gray-800">
              ₹{Number(auction.start_price).toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Winning Amount:</span>
            <span className="text-sm font-semibold text-green-600">
              ₹{Number(auction.winning_amount).toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Won On:</span>
            <span className="text-xs text-gray-500">
              {new Date(auction.won_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        <button className="w-full mt-4 bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-lg font-medium transition">
          View Details
        </button>
      </div>
    </div>
  ));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <LoadingOverlay loading={loading} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">
            My Won Auctions
          </h1>
          <p className="text-gray-600">
            {totalWonItems === 0
              ? "You haven't won any auctions yet"
              : `You have won ${totalWonItems} auction${totalWonItems !== 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Won Items Grid or Empty State */}
        {wonAuctions.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-sm">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              No Won Items Yet
            </h2>
            <p className="text-gray-600 text-center mb-6 max-w-md">
              You haven't won any auctions yet. Start bidding on your favorite
              items to win them!
            </p>
            <a
              href="/auctions"
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Browse Auctions
            </a>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {renderedWonItems}
            </div>

            {/* Load More Button */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={page >= totalPages || loading}
                  className="bg-gray-700 hover:bg-gray-600 disabled:opacity-40 text-white px-8 py-3 rounded-lg font-semibold transition"
                >
                  {page >= totalPages ? "No More Items" : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default WonItemsPage;
