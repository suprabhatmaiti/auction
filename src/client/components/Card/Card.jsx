import React from "react";
import tigerImage from '../../assets/tiger.svg'
import Timer from "../Timer/Timer";

function Card({image=tigerImage,name = 'Tiger', currentbid = 90 }){
    return (
    <div className="max-w-xs rounded-2xl shadow-lg overflow-hidden 
                hover:shadow-xl hover:scale-105 
                transition-transform transition-shadow duration-300 ease-in-out 
                cursor-pointer active:bg-gray-200 min-w-sm m-4">
        <img
            src={image}
            alt={name}
            className="w-full h-48 object-contain"
        />

        <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">Name: {name}</h3>

            <p className=" font-bold mt-2">Current Bit: <span className="text-violet-600">₹{currentbid}</span> </p>
        </div>
        </div>
    );
}

export default Card;