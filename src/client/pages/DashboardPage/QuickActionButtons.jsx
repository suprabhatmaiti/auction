function QuickActionButtons({ onListAuction, onBidPlace }){
    return(
        
            <div className="flex gap-4">
                <button onClick={onBidPlace} className=" cursor-pointer bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                    Place a Bid
                </button>
                <button onClick={onListAuction} className="cursor-pointer bg-white hover:bg-gray-100 text-violet-600 px-6 py-3 rounded-lg font-semibold shadow-md transition">
                    List an Item
                </button>
            </div>
    )
}

export default QuickActionButtons;