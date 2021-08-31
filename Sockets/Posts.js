const PostController = require("../controllers/PostController");
const posts = new PostController();

module.exports = class Posts {
  constructor(socket) {
    this.socket = socket;
    socket.on("actComment", (postId) => {
      posts.get_post_comments(postId).then((res) => {
        this.socket.broadcast.emit("getComments", res);
      });
    });
    socket.on("likeCount", (postId) => {
      posts.get_like_count(postId).then((res) => {
        console.log(res);
        socket.broadcast.emit("getLikeCount", res);
      });
    });
  }
};
