function OverviewPanel() {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <div className="flex-1 px-4 py-4 rounded-lg shadow-md bg-white">
        <h2 className="text-md font-medium text-gray-600 mb-1">Active Bids</h2>
        <h3 className="font-bold text-2xl">5</h3>
      </div>

      <div className="flex-1 px-4 py-4 rounded-lg shadow-md bg-white">
        <h2 className="text-md font-medium text-gray-600 mb-1">Won Items</h2>
        <h3 className="font-bold text-2xl">2</h3>
      </div>

      <div className="flex-1 px-4 py-4 rounded-lg shadow-md bg-white">
        <h2 className="text-md font-medium text-gray-600 mb-1">Listed Items</h2>
        <h3 className="font-bold text-2xl">6</h3>
      </div>
    </div>
  );
}

export default OverviewPanel;
