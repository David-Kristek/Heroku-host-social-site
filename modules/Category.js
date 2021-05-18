const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 255,
      min: 2,
    },
    approved: {
        type: Boolean, 
        default: false
    }, 
    createdByUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
