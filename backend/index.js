import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";  
import authRoutes from "./routes/authroutes.js"; 
import categoryRoutes from "./routes/categoryroutes.js"
import productRoutes from "./routes/productroutes.js"; 
import orderRoutes from "./routes/orderroutes.js"
import searchRoutes from "./routes/searchroute.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get('/', (req, res) => {
  res.send("hello this is muhammad zahid khan");
});

// Use the imported routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/search", searchRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);