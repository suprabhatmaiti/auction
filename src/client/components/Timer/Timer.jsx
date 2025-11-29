import { use, useEffect, useState } from "react";
import { CgStopwatch } from "react-icons/cg";

function Timer({ endIn = 60000 }) {
  const [time, setTime] = useState(endIn);
  const [isEnded, setIsEnded] = useState(false);

  const formatTime = (ms) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    if (days > 0) {
      return `${days}d ${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (time <= 0) {
      setIsEnded(true);
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => {
        const next = prev - 1000;
        return next > 0 ? next : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  return (
    <div className=" text-sm text-red-600 w-full ">
      {!isEnded ? (
        <div className="flex items-center gap-2 justify-center">
          <CgStopwatch />
          {formatTime(time)}
        </div>
      ) : (
        "Auction Ended"
      )}
    </div>
  );
}

export default Timer;
