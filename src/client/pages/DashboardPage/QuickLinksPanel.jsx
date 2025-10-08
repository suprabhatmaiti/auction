import { GoPlus, GoTrophy } from "react-icons/go";
import { LiaHandsHelpingSolid } from "react-icons/lia";

function QuickLinksPanel({ onlistNewItem, onViewActiveBids }){
    return(
        <div className="flex">
            <div onClick={onViewActiveBids} className="w-full mx-4 px-2 py-4 rounded-lg shadow-md bg-white flex flex-col justify-center items-center cursor-pointer  hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <LiaHandsHelpingSolid className="size-8 text-violet-600"/>
                <h2 className="block text-md mb-1 text ">View Active Bids</h2>
            </div>
            <div onClick={onlistNewItem}  className="w-full mx-4 px-2 py-4 rounded-lg shadow-md bg-white flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <GoPlus className="size-8 text-violet-600"/>
                <h2 className="block text-md mb-1 "> List New Items</h2>
            </div>
            <div className="w-full mx-4 px-2 py-4 rounded-lg shadow-md bg-white flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <GoTrophy className="size-8 text-violet-600"/>
                <h2 className="block text-md mb-1 ">View Won Items</h2>
            </div>
        </div>
                                
    )
}

export default QuickLinksPanel;