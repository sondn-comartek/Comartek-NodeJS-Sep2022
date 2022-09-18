const { Server } = require("socket.io");
const MessageRepository = require("../repositories/message.repo");
const verifyAccessToken = require("./middlewares/verify-access-token");

async function initWebSocket(server) {
  const io = new Server(server);

  const defaultRoomId = "defaultRoomId";

  // WEBSOCKET AUTHENTICATION MIDDLEWARE
  io.use(verifyAccessToken).on("connection", (socket) => {
    const userId = socket?.userId;

    console.log({
      message: "A user connected",
      socketId: socket.id,
      userId,
    });

    socket.join(defaultRoomId);

    socket.on("send message", (message) => {
      MessageRepository.create(userId, defaultRoomId, message).then(
        (newMessage) => {
          socket.to(defaultRoomId).emit("get new message", newMessage);
        }
      );
    });

    socket.on("disconnect", () => {
      console.log({
        message: "A user disconnected",
        socketId: socket.id,
        userId,
      });
    });
  });

  return io;
}

module.exports = initWebSocket;
