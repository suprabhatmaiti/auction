import Input from "../components/Input/Input";
import { RiImageAddLine } from "react-icons/ri";


function AddAuctionPage(){
 return (
    <div className="min-h-screen bg-gray-100 p-6 pb-60  ">
        
        <div className="bg-white p-6 mb-12 shadow-md rounded-lg mx-16 px-12 py-8 ">
            <h2 className="text-3xl mb-2 font-bold">Submit Item for Auction</h2>
            <p className="mb-4 text-gray-700">Fill out the form below to list your item</p>
            <Input label='Item Name' type="text" placeholder='e.g., Vintage Leather Jacket'/>
            <Input mode='desc' label='Description' type= "text" placeholder='Describe your item in details including condition, age and any unique features.' className="h-20" />
            <Input label='Category' />
            <div className="flex w-full justify-between">
                <Input label='Starting Bid' type="text" placeholder='e.g., 50.00'  />
                <Input label='Auction Duration' type="time" />
            </div>
            <div className="relative">
                <RiImageAddLine className="absolute top-4 w-full left-1/2 -translate-x-1/2 size-10"/>
                <Input type='file' accept='image/*' className="h-32 text-center pt-20 border border-dashed border-gray-400" />
            </div>
              <button className="bg-violet-600 hover:bg-violet-700 text-white w-full px-6 py-3 rounded-lg font-semibold transition">
                Submit for Auction
              </button>
        </div>
    </div>
 )
}

export default AddAuctionPage;