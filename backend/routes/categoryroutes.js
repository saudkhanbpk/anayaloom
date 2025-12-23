import express from "express";
import {
  createCategory,
  getCategories,
  getParentCategories,
  getSubCategories,
  updateCategory,
  deleteCategory
} from "../controlers/categorycontroller.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/parents", getParentCategories);
router.get("/sub/:parentId", getSubCategories);

router.put("/:id", updateCategory);   
router.delete("/:id", deleteCategory);

export default router;
