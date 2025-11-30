function BiddingHistory({ bid }) {
  return (
    <div className="flex justify-between">
      <div>{bid.bidder_name}</div>
      <div>{bid.bid_amount}</div>
      <div className="hidden md:block">{bid.bid_time.toLocaleString()}</div>
    </div>
  );
}
export default BiddingHistory;
