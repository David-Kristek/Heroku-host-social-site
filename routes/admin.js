const router = require("express").Router();
const UserList = require("../controllers/Admin/UserAdminController");
const Categories = require("../controllers/Admin/CategoriesAdminController");

const isMainAdmin = require("../lib/isMainAdmin");

router.get("/users", isMainAdmin, UserList.get_users);
router.get("/users/admin/:userId", isMainAdmin, UserList.make_admin);
router.delete("/users/admin/:userId", isMainAdmin, UserList.remove_admin);
router.delete("/users/:userId", UserList.remove_user);

router.get("/categories", Categories.all_categories);
router.get("/categories/naprovedcount", Categories.number_cateogories_toapprove);
router.get("/categories/:categoryId", Categories.approve_category);
router.post("/categories", Categories.add_approved_category);
router.delete("/categories/:categoryId", Categories.delete_category);

module.exports = router;
