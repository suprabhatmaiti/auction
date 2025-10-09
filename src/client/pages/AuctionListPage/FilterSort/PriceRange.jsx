import { useState } from "react";

function PriceRange(){
    const [sliderValue,setSliderValue] = useState(1000)

    const handleChange = (event) => {
        setSliderValue(event.target.value);
    }

    return(
        <div className="mt-8 pr-4 border-b border-gray-200 pb-2"  >
            <h2 className="font-semibold">Price Range</h2>
            <div className="py-4 w-full ">
                <input type="range" name="price-range" id="price-range" value={sliderValue} min={0} max={10000} onChange={handleChange} className="w-full cursor-pointer  accent-violet-600" />
                <div className="flex justify-between">
                    <p className="text-gray-600">$0</p>
                    <p className="text-gray-600">${sliderValue}</p>
                </div>
            </div>
        </div>
    )
}

export default PriceRange;