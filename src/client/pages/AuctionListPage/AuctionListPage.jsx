import FilterSort from './FilterSort/FilterSort';
import AuctionList from './AuctionList/AuctionList';
import { useState } from 'react';



function AuctionListPage(){
    const [selectedCategories, setSelectedCategories] = useState({});

    return(
        <div className="min-h-screen px-12">
            <div className="flex gap-4">
                <div className="w-1/4 border-r border-gray-200 pt-8">
                    <FilterSort selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
                </div>

                <div className="w-full pt-8">
                    <AuctionList selectedCategories={selectedCategories} />
                </div>
            </div>
        </div>
    )
}

export default AuctionListPage;