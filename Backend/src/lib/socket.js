import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
//tạo 1 HTTP server chạy trên ExpressJS, vì muốn ExpressJS và socket.io có thể chạy chung thì cần phải tạo 1 server HTTP
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});
let onlineUserMap = {}; //{userId:socketId}

export default function getReceiverSocketId(receiverId) {
  return onlineUserMap[receiverId];
}
io.on("connection", (socket) => {
  console.log("A user is connected: ", socket.id);

  const userId = socket.handshake.query.userId;
  onlineUserMap[userId] = socket.id;
  //emit() để bắn sự kiện đến các user có kết nối
  io.emit("getOnlineUsers", Object.keys(onlineUserMap));
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    delete onlineUserMap[userId];
    io.emit("getOnlineUsers", Object.keys(onlineUserMap));
  });
});
export { io, app, server };
