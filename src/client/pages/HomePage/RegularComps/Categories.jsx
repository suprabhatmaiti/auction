import { GiCarBattery, GiCoveredJar,GiNecklaceDisplay } from "react-icons/gi";
import { MdDirectionsCar,MdOutlineCollectionsBookmark } from "react-icons/md";
import { FaArtstation } from "react-icons/fa";

function Categories(){

  const iconMap = {
    antiques: <GiCoveredJar />,
    electronics: <GiCarBattery />,
    vehicles: <MdDirectionsCar />,
    art: <FaArtstation />,
    jewelry: <GiNecklaceDisplay />,
    collectibles: <MdOutlineCollectionsBookmark />,
  };

  const categories=[
      {value:'antiques', label:'Antiques'},
      {value:'electronics', label:'Electronics'},
      {value:'vehicles', label:'Vehicles'},
      {value:'art', label:'Art'},
      {value:'jewelry', label:'Jewelry'},
      {value:'collectibles', label:'Collectibles'},
  ]

  const renderedCategories = categories.map((category)=>{
    return (
      <div key={category.value} className="bg-white shadow-md rounded-lg px-8 py-4 w-1/6 flex flex-col justify-center items-center hover:shadow-lg cursor-pointer">
            <div className="bg-gray-200 p-2 text-2xl text-blue-600 rounded-3xl">
              {iconMap[category.value]}
            </div>
            <h2 className="font-bold">{category.value}</h2>
          </div>
    )
  })

    return(
      <div className="relative m-16">
        <h2 id="featured-items" className="text-2xl font-bold mb-4">Categories</h2>
        <div className="flex justify-between gap-4">
          {renderedCategories}
        </div>
        
      </div>
    )
}
export default Categories;