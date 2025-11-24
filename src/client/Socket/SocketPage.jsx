import { useEffect, useRef, useState } from "react";
import { getSocket } from "../utils/getSocket.js";
import useAuth from "../hooks/useAuth";

function SocketPage() {
  const socket = useRef();
  const { user } = useAuth();

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

  const handlePlaceBid = () => {
    socket.current.emit(
      "place-bid",
      {
        auctionId: 26,
        userId: user.id,
        amount: 7222,
      },
      console.log
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
      <button className="border" onClick={handlePlaceBid}>
        PlaceBid
      </button>
    </div>
  );
}

export default SocketPage;
