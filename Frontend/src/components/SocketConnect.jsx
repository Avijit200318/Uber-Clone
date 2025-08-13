import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from "socket.io-client"

let newSocket;

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

// use the bellow line in localhost
// const baseUrl = import.meta.env.VITE_BASE_URL;
// use this bellow line in deployment
const baseUrl = `${window.location.protocol}//${window.location.host}/`;
console.log("baseurl: ",baseUrl)

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    newSocket = io(baseUrl);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to socket:", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from socket");
    });

    return () => newSocket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};