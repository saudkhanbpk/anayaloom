import Product from "../models/product.js";
import Category from "../models/category.js";


export const searchitems= async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: "Query required" });

    // Search products by name
    const products = await Product.find({
      name: { $regex: query, $options: "i" }
    }).limit(5); // limit results for live search

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
