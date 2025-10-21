function QuickActionButtons({ onListAuction, onBidPlace }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 px-4 py-2">
      <button
        onClick={onBidPlace}
        className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-semibold transition"
      >
        Place a Bid
      </button>

      <button
        onClick={onListAuction}
        className="w-full sm:w-auto bg-white hover:bg-violet-600 hover:text-white text-violet-600 px-6 py-3 rounded-lg font-semibold shadow-md transition"
      >
        List an Item
      </button>
    </div>
  );
}

export default QuickActionButtons;
