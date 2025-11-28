import { useEffect, useRef, useState } from "react";
import { getSocket } from "../utils/getSocket.js";
import useAuth from "../hooks/useAuth";

function SocketPage() {
  const socket = useRef();
  const { user } = useAuth();
  const [value, setValue] = useState("");
  const [current, setCurrent] = useState("");

  const handleCurrent = (res) => {
    setCurrent(res.bid.amount);
  };

  const handleClick = () => {
    socket.current.emit("ping", (response) => {
      console.log("Server response to ping:", response);
    });
  };

  const handleJoin = () => {
    socket.current.emit("auction:join", { auctionId: 26 }, console.log);
    socket.current.on("auction:snapshot", (payload) => {
      console.log(payload);
    });
  };
  const handleDisconnect = () => {
    socket.current.disconnect();
  };

  const handlePlaceBid = (e) => {
    e.preventDefault();
    socket.current.emit(
      "place-bid",
      {
        auctionId: 26,
        userId: user.id,
        amount: value,
      },
      (res) => {
        handleCurrent(res);
      }
    );
  };
  useEffect(() => {
    if (!socket.current) {
      console.log("invalid Socket, assigning socket...");
      socket.current = getSocket();
    }

    try {
      socket.current.connect();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <button className="border" onClick={handleClick}>
        Send Ping
      </button>

      <button className="border" onClick={handleDisconnect}>
        disconnect
      </button>
      <button className="border" onClick={handleJoin}>
        join
      </button>
      {current}
      <form>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="border" onClick={handlePlaceBid}>
          PlaceBid
        </button>
      </form>
    </div>
  );
}

export default SocketPage;
