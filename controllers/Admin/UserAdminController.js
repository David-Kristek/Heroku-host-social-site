const User = require("../../modules/User");

module.exports = {
  get_users: async (req, res) => {
    const users = await User.find();
    return res.send(users);
  },
  make_admin: async (req, res) => {
    const { userId } = req.params;
    try {
      await User.updateOne({ _id: userId }, { "admin.isAdmin": true });
      return res.json({ msg: "success" });
    } catch (err) {
      return res.json({ err: err });
    }
  },
  remove_user: async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!req.user.admin.mainAdmin && user.admin.isAdmin)
      return res.json({ err: "For this action you need to be main admin" });
    try {
      await User.deleteOne({ _id: userId });
      return res.json({ msg: "success" });
    } catch (err) {
      return res.json({ err: err });
    }
  },
  remove_admin: async (req, res) => {
    const { userId } = req.params;
    try {
      await User.updateOne({ _id: userId }, { "admin.isAdmin": false });
      return res.json({ msg: "success" });
    } catch (err) {
      return res.json({ err: err });
    }
  },
  first_admin: async (req, res) => {
    // const {userId} = req.params;
    const mainAdmin = await User.findOne({ "admin.mainAdmin": true });
    if (!mainAdmin) {
      try {
        await User.updateOne(
          { _id: req.user._id },
          { "admin.isAdmin": true, "admin.mainAdmin": true }
        );
      } catch (err) {
        return res.json({ err: err });
      }
      return res.json({ msg: "Congratulation, you are main admin" });
    }
    return res.json({ err: "already have admin", mainAdmin: mainAdmin.name });
  },
};
