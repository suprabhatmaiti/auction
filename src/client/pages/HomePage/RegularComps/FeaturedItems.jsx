import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Card from "../../../components/Card/Card";
import { useRef } from "react";

function FeaturedItems() {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="relative m-16">
      <h2 id="featured-items" className="text-2xl font-bold mb-6">
        Featured Items
      </h2>

      
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hover:bg-gray-100"
      >
        <FaChevronLeft />
      </button>

      
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-smooth no-scrollbar px-10 py-4"
      >
        <Card className='w-70 h-90 flex-shrink-0 hover:scale-105 duration-300'/>
        <Card className='w-70 h-90 flex-shrink-0 hover:scale-105 duration-300'/>
        <Card className='w-70 h-90 flex-shrink-0 hover:scale-105 duration-300'/>
        <Card className='w-70 h-90 flex-shrink-0 hover:scale-105 duration-300'/>
        <Card className='w-70 h-90 flex-shrink-0 hover:scale-105 duration-300'/>
      </div>

     
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 hover:bg-gray-100"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

export default FeaturedItems;
