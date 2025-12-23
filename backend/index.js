import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";  
import authRoutes from "./routes/authroutes.js"; 
import categoryRoutes from "./routes/categoryroutes.js" 


dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("hello this is muhammad zahid khan");
});

// Use the imported routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);