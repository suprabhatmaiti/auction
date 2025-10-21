import { GoPlus, GoTrophy } from "react-icons/go";
import { LiaHandsHelpingSolid } from "react-icons/lia";

function QuickLinksPanel({ onlistNewItem, onViewActiveBids }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div
        onClick={onViewActiveBids}
        className="flex-1 px-4 py-6 rounded-lg shadow-md bg-white flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
      >
        <LiaHandsHelpingSolid className="size-8 text-violet-600 mb-2" />
        <h2 className="text-md font-medium">View Active Bids</h2>
      </div>

      <div
        onClick={onlistNewItem}
        className="flex-1 px-4 py-6 rounded-lg shadow-md bg-white flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out"
      >
        <GoPlus className="size-8 text-violet-600 mb-2" />
        <h2 className="text-md font-medium">List New Items</h2>
      </div>

      <div className="flex-1 px-4 py-6 rounded-lg shadow-md bg-white flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <GoTrophy className="size-8 text-violet-600 mb-2" />
        <h2 className="text-md font-medium">View Won Items</h2>
      </div>
    </div>
  );
}

export default QuickLinksPanel;
