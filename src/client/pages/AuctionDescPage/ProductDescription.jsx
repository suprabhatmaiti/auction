import Input from "../../components/Input/Input";
import useAuth from "../../hooks/useAuth";
import tigerImage from "../../assets/tiger.svg";
import { useState } from "react";
function ProductDescription({
  auction,
  loading,
  onPlaceBid,
  isSeller,
  isActive,
}) {
  const [bidAmount, setBidAmount] = useState("");
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const imgSrc = `${API_BASE}/${auction.image_url}`;
  const startingBid = Number(auction.start_price);

  const { user } = useAuth();

  const handleBidAmountChange = (e) => {
    setBidAmount((prev) => (prev = e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlaceBid(bidAmount);
    setBidAmount("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Images */}
      <div className="border rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center min-h-[280px]">
        <img
          src={imgSrc}
          alt={auction.title}
          className="max-w-full max-h-[480px] object-contain"
          onError={(e) => (e.currentTarget.src = tigerImage)}
        />
      </div>

      {/* Details */}
      <div className=" rounded-2xl bg-white p-4 md:p-6 space-y-4">
        <h1 className="text-2xl font-bold">{auction.title}</h1>
        <p className="text-gray-700">{auction.description}</p>

        <div className="flex items-center gap-2 text-sm flex justify-between">
          <span className="px-2 py-1 bg-gray-200 rounded">
            {auction.category}
          </span>
          <span className="text-gray-500 flex gap-2">
            Seller :{"  "}
            <p className="bg-red-200 px-2 rounded-sm">
              {auction.seller_name === user.name ? "You" : auction.seller_name}
            </p>
          </span>
        </div>

        <div className="flex justify-between">
          <div className="text-lg font-semibold">
            Starting Bid: ₹{startingBid.toLocaleString("en-IN")}
          </div>
          <div className="text-lg font-semibold">
            Current Bid: ₹{auction.current_price}
          </div>
        </div>

        <div className="text-sm text-gray-600">
          Starts: {new Date(auction.start_time).toLocaleString()}
          <br />
          Ends: {new Date(auction.end_time).toLocaleString()}
        </div>

        {!isSeller ? (
          <form onSubmit={handleSubmit}>
            <div className="">
              <Input
                type="number"
                label="Your Bid Amount (₹)"
                placeholder="Enter your bid"
                value={bidAmount}
                onChange={handleBidAmountChange}
              />
              <button
                disabled={!isActive || loading}
                type="submit"
                className="mt-4 w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                Place Bid
              </button>
            </div>
          </form>
        ) : (
          <div className="text-gray-400 text-3xl flex justify-center mt-10">
            Seller Can't join the auction.
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDescription;
