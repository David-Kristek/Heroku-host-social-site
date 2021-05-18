const router = require("express").Router();
const GoogleAuthController = require("../controllers/googleAuthController");
const checkAuth = require("../lib/chectAuth");
const AuthController = require("../controllers/authController");

const googleAuth = new GoogleAuthController();
router.post("/googlelogin", googleAuth.login);
router.get("/is_logged", checkAuth, googleAuth.isLogged);

const auth = new AuthController();
router.post("/login", auth.login);
router.post("/register", auth.register);

module.exports = router;
