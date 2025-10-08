import React from "react";
import tigerImage from "../../assets/tiger.svg";

function Card({
  image = tigerImage,
  name = "Tiger",
  currentbid = 90,
  button ,
  className = "",
  ...rest
}) {
  return (
    <div
      {...rest}
      className={`flex flex-col rounded-2xl shadow-lg overflow-hidden 
                  
                  cursor-pointer active:shadow-lg bg-white 
                  ${className}`}
    >
      {/* Image Section */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={name}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Info Section */}
      <div className="flex-none px-4 py-4 flex flex-col justify-between gap-2">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          Name: {name}
        </h3>

        <p className="font-bold text-sm sm:text-base">
          Current Bid:{" "}
          <span className="text-violet-600">₹{currentbid}</span>
        </p>

        {button && <button
          className="cursor-pointer bg-violet-600 hover:bg-violet-700 
                     text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          {button}
        </button>}
      </div>
    </div>
  );
}

export default Card;
