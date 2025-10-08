function OverviewPanel(){
    return(
        <div className="flex">
            <div className="w-full mx-4 px-2 py-4 rounded-lg shadow-md bg-white">
                <h2 className="block text-md font-medium text-gray-600 mb-1 ">Active Bids</h2>
                <h3 className="font-bold text-2xl">5</h3>
            </div>
            <div className="w-full mx-4 px-2 py-4 rounded-lg shadow-md bg-white ">
            <h2 className="block text-md font-medium text-gray-600 mb-1 "> Won Items</h2>
            <h3 className="font-bold text-2xl">2</h3>
            </div>
            <div className="w-full mx-4 px-2 py-4 rounded-lg shadow-md bg-white ">
                <h2 className="block text-md font-medium text-gray-600 mb-1 ">Listed Items</h2>
                <h3 className="font-bold text-2xl">6</h3>
            </div>
        </div>
    )
}

export default OverviewPanel;