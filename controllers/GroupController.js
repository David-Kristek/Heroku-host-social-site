const Group = require("../modules/Group");
const User = require("../modules/User");
class GroupController {
  async add(req, res) {
    const { name, groupPassword } = req.body;
    const groupExists = await Group.findOne({ name: name });
    if (groupExists) {
      return res.json({ err: "Group already exists" });
    }

    const group = new Group({
      name: name,
      password: groupPassword,
      createdByUser: req.user._id,
    });
    try {
      await group.save();
    } catch (err) {
      return res.json({ err: err });
    }
    return res.json({ msg: "Group uploaded" });
  }
  async checkPsw(req, res) {
    const group = await Group.findOne({
      password: req.body.groupPassword,
    }).populate({
      path: "createdByUser",
      select: ["name"],
    });
    console.log("group", group, req.body.groupPassword);
    if (group) {
      return res.json({ name: group.name, createdBy: group.createdByUser });
    }
    return res.json({ err: "no group found" });
  }
}
module.exports = GroupController;
