import { RxCross1 } from "react-icons/rx";
import Card from "../../components/Card/Card";

function AuctionList(){
    return(
        <>
            <h2 className='font-bold text-2xl'>All Active Auctions</h2>
            <p className='text-gray-600'>Browse through our curated collection of items up for auction</p>
            <div className='p-6 w-full flex flex-wrap gap-4'>
                <div className='bg-violet-300 rounded-xl px-2 flex justify-center items-center cursor-pointer'>
                    <p className='pr-2'>Categories</p>
                    <RxCross1 className='text-sm' />
                </div>
                
                <div className='bg-violet-300 rounded-xl px-2 flex justify-center items-center cursor-pointer'>
                    <p className='pr-2'>Categories</p>
                    <RxCross1 className='text-sm' />
                </div>
                <div className='bg-violet-300 rounded-xl px-2 flex justify-center items-center cursor-pointer'>
                    <p className='pr-2'>Categories</p>
                    <RxCross1 className='text-sm' />
                </div>
            </div>
            <div className='flex flex-wrap gap-6 p-4'>
                
                <Card className='w-50 h-80 ' button='Bid Now'/>
                <Card className='w-50 h-80 ' button='Bid Now'/>
                <Card className='w-50 h-80 ' button='Bid Now'/>
                <Card className='w-50 h-80 ' button='Bid Now'/>
                <Card className='w-50 h-80 ' button='Bid Now'/>
                <Card className='w-50 h-80 ' button='Bid Now'/>
                <Card className='w-50 h-80 ' button='Bid Now'/>
                <Card className='w-50 h-80 ' button='Bid Now'/>
                <Card className='w-50 h-80 ' button='Bid Now'/>
            </div>
            <div className="flex flex-col items-center pb-40">
                <button className="cursor-pointer bg-gray-700 hover:bg-gray-600 
                     text-white px-4 py-2 rounded-lg font-semibold transition">Load More</button>
            </div>
        </>
    )
}
export default AuctionList;