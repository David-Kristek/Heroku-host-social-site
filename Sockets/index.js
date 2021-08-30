const PostController = require("../controllers/PostController");
const Messages = require("./Messages");
const posts = new PostController();
const getComments = (socket, postId) => {
  posts.get_post_comments(postId).then((res) => {
    socket.broadcast.emit("getComments", res);
  });
};
const getLikeCount = (socket, postId) => {
  posts.get_like_count(postId).then((res) => {
    console.log(res);
    socket.broadcast.emit("getLikeCount", res);
  });
};

module.exports = (io) => {
  io.on("connection", (socket) => {
    if (!socket.handshake.query["groupPassword"]) return;
    socket.join(socket.handshake.query["groupPassword"]);
    console.log(
      "New client connected to group " + socket.handshake.query["groupPassword"]
    );
    socket.on("actComment", (postId) => {
      getComments(socket, postId);
    });
    socket.on("likeCount", (postId) => {
      getLikeCount(socket, postId);
    });
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
    new Messages(socket);
  });
};
