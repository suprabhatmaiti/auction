import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import Card from "../components/Card/Card";
import HeadImage from '../assets/img2.svg'
import AuthPage from "./AuthPage";
import Input from "../components/Input/Input";
import { IoDiamondOutline,IoPricetagOutline } from "react-icons/io5";
import { MdSecurity, MdOutlineSupportAgent } from "react-icons/md";



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
    <div className="min-h-screen pb-60 bg-gray-100">
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

        {/* search-function */}

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

        {/* featured items */}
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

      {/* why choose */}
      <div className="bg-white text-center mb-16">
        <h2 className="text-gray-700 font-bold text-2xl pt-10">Why Choose Auction Central</h2>
        <div className="flex gap-4 justify-around p-8 px-16">
          <div className="p-4  w-1/4 flex flex-col items-center justify-center">
          <IoDiamondOutline className="text-4xl text-violet-600"/>
            <h2 className="text-gray-700 font-bold text-lg py-4">Unique Finds</h2>
            <p className="text-gray-700">Discover rare and one of a kind items you wont find anywhare else</p>
          </div>
          <div className="p-4 w-1/4 flex flex-col items-center justify-center">
          <MdSecurity className="text-4xl text-violet-600"/>
            <h2 className="text-gray-700 font-bold text-lg py-4">Secure Bidding</h2>
            <p className="text-gray-700">Our platform ensure safe and transparant transaction for all user</p>
          </div>
          <div className="p-4 w-1/4 flex flex-col items-center justify-center">
            <IoPricetagOutline className="text-4xl text-violet-600"/>
            <h2 className="text-gray-700 font-bold text-lg py-4">Easy Selling</h2>
            <p className="text-gray-700">List your items effortlessly and reach a global audience of buyer</p>
          </div>
          <div className="p-4 w-1/4 flex flex-col items-center justify-center">
          <MdOutlineSupportAgent className="text-4xl text-violet-600"/>
            <h2 className="text-gray-700 font-bold text-lg py-4">24/7 support</h2>
            <p className="text-gray-700">Our dadicated support team is hear to help you around the clock</p>
          </div>
        </div>
      </div>

      {/* categories */}
      <div className="relative m-16">
        <h2 id="featured-items" className="text-2xl font-bold mb-4">Categories</h2>
        <div className="flex justify-between gap-4">
          <div className="bg-white shadow-md rounded-lg px-8 py-4 w-1/6 flex justify-center items-center">
              <h2 className="font-bold">Antiques</h2>
          </div>
          <div className="bg-white shadow-md rounded-lg px-8 py-4 w-1/6 flex justify-center items-center">
              <h2 className="font-bold">Electronics</h2>
          </div>
          <div className="bg-white shadow-md rounded-lg px-8 py-4 w-1/6 flex justify-center items-center">
              <h2 className="font-bold">Vehicles</h2>
          </div>
          <div className="bg-white shadow-md rounded-lg px-8 py-4 w-1/6 flex justify-center items-center">
              <h2 className="font-bold">Art</h2>
          </div>
          <div className="bg-white shadow-md rounded-lg px-8 py-4 w-1/6 flex justify-center items-center">
              <h2 className="font-bold">Jewelry</h2>
          </div>
          <div className="bg-white shadow-md rounded-lg px-8 py-4 w-1/6 flex justify-center items-center">
              <h2 className="font-bold">Collectibles</h2>
          </div>
        </div>
      </div>
      <AuthPage isOpen={isAuthOpen} onClose={()=>setIsAuthOpen(false) } mode = {authMode} onModeChange={setAuthMode} />
    </div>
  );
}

export default HomePage;
