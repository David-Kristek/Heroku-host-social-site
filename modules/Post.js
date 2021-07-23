const { object, string } = require("@hapi/joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    description: {
      type: String,
    },
    categories: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Category",
    },
    location: {
      x: Number,
      y: Number,
      label: String,
    },
    images: {
      type: Array,
    },
    comments: [
      {
        text: String,
        commentedByUser: {
          type: mongoose.Schema.Types.ObjectId, //lepsi dalsi model
          ref: "User",
        },
      },
    ],
    createdByUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likedByUsers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    groupPassword: {
      // require: true,
      type: String,
    },
  },
  {
    collection: "posts",
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
