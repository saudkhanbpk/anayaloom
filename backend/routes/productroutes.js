import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controlers/productcontroller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("image"),createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
