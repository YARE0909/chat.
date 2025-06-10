import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = async (token: string): Promise<Socket> => {
  return new Promise((resolve, reject) => {
    if (socket && socket.connected) {
      return resolve(socket);
    }

    socket = io("http://localhost:5000", {
      auth: { token },
      transports: ["websocket"],
      reconnectionAttempts: 3,
      timeout: 5000,
    });

    socket.on("connect", () => {
      console.log("[Socket.IO] Connected:", socket!.id);
      resolve(socket!);
    });

    socket.on("connect_error", (err) => {
      console.error("[Socket.IO] Connection error:", err.message);
      reject(err);
    });

    socket.on("connect_timeout", () => {
      console.error("[Socket.IO] Connection timeout");
      reject(new Error("Connection timeout"));
    });
  });
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = () => {
  if (socket) {
    console.log("[Socket.IO] Disconnecting...");
    socket.disconnect();
    socket = null;
  }
};
