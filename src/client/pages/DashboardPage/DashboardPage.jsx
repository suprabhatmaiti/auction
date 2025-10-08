
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { GoPlus, GoTrophy } from "react-icons/go";

import { useNavigate } from "react-router-dom";
import NotificationPanel from "./NotificationPanel";
import QuickActionButtons from "./QuickActionButtons";
import QuickLinksPanel from "./QuickLinksPanel";
import OverviewPanel from "./OverviewPanel";

function DashboardPage(){
    const navigate= useNavigate();

    const handleAddAuctionClick = () => {
        navigate('/add-auction')
    }
    const handleAuctionListClick = () =>{
        navigate('/auction-list')
    }

    return (
        <div className="min-h-screen flex justify-between pt-12 px-12 pb-60 bg-gray-100 flex-grow  " >
            <div className="w-3/4">
                <h2 className="text-3xl mx-8 mb-4 font-bold">Dashboard</h2>
                <div className="flex rounded py-4 w-full" >
                    <div className=" px-4 py-3 w-full">
                        <div className="mb-12">
                            <h2 className="text-xl mx-4 font-medium mb-4">Overview</h2>
                            <OverviewPanel/>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-xl mx-4 font-medium mb-4">Quick Links</h2>
                            <QuickLinksPanel onlistNewItem={handleAddAuctionClick} onViewActiveBids={handleAuctionListClick}/>
                        </div>

                        <div className="mx-4">
                            <h2 className="text-xl font-medium mb-4">Quick Actions</h2>
                            <QuickActionButtons onListAuction={handleAddAuctionClick} onBidPlace={handleAuctionListClick} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/4 relative">
                <NotificationPanel/>
            </div>
            
        </div>
    )
}

export default DashboardPage;