import HeadImage from '../../../assets/img2.svg'

function Banner({authMode, authControl}){
 return(
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
                    authMode('signup');
                    authControl(true);
                    
                  }} 
                  className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-semibold transition cursor-pointer">
                    Sign Up Now
                  </button>
                  <button onClick={()=>{
                    authMode('login');
                    authControl(true);
                    
                  }} 
                  className="bg-white hover:bg-gray-100 text-violet-600 px-6 py-3 rounded-lg font-semibold shadow-md transition cursor-pointer">
                    Browse Auctions
                  </button>
                </div>
              </div>
            </div>
 )
}

export default Banner;