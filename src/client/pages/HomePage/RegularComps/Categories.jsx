import { GiCarBattery, GiCoveredJar,GiNecklaceDisplay } from "react-icons/gi";
import { MdDirectionsCar,MdOutlineCollectionsBookmark } from "react-icons/md";
import { FaArtstation } from "react-icons/fa";

function Categories(){
    return(
        <div className="relative m-16">
        <h2 id="featured-items" className="text-2xl font-bold mb-4">Categories</h2>
        <div className="flex justify-between gap-4">
          <div className="bg-white shadow-md rounded-lg px-8 py-4 w-1/6 flex flex-col justify-center items-center hover:shadow-lg cursor-pointer">
            <GiCoveredJar className="bg-gray-200 p-2 text-4xl text-blue-600 rounded-3xl"/>
            <h2 className="font-bold">Antiques</h2>
          </div>
          <div className="bg-white shadow-md rounded-lg px-8 py-4 w-1/6 flex flex-col  justify-center items-center hover:shadow-lg cursor-pointer">
            <GiCarBattery className="bg-gray-200 p-2 text-4xl text-blue-600 rounded-3xl"/>
            <h2 className="font-bold">Electronics</h2>
          </div>
          <div className="bg-white shadow-md rounded-lg px-8 py-4 w-1/6 flex flex-col  justify-center items-center hover:shadow-lg cursor-pointer">
            <MdDirectionsCar className="bg-gray-200 p-2 text-4xl text-blue-600 rounded-3xl"/>
            <h2 className="font-bold">Vehicles</h2>
          </div>
          <div className="bg-white shadow-md rounded-lg px-8 py-4 w-1/6 flex flex-col  justify-center items-center hover:shadow-lg cursor-pointer">
            <FaArtstation className="bg-gray-200 p-2 text-4xl text-blue-600 rounded-3xl"/>
            <h2 className="font-bold">Art</h2>
          </div>
          <div className="bg-white shadow-md rounded-lg px-8 py-4 w-1/6 flex flex-col  justify-center items-center hover:shadow-lg cursor-pointer">
            <GiNecklaceDisplay className="bg-gray-200 p-2 text-4xl text-blue-600 rounded-3xl"/>
            <h2 className="font-bold">Jewelry</h2>
          </div>
          <div className="bg-white shadow-md rounded-lg px-8 py-4 w-1/6 flex flex-col  justify-center items-center hover:shadow-lg cursor-pointer">
            <MdOutlineCollectionsBookmark className="bg-gray-200 p-2 text-4xl text-blue-600 rounded-3xl"/>
              <h2 className="font-bold">Collectibles</h2>
          </div>
        </div>
      </div>
    )
}
export default Categories;