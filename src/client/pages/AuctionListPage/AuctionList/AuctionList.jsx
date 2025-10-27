import { RxCross1 } from "react-icons/rx";
import Card from "../../../components/Card/Card";

function AuctionList({ selectedCategories }) {
  const activeCategories = Object.keys(selectedCategories).filter(
    (key) => selectedCategories[key]
  );

  const handleRemoveCategory = (category) => {
    console.log("Remove category:", category);
    // Implement actual removal logic here
  };

  const renderedSelectedCategories = activeCategories.map((category) => (
    <div
      key={category}
      className="bg-violet-300 rounded-xl px-3 py-1 flex justify-center items-center gap-1 cursor-pointer"
    >
      <p className="text-sm font-medium">{category}</p>
      <RxCross1
        className="text-sm hover:text-red-600"
        onClick={() => handleRemoveCategory(category)}
      />
    </div>
  ));

  return (
    <div className="px-4 md:px-8 py-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="font-bold text-xl md:text-2xl mb-1">All Active Auctions</h2>
        <p className="text-gray-600 text-sm md:text-base">
          Browse through our curated collection of items up for auction
        </p>
      </div>

      {/* Selected Categories */}
      <div className="flex flex-wrap gap-2 md:gap-4 mb-6">{renderedSelectedCategories}</div>

      {/* Auction Cards using Flexbox */}
      <div className="flex flex-wrap justify-center  gap-6">
        <Card button="Bid Now" />
        <Card  button="Bid Now" />
        <Card  button="Bid Now" />
        <Card  button="Bid Now" />
        <Card  button="Bid Now" />
        <Card  button="Bid Now" />
        <Card  button="Bid Now" />
        <Card  button="Bid Now" />
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-8 pb-20">
        <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition">
          Load More
        </button>
      </div>
    </div>
  );
}

export default AuctionList;
