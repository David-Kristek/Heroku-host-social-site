const Message = require("../modules/Message");
const User = require("../modules/User");
module.exports = class MessageController {
  async saveMessage(text, user, groupPassword) {
    const userM = await User.findOne({ email: user.email });
    const message = new Message({
      text,
      sentByUser: userM,
      groupPassword: groupPassword,
    });
    try {
      const resp = await message.save();
      return userM;
    } catch (err) {
      console.log(err);
    }
  }
  async getMessages(req, res) {
    const resp = await Message.find({
      groupPassword: req.headers.grouppassword,
    }).populate("sentByUser");
    return res.json({ resp });
  }
};
