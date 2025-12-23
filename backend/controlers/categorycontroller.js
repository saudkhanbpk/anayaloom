import Category from "../models/category.js";

/**
 * CREATE CATEGORY
 */
export const createCategory = async (req, res) => {
  try {
    const { name, parentId, description, status } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const category = await Category.create({
      name,
      parent: parentId || null,
      description,
      status
    });

    res.status(201).json({
      message: "Category created successfully",
      category
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ALL CATEGORIES
 */
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ONLY PARENT CATEGORIES
 */
export const getParentCategories = async (req, res) => {
  try {
    const parents = await Category.find({ parent: null });
    res.json(parents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET SUB CATEGORIES BY PARENT ID
 */
export const getSubCategories = async (req, res) => {
  try {
    const { parentId } = req.params;

    const subCategories = await Category.find({ parent: parentId });
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, parentId, description, status } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Update fields
    category.name = name ?? category.name;
    category.description = description ?? category.description;
    category.status = status ?? category.status;
    category.parent = parentId === "" ? null : parentId ?? category.parent;

    await category.save();

    res.json({
      message: "Category updated successfully",
      category
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // 🔥 Delete all sub-categories first
    await Category.deleteMany({ parent: id });

    // 🔥 Delete parent category
    await Category.findByIdAndDelete(id);

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
