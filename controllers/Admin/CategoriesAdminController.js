const Category = require("../../modules/Category");

module.exports = {
  all_categories: async (req, res) => {
    const categories = await Category.find().populate({path: "createdByUser", select: ["name"]});
    return res.send(categories);
  },
  add_approved_category: async (req, res) => {
    const { name } = req.body;
    const categoryExists = await Category.findOne({ name: name });
    if (categoryExists) {
      return res.json({ err: "Category already exists" });
    }
    const category = new Category({
      name: name,
      approved: true,
      createdByUser: req.user._id,
    });
    try {
      await category.save();
    } catch (err) {
      return res.json({ err: err });
    }
    return res.json({ msg: "Category uploaded" });
  },

  approve_category: async (req, res) => {
    const { categoryId } = req.params;
    try {
      const category = await Category.updateOne(
        { _id: categoryId },
        { approved: true }
      );
      return res.json({ msg: "Category approved " });
    } catch (err) {
      return res.json({ err: err });
    }
  },
  delete_category: async (req, res) => {
    const { categoryId } = req.params;
    try {
      await Category.deleteOne({ _id: categoryId });
      return res.json({ msg: "Category deleted" });
    } catch (err) {
      return res.json({ err: err });
    }
  },
  number_cateogories_toapprove: async (req, res) => {
    const posts = await Category.find({ approved: false });
    return res.json({msg: posts.length});
  },
};
