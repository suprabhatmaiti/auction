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
                 cursor-pointer w-1/2 sm:w-1/3 md:w-1/6 lg:w-1/8"
    >
      <div className="bg-blue-100 p-4 text-3xl text-blue-600 rounded-full mb-2">
        {iconMap[category.value]}
      </div>
      <h2 className="font-semibold text-gray-700">{category.label}</h2>
    </div>
  ));

  return (
    <section className="m-8">
      <h2
        id="featured-items"
        className="text-2xl font-bold mb-8 text-slate-800"
      >
        Categories
      </h2>

      {/* Flex container */}
      <div className="flex flex-wrap justify-center gap-6">{renderedCategories}</div>
    </section>
  );
}

export default Categories;
