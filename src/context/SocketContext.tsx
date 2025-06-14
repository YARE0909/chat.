"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";

// Define the context type
interface SocketContextType {
  socket: Socket | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

// Create the context with default values
const SocketContext = createContext<SocketContextType>({
  socket: null,
  connectSocket: () => {},
  disconnectSocket: () => {},
});

// Provider component
export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [userToken, setUserToken] = useState<string | null>();

  // Connect to Socket.IO server using token from cookies
  const connectSocket = async () => {
    if (socket) return; // already connected

    const res = await fetch("/api/auth/token");
    if (!res.ok) return;

    const { token } = await res.json();
    setUserToken(token);
    if (!token) {
      console.warn("No auth token found, cannot connect socket");
      return;
    }

    const newSocket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
      auth: { token },
      transports: ["websocket"],
      reconnectionAttempts: 3,
      timeout: 5000,
    });

    setSocket(newSocket);
  };

  // Disconnect and clean up
  const disconnectSocket = () => {
    if (!socket) return;
    socket.disconnect();
    setSocket(null);
  };

  const fetchAndSetUserToken = async () => {
    console.log("Fetching User Token")
    const res = await fetch("/api/auth/token");
    if (!res.ok) return;

    const { token } = await res.json();
    setUserToken(token);
  };

  useEffect(() => {
    fetchAndSetUserToken();
  }, []);

  // Auto-connect if token exists on mount
  useEffect(() => {
    if (userToken) {
      connectSocket();
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [userToken]);

  return (
    <SocketContext.Provider value={{ socket, connectSocket, disconnectSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook for consuming the socket context
export const useSocket = (): SocketContextType => {
  return useContext(SocketContext);
};
