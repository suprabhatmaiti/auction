import React from "react";
import tigerImage from "../../assets/tiger.svg";
import { useNavigate } from "react-router-dom";
import Timer from "../Timer/Timer";

function Card({
  image = "" || tigerImage,
  name = "Tiger",
  currentbid = 90,
  button,
  className = "",
  id = null,
  endIn = null,
  ...rest
}) {
  const navigate = useNavigate();
  const handleBinNowClick = () => {
    navigate(`/auction-desc/${id}`);
  };
  return (
    <div
      {...rest}
      className={`flex flex-col rounded-2xl shadow-lg overflow-hidden hover:shadow-xl 
                  cursor-pointer active:shadow-xl bg-white
                  ${className}`}
    >
      {/* Image Section */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[120px] md:min-h-[180px] overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={name}
          className="max-w-full max-h-full object-contain"
        />
        {endIn && <Timer endIn={endIn} />}
      </div>

      <div className="flex-none px-3 md:px-4 py-3 flex flex-col justify-between gap-1 md:gap-2">
        <h3 className="text-sm md:text-lg font-semibold text-gray-800 truncate">
          Name: {name}
        </h3>

        <p className="font-bold text-xs sm:text-sm md:text-base">
          Current Bid: <span className="text-violet-600">₹{currentbid}</span>
        </p>

        {button && (
          <button
            onClick={handleBinNowClick}
            className="cursor-pointer bg-violet-600 hover:bg-violet-700 
                       text-white text-xs sm:text-sm md:text-base
                       px-3 py-2 rounded-lg font-semibold transition"
          >
            {button}
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;
