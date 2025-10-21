function NotificationPanel({ isMobile = false }) {
  return (
    <div
      className={`px-4 pt-4 rounded-lg shadow-md bg-white ${
        isMobile ? "h-full" : "h-100"
      } w-full relative`}
    >
      {!isMobile && (
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">Notifications</h2>
          <span className="bg-violet-600 text-white px-3 py-1 text-sm font-bold rounded-3xl">
            3 New
          </span>
        </div>
      )}

      <div
        className={`space-y-2 overflow-y-auto ${
          isMobile ? "h-[calc(100%-3rem)]" : "h-[calc(100%-5rem)]"
        }`}
      >
        <p className="text-gray-600 text-sm">You received a new message</p>
        <p className="text-gray-600 text-sm">Payment completed successfully</p>
        <p className="text-gray-600 text-sm">Your profile was updated</p>
        <p className="text-gray-600 text-sm">You received a new message</p>
        <p className="text-gray-600 text-sm">Payment completed successfully</p>
        <p className="text-gray-600 text-sm">Your profile was updated</p>
        <p className="text-gray-600 text-sm">You received a new message</p>
        
      </div>

      
    </div>
  );
}

export default NotificationPanel;
