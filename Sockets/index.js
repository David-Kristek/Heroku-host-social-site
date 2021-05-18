const PostController = require("../controllers/PostController");

const posts = new PostController();
const getComments = (socket, postId) => {
  posts.get_post_comments(postId).then((res) => {
    socket.broadcast.emit("getComments", res);
  });
};
const getLikeCount = (socket, postId) => {
  posts.get_like_count(postId).then((res) => {
    socket.broadcast.emit("getLikeCount", res);
  });
};
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("actComment", (postId) => {
      getComments(socket, postId);
    });
    socket.on("likeCount", postId => {
      getLikeCount(socket, postId)
    });
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
