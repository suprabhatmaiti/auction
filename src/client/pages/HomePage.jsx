import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Card from "../components/Card/Card";
import HeadImage from '../assets/img2.svg'
import AuthPage from "./AuthPage";

function HomePage() {
  const [authMode,setAuthMode] = useState('signup');
  const [isAuthOpen,setIsAuthOpen] = useState(false)

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
    <div className="mt-4 min-h-screen pb-4">
        <div className="relative">

          <img 
            src={HeadImage} 
            alt="HeadImage" 
            className="w-full h-96 object-cover"
          />


          <div className="absolute inset-0 bg-black/60"></div>


          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              Unearth Your Next Treasure. Bid, Win, Discover.
            </h1>
            <p className="max-w-2xl mb-6 text-lg md:text-xl drop-shadow">
              Explore a world of unique items, participate in secure bidding, and experience effortless selling.
            </p>
            <div className="flex gap-4">
              <button onClick={()=>{
                setAuthMode('signup');
                setIsAuthOpen(true);
                
              }} 
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                Sign Up Now
              </button>
              <button onClick={()=>{
                setAuthMode('login');
                setIsAuthOpen(true);
                
              }} 
              className="bg-white hover:bg-gray-100 text-violet-600 px-6 py-3 rounded-lg font-semibold shadow-md transition">
                Browse Auctions
              </button>
            </div>
          </div>
        </div>

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
      <AuthPage isOpen={isAuthOpen} onClose={()=>setIsAuthOpen(false) } mode = {authMode} onModeChange={setAuthMode} />
    </div>
  );
}

export default HomePage;
