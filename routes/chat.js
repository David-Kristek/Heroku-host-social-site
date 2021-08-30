const router = require("express").Router();
const MessageController = require("../controllers/MessageController");
const checkAuth = require("../lib/chectAuth");

const Message = new MessageController();

router.post("/", checkAuth, Message.getMessages);

module.exports = router;
