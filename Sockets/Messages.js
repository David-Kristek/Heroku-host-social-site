const MessageController = require("../controllers/MessageController");
const Message = new MessageController();
const Notification = require("../controllers/NotificationController");
module.exports = class Messages {
  constructor(socket) {
    this.socket = socket;
    this.socket.on("add_message", (groupPassword, text, writer) => {
      Message.saveMessage(text, writer, groupPassword).then((writerm) => {
        Notification.sendNotification(
          {
            email: writerm.email,
            type: "groupPassword",
            groupPassword,
          },
          {
            title: `Nová zpráva od ${writerm.name}`,
            body: text.length > 60 ? text.slice(0, 60) + "..." : text,
          }
        );
        this.socket.broadcast.to(groupPassword).emit("new_message", text, {
          username: writerm.name,
          email: writerm.email,
          picture: "",
        });
      });
    });
  }
};
