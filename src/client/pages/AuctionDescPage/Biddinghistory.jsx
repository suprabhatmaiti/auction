function BiddingHistory({ bid }) {
  return (
    <tr className="bg-white border-b">
      <td className="px-6 py-4 text-center">{bid.bidder_name}</td>
      <td className="px-6 py-4 text-center">{bid.bid_amount}</td>
      <td className="px-6 py-4 text-center hidden md:table-cell">
        {new Date(bid.bid_time).toLocaleString()}
      </td>
    </tr>
  );
}
export default BiddingHistory;
