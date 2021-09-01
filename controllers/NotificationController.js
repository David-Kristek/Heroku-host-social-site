// import { Expo } from 'expo-server-sdk';
// import User from "../modules/User";

const { Expo } = require("expo-server-sdk");

const User = require("../modules/User");
const NotificationController = {
  expoToken: "",
  registerNtToken: (req, res) => {
    this.expoToken = req.params.token;
    res.send("success");
  },
  sendNotification: async (
    { useremail, type = "", groupPassword = "" },
    messageProps = { title: "", body: "" }
  ) => {
    let messages = [];
    if (type === "useremail") {
      const user = await User.findOne({ email: txt });
      const userToken = user.expotoken;
      messages = [{ to: userToken, sound: "default", ...messageProps }];
    }
    if (type === "groupPassword") {
      const users = await User.find({ groupPassword });
      users.forEach((user) => {
        if (user.email !== useremail) {
          messages.push({
            to: user.expotoken,
            sound: "default",
            ...messageProps,
          });
        }
      });
    }
    if (!messages) return;
    console.log(messages);
    let expo = new Expo();
    let chunks = expo.chunkPushNotifications(messages);
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      } catch (error) {
        console.error(error);
      }
    }
  },
};

module.exports = NotificationController;
