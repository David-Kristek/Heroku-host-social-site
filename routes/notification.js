const router = require("express").Router();
const NotificationController = require("../controllers/NotificationController");
const checkAuth = require("../lib/chectAuth");


router.post("/register", checkAuth, NotificationController.registerNtToken);

module.exports = router;
