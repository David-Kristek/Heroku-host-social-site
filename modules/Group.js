const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 255,
      min: 2,
    },
    password: {
        type: String, 
        default: false
    }, 
    createdByUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);
