function NotificationPanel(){
    return(
        <div className="px-3 pt-4 mx-4 rounded-lg shadow-md bg-white h-96 size-full ">
            <div className="flex justify-between mb-4">
                <h2 className="text-lg font-bold mb-1 ">Notifications</h2>
                <h2 className="bg-violet-600 text-white px-3 py-1 text-sm font-bold rounded-3xl text-center">3 New</h2>
            </div>
            <div className="space-y-2 overflow-y-auto h-[calc(100%-6rem)]">
                <p className="text-gray-600 text-sm">You received a new message</p>
                <p className="text-gray-600 text-sm">Payment completed successfully</p>
                <p className="text-gray-600 text-sm">Your profile was updated</p>
            </div>
            <div className="absolute buttom-0 text-violet-600 cursor-pointer hover:text-violet-800">
                <button type="button"  >See all Notifications</button>
            </div>
            
        </div>
    )
}

export default NotificationPanel;