import express from "express";
import { searchitems } from "../controlers/search.js";

const router = express.Router();

router.get("/" , searchitems);


export default router;