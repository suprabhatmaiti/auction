import { useState } from "react";
import { IoRadioButtonOffOutline, IoRadioButtonOn } from "react-icons/io5";


function SortBy(){
    const values=[
        {label:'Ending Soonest', value:'endingSoonest'},
        {label:'Highest Bid', value:'highestBid'},
        {label:'Newest First', value:'newestFirst'},
    ]
    const [checkedValues, setCheckedValues] = useState({})

    const renderedValues = values.map((value)=>{
        return(
            <div 
            onClick={()=>toggleSortByValues(value.value)}
            key={value.value} 
            className="flex gap-2 items-center cursor-pointer text-violet-700"
            >
                {checkedValues[value.value] ? <IoRadioButtonOn/> : <IoRadioButtonOffOutline/>}
                <h2 className="text-violet-500">{value.label}</h2>
            </div>
        )
    })

    const toggleSortByValues = (value) => {
        setCheckedValues((prev)=>({
            [value]:true
        }));
    }

    return(
        <div className="border-b border-gray-200 pb-2 mt-8 pr-4 "  >
            <h2 className="font-semibold">Sort By</h2>
            <div className="mt-4">
                {renderedValues}
            </div>
            

        </div>
    )
}

export default SortBy;