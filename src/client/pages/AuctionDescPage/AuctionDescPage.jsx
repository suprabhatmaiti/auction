import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import tigerImage from "../../assets/tiger.svg";
import Input from "../../components/Input/Input";
import useAuth from "../../hooks/useAuth";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

function AuctionDescPage() {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [bidAmount, setBidAmount] = useState(0);

  const { user } = useAuth();

  useEffect(() => {
    if (!id) return;
    let canceled = false;

    (async () => {
      try {
        setLoading(true);
        setErr("");
        const { data } = await api.get(`/api/auction/get-auction/${id}`, {
          withCredentials: true,
        });
        if (canceled) return;

        setAuction(data.auction || null);
      } catch (error) {
        if (canceled) return;
        setErr(
          error.response?.data?.error ||
            error.response?.data?.message ||
            error.message ||
            "Failed to load auction"
        );
      } finally {
        if (!canceled) setLoading(false);
      }
    })();

    return () => {
      canceled = true;
    };
  }, [id]);

  if (!id) return <div className="p-8">Invalid auction id.</div>;
  if (loading) return <div className="p-8">Loading auction…</div>;
  if (err) return <div className="p-8 text-red-600">Error: {err}</div>;
  if (!auction) return <div className="p-8">Auction not found.</div>;

  const imgSrc = `http://localhost:3000/${auction.image_url}`;
  const price = Number(auction.current_price ?? auction.start_price ?? 0);
  const startingBid = Number(auction.start_price);

  const handleBidAmountChange = (e) => {
    setBidAmount(e.target.value);
  };
  const handlePlaceBidClick = () => {
    if (bidAmount <= price) {
      alert("Bid amount must be greater than current price.");
      return;
    } else {
      alert("Bid placed successfully!");
      setBidAmount(0);
    }
  };

  return (
    <div className="min-h-screen pb-10">
      <div className="p-8 space-y-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600">
          Home / Auctions / {auction.category} / {auction.title}
        </div>

        {/* Main layout */}
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
                  {auction.seller_name === user.name
                    ? "You"
                    : auction.seller_name}
                </p>
              </span>
            </div>

            <div className="flex justify-between">
              <div className="text-lg font-semibold">
                Starting Bid: ₹{startingBid.toLocaleString("en-IN")}
              </div>
              <div className="text-lg font-semibold">
                Current Bid: ₹{price.toLocaleString("en-IN")}
              </div>
            </div>

            <div className="text-sm text-gray-600">
              Starts: {new Date(auction.start_time).toLocaleString()}
              <br />
              Ends: {new Date(auction.end_time).toLocaleString()}
            </div>

            <div className="">
              <Input
                type="number"
                label="Your Bid Amount (₹)"
                placeholder="Enter your bid"
                value={bidAmount}
                onChange={handleBidAmountChange}
              />
              <button
                onClick={handlePlaceBidClick}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                Place Bid
              </button>
            </div>
          </div>
        </div>

        {/* Bidding history placeholder */}
        <div>
          <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">
            Bidding History
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 text-sm mt-3 text-gray-700">
            <div className="font-medium">Bidder</div>
            <div className="font-medium">Bid Amount</div>
            <div className="font-medium hidden md:block">Time</div>
            {/* map bids here  */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuctionDescPage;
