const Posts = require("./Posts");
const Messages = require("./Messages");
const Notification = require("../controllers/NotificationController");

module.exports = (io) => {
  io.on("connection", (socket) => {
    if (!socket.handshake.query["groupPassword"]) return;
    socket.join(socket.handshake.query["groupPassword"]);
    console.log(
      "New client connected to group " + socket.handshake.query["groupPassword"]
    );
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
    new Posts(socket);
    new Messages(socket);
  });
};
