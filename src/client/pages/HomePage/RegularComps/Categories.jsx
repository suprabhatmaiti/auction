import { GiCarBattery, GiCoveredJar, GiNecklaceDisplay } from "react-icons/gi";
import { MdDirectionsCar, MdOutlineCollectionsBookmark } from "react-icons/md";
import { FaArtstation } from "react-icons/fa";

function Categories() {
  const iconMap = {
    antiques: <GiCoveredJar />,
    electronics: <GiCarBattery />,
    vehicles: <MdDirectionsCar />,
    art: <FaArtstation />,
    jewelry: <GiNecklaceDisplay />,
    collectibles: <MdOutlineCollectionsBookmark />,
  };

  const categories = [
    { value: "antiques", label: "Antiques" },
    { value: "electronics", label: "Electronics" },
    { value: "vehicles", label: "Vehicles" },
    { value: "art", label: "Art" },
    { value: "jewelry", label: "Jewelry" },
    { value: "collectibles", label: "Collectibles" },
  ];

  const renderedCategories = categories.map((category) => (
    <div
      key={category.value}
      className="bg-white shadow-md rounded-xl p-2 flex flex-col justify-center items-center 
                 hover:shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out 
                 cursor-pointer w-26 sm:w-1/4 md:w-1/6 lg:w-1/7"
    >
      <div className="bg-blue-100 p-2 md:p-4 text-sm md:text-3xl text-blue-600 rounded-full mb-2">
        {iconMap[category.value]}
      </div>
      <h2 className="font-semibold text-gray-700 text-sm md:text-base">{category.label}</h2>
    </div>
  ));

  return (
    <section className="md:mx-8 mx-4 my-12">
      <h2
        id="featured-items"
        className="text-xl md:text-2xl font-bold mb-8 text-slate-800"
      >
        Categories
      </h2>

      {/* Flex container */}
      <div className="flex flex-wrap justify-around gap-6">{renderedCategories}</div>
    </section>
  );
}

export default Categories;
