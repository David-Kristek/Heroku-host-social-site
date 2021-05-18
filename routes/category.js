const router = require("express").Router();
const CategoryController = require("../controllers/CategoryController"); 
const checkAuth = require("../lib/chectAuth");

const category = new CategoryController(); 

router.get("/", category.get)
router.post("/add", checkAuth ,category.add); 

module.exports = router;