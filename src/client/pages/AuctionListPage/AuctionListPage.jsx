import FilterSort from './FilterSort';
import AuctionList from './AuctionList';


function AuctionListPage({activeBids=false}){
    return(
        <div className="min-h-screen px-12 pt-12 pb-60">
            <div className="flex gap-4">
                <div className="w-1/4">
                    <FilterSort/>
                </div>

                
                <div className="w-3/4">
                    <AuctionList/>
                </div>
            </div>
        </div>
    )
}

export default AuctionListPage;