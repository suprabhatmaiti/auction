import { FaSearch } from "react-icons/fa";

function SearchFunction(){
 return (
    <div className="w-full flex justify-center items-center m-8">
          <form action="" className="w-full max-w-4xl flex relative">
            <FaSearch className=" absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 text-lg"/>
            <input
              type="text"
              placeholder="Search for Antiques, electronics, vehicles..."
              className="rounded-4xl w-full focus:outline-none h-16 pl-16 pr-12 bg-white border border-gray-300"
            />
            
          </form>
        </div>
 )
}

export default SearchFunction;