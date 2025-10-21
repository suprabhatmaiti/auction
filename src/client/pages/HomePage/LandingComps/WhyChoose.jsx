import { IoDiamondOutline, IoPricetagOutline } from "react-icons/io5";
import { MdOutlineSupportAgent, MdSecurity, MdOutlineVerified } from "react-icons/md";


function WhyChoose(){
    return(
        <div className="bg-white text-center mb-16">
                <h2 className="text-gray-700 font-bold text-2xl pt-10">Why Choose Auction Central</h2>
                <div className="md:flex gap-4 justify-around p-8 px-12">
                  <div className="p-2  md:w-1/4 flex flex-col items-center justify-center">
                    <IoDiamondOutline className="text-4xl text-violet-600"/>
                    <h2 className="text-gray-700 font-bold text-lg py-4">Unique Finds</h2>
                    <p className="text-gray-700">Discover rare and one of a kind items you wont find anywhare else</p>
                  </div>
                  <div className="p-2  md:w-1/4 flex flex-col items-center justify-center">
                    <MdOutlineVerified className="text-4xl text-violet-600"/>
                    <h2 className="text-gray-700 font-bold text-lg py-4">Verified Items</h2>
                    <p className="text-gray-700">Each Item is authenticated by our team of experts to ensure quality and authenticity</p>
                  </div>
                  <div className="p-2  md:w-1/4 flex flex-col items-center justify-center">
                    <MdSecurity className="text-4xl text-violet-600"/>
                    <h2 className="text-gray-700 font-bold text-lg py-4">Secure Bidding</h2>
                    <p className="text-gray-700">Our platform ensure safe and transparant transaction for all user</p>
                  </div>
                  <div className="p-2  md:w-1/4 flex flex-col items-center justify-center">
                    <IoPricetagOutline className="text-4xl text-violet-600"/>
                    <h2 className="text-gray-700 font-bold text-lg py-4">Easy Selling</h2>
                    <p className="text-gray-700">List your items effortlessly and reach a global audience of buyer</p>
                  </div>
                  <div className="p-2  md:w-1/4 flex flex-col items-center justify-center">
                    <MdOutlineSupportAgent className="text-4xl text-violet-600"/>
                    <h2 className="text-gray-700 font-bold text-lg py-4">24/7 support</h2>
                    <p className="text-gray-700">Our dadicated support team is hear to help you around the clock</p>
                  </div>
                  
                </div>
              </div>
    )
}

export default WhyChoose;