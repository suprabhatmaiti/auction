import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Card from "../../../components/Card/Card";
import { useRef } from "react";

function FeaturedItems(){

    const sliderRef = useRef(null);

    const scrollLeft = () => {
        sliderRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
        });
    };

    const scrollRight = () => {
        sliderRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
        });
    };

    return (
        <div className="relative m-16">
                <h2 id="featured-items" className="text-2xl font-bold">Featured Items</h2>
        
                <button
                  onClick={scrollLeft}
                  className="absolute left-1 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hover:bg-gray-100"
                >
                  <FaChevronLeft />
                </button>
        
                
                <div
                  ref={sliderRef}
                  className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
                >
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                </div>
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hover:bg-gray-100"
                >
                  <FaChevronRight />
                </button>
              </div>
    )
}
export default FeaturedItems;