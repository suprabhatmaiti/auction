import FilterSort from './FilterSort/FilterSort';
import AuctionList from './AuctionList/AuctionList';


function AuctionListPage({activeBids=false}){
    return(
        <div className="min-h-screen px-12 pb-60">
            <div className="flex gap-4">
                <div className="w-1/4 border-r border-gray-200 pt-8">
                    <FilterSort />
                </div>

                <div className="w-3/4 pt-8">
                    <AuctionList />
                </div>
            </div>
        </div>
    )
}

export default AuctionListPage;