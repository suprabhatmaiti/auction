import { useState } from "react";
import Input from "../components/Input/Input";
import { RiImageAddLine } from "react-icons/ri";


function AddAuctionPage(){
    const [preview,setPreview] = useState(null);

    const handleSetPreview = (event) => {
       const file=event.target.files[0];
       if(file){
        setPreview(URL.createObjectURL(file));
       }

    } 

 return (
    <div className="min-h-screen bg-gray-100 p-6 pb-60  ">
        
        <div className="bg-white p-6 mb-12 shadow-md rounded-lg mx-16 px-12 py-8 ">
            <h2 className="text-3xl mb-2 font-bold">Submit Item for Auction</h2>
            <p className="mb-4 text-gray-700">Fill out the form below to list your item</p>
            <Input label='Item Name' type="text" placeholder='e.g., Vintage Leather Jacket'/>
            <Input mode='desc' label='Description' type= "text" placeholder='Describe your item in details including condition, age and any unique features.' className="h-20" />
            <Input label='Category' />
            <div className="flex w-full gap-10">
                <div className="w-full">
                    <Input label='Starting Bid' type="text" placeholder='e.g., 50.00'  />
                </div>
                <div className="w-full">
                    <Input label='Auction Duration' type="time" />
                </div>
            </div>
            <div className="relative flex flex-col items-center justify-center border border-dashed border-gray-400 rounded-lg h-32 mb-8 text-center cursor-pointer overflow-hidden">
                {!preview && 
                <div>
                    <RiImageAddLine className="absolute top-4 left-1/2 -translate-x-1/2 size-10 text-gray-500"/>
                    <Input 
                        type='file' 
                        accept='image/*' 
                        className=" opacity-0 absolute inset-0 cursor-pointer h-42" 
                        onChange = {handleSetPreview}
                    />
                    <p className="pt-16 text-gray-600 text-sm">Click to upload image</p>    
                </div>}

                {preview && 
                <div className="relative w-full h-full">
                    <img src={preview} alt="preview" className="object-contain w-full h-full"/> 
                    <p
                    onClick={()=>setPreview(null)}  
                    className="absolute top-0 right-0 bg-red-500 text-xl px-2 active:bg-red-700 text-white">x</p>
                </div>}
            </div>
              <button className="bg-violet-600 hover:bg-violet-700 text-white w-full px-6 py-3 rounded-lg font-semibold transition">
                Submit for Auction
              </button>
        </div>
    </div>
 )
}

export default AddAuctionPage;