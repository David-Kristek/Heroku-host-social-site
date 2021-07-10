const router = require("express").Router();
const PostController = require("../controllers/PostController");
const checkAuth = require("../lib/chectAuth");
const multer = require("multer");
const Validation = require("../lib/validation");
const validate = new Validation();

const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_IMAGE_LOCATION); //env - image location
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString() + "-" + file.originalname);
  },
});
const fileUpload = multer()

// var upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype == "image/png" ||
//       file.mimetype == "image/jpg" ||
//       file.mimetype == "image/jpeg"
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       // return res.json({err: "Only .png, .jpg and .jpeg format allowed!"})
//       return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
//     }
//   },
// });
var upload = multer();

const post = new PostController();

router.get("/", post.get);
// router.post("/add",post.add);
router.post(
  "/add",
  checkAuth,
  fileUpload.array("images", 5),
  // post.upload_image,
  post.add
);

router.get("/like/:id", checkAuth, post.like_post);

router.post("/comment/:id", checkAuth, post.comment_post);

module.exports = router;
