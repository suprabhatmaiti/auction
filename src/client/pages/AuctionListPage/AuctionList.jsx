import { RxCross1 } from "react-icons/rx";
import Card from "../../components/Card/Card";

function AuctionList(){
    return(
        <>
            <h2 className='font-bold text-2xl'>All Active Auctions</h2>
            <p className='text-gray-600'>browse through our curated collection of items up for auction</p>
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
                
                <Card className='w-50 h-80 '/>
                <Card className='w-50 h-80 '/>
                <Card className='w-50 h-80 '/>
            </div>
        </>
    )
}
export default AuctionList;