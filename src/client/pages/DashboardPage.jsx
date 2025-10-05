import Footer from "../components/Footer/footer";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { GoPlus, GoTrophy } from "react-icons/go";

import { useNavigate } from "react-router-dom";

function DashboardPage(){
    const navigate= useNavigate();

    const handleAddAuctionClick = () => {
        navigate('/add-auction')
    }
    const handleAuctionListClick = () =>{
        navigate('/auction-list')
    }

    return (
        <div className="min-h-screen flex justify-between pt-12 px-4 bg-gray-100 " >
            <div className="w-3/4">
                <h2 className="text-3xl mx-8 mb-4 font-bold">Dashboard</h2>
                <div className="flex rounded py-4 w-full" >
                    {/* overview */}
                    <div className=" px-4 py-3 w-full">
                        <div className="mb-12">
                            <h2 className="text-xl mx-4 font-medium mb-4">Overview</h2>
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
                        </div>

                        {/* quick-links */}
                        <div className="mb-12">
                                <h2 className="text-xl mx-4 font-medium mb-4">Quick Links</h2>
                                <div className="flex">
                                    <div onClick={handleAuctionListClick} className="w-full mx-4 px-2 py-4 rounded-lg shadow-md bg-white flex flex-col justify-center items-center cursor-pointer  hover:shadow-lg transition-shadow duration-300 ease-in-out">
                                        <LiaHandsHelpingSolid className="size-8 text-violet-600"/>
                                        <h2 className="block text-md mb-1 text ">View Active Bids</h2>
                                    </div>
                                    <div onClick={handleAddAuctionClick}  className="w-full mx-4 px-2 py-4 rounded-lg shadow-md bg-white flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out">
                                        <GoPlus className="size-8 text-violet-600"/>
                                        <h2 className="block text-md mb-1 "> List New Items</h2>
                                    </div>
                                    <div className="w-full mx-4 px-2 py-4 rounded-lg shadow-md bg-white flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out">
                                        <GoTrophy className="size-8 text-violet-600"/>
                                        <h2 className="block text-md mb-1 ">View Won Items</h2>
                                    </div>
                                </div>
                        </div>
                        {/* quick-actions */}
                        <div className="mx-4">
                            <h2 className="text-xl font-medium mb-4">Quick Actions</h2>
                            <div className="flex gap-4">
                                <button onClick={handleAuctionListClick} className=" cursor-pointer bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                                    Place a Bid
                                </button>
                                <button onClick={handleAddAuctionClick} className="cursor-pointer bg-white hover:bg-gray-100 text-violet-600 px-6 py-3 rounded-lg font-semibold shadow-md transition">
                                    List an Item
                                </button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            {/* notification */}
            <div className="w-1/4 px-3 pt-4 mx-4 rounded-lg shadow-md bg-white h-96 size-full relative">
                <div className="flex justify-between mb-4">
                    <h2 className="text-lg font-bold mb-1 ">Notifications</h2>
                    <h2 className="bg-violet-600 text-white px-3 py-1 text-sm font-bold rounded-3xl text-center">3 New</h2>
                </div>
                <div className="space-y-2 overflow-y-auto h-[calc(100%-6rem)]">
                    <p className="text-gray-600 text-sm">You received a new message</p>
                    <p className="text-gray-600 text-sm">Payment completed successfully</p>
                    <p className="text-gray-600 text-sm">Your profile was updated</p>
                </div>
                <button type="button" className="absolute buttom-0 text-violet-600 cursor-pointer hover:text-violet-800" >See all Notifications</button>
            </div>
        </div>
    )
}

export default DashboardPage;