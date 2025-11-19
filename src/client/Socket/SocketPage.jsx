import { useEffect, useRef, useState } from "react";
import { getSocket } from "../utils/getSocket.js";

function SocketPage() {
  const socket = useRef();
  const socketTest = getSocket();

  const handleClick = () => {
    socket.current.emit("ping", (response) => {
      console.log("Server response to ping:", response);
    });
  };

  const handleJoin = () => {
    socket.current.emit("auction:join", { auctionId: 123 });
  };
  const handleDisconnect = () => {
    socket.current.disconnect();
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
    </div>
  );
}

export default SocketPage;
