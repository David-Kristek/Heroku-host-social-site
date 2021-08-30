const MessageController = require("../controllers/MessageController");
const Message = new MessageController();

module.exports = class Messages {
  constructor(socket) {
    this.socket = socket;
    this.socket.on("add_message", (groupPassword, text, writer) => {
      Message.saveMessage(text, writer, groupPassword).then((writerm) => {
        this.socket.broadcast
          .to(groupPassword)
          .emit("new_message", text, {
            username: writerm.name,
            email: writerm.email,
            picture: "",
          });
      });
    });
  }
};
