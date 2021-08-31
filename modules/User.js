const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },
    email: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },
    password: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },
    image: {
      type: String,
      max: 1024,
      min: 6,
    },
    admin: {
      isAdmin: Boolean,
      mainAdmin: Boolean,
    },
    groupPassword: String,
    expotoken: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
