function BiddingHistory() {
  return (
    <div>
      <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">
        Bidding History
      </h2>
      <div className="flex flex-wrap justify-between text-sm mt-3 text-gray-700">
        <div className="font-medium">Bidder</div>
        <div className="font-medium">Bid Amount</div>
        <div className="font-medium hidden md:block">Time</div>
        {/* map bids here  */}
      </div>
    </div>
  );
}
export default BiddingHistory;
