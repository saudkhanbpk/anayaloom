import express from "express";
import { createOrder, getOrders, getOrderById } from "../controlers/ordercontroller.js";

const router = express.Router();


router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);

export default router;
