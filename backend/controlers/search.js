import Product from "../models/product.js";
import Category from "../models/category.js";


export const searchitems = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: "Query required" });
    const products = await Product.find({
      name: { $regex: query, $options: "i" }
    })
      .populate({
        path: "category",
        populate: {
          path: "parent",
          select: "_id name"
        }
      })
      .limit(5);

    // Search categories by name
    const categories = await Category.find({
      name: { $regex: query, $options: "i" }
    }).limit(5);

    res.json({ products, categories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// export default router;
