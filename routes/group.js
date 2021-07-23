const router = require("express").Router();
const GroupController = require("../controllers/GroupController"); 
const checkAuth = require("../lib/chectAuth");

const Group = new GroupController(); 

router.post("/add", checkAuth, Group.add)
router.post("/checkPsw", checkAuth ,Group.checkPsw); 

module.exports = router;