import Product from "../models/product.js";
import cloudinary from "../config/cloudnairy.js"; // Fixed spelling

/* ===============================
   CREATE PRODUCT (WITH IMAGE UPLOAD)
================================ */
export const createProduct = async (req, res) => {
    try {
        const { name, price, description, category, stock } = req.body;
        const imageFile = req.file;

        console.log("📦 Creating product:", { name, price, category });
        console.log("📸 File received:", imageFile ? {
            originalname: imageFile.originalname,
            mimetype: imageFile.mimetype,
            size: `${(imageFile.size / 1024).toFixed(2)} KB`,
            hasBuffer: !!imageFile.buffer
        } : "No file");

        // Validation
        if (!name || !price || !category) {
            return res.status(400).json({
                message: "Name, price and category are required",
            });
        }

        if (!imageFile) {
            return res.status(400).json({
                message: "Product image is required",
            });
        }

        // ✅ Upload image to Cloudinary FROM BUFFER (not local path)
        let imageUrl = "";
        try {
            console.log("☁️ Uploading to Cloudinary...");

            // Convert buffer to base64 for Cloudinary
            const b64 = Buffer.from(imageFile.buffer).toString("base64");
            const dataURI = `data:${imageFile.mimetype};base64,${b64}`;

            const uploadResult = await cloudinary.uploader.upload(dataURI, {
                folder: process.env.CLOUDINARY_UPLOAD_FOLDER || "products",
                public_id: `product_${Date.now()}`,
                resource_type: "auto",
                overwrite: true,
            });

            imageUrl = uploadResult.secure_url;
            console.log("✅ Cloudinary upload successful:", imageUrl);
        } catch (uploadError) {
            console.error("❌ Cloudinary upload error:", uploadError);
            return res.status(500).json({
                message: "Failed to upload image to Cloudinary",
                error: uploadError.message,
            });
        }

        // Create product
        const product = await Product.create({
            name,
            price: Number(price),
            description,
            category,
            stock: 0, // Default stock
            images: [imageUrl], // Store as array
        });

        // Populate category
        const populatedProduct = await Product.findById(product._id)
            .populate("category", "name parent");

        console.log("✅ Product created successfully:", populatedProduct._id);
        res.status(201).json(populatedProduct);
    } catch (error) {
        console.error("❌ Create product error:", error);
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

/* ===============================
   UPDATE PRODUCT
================================ */
export const updateProduct = async (req, res) => {
    try {
        const { name, price, description, category, stock } = req.body;
        const imageFile = req.file;

        const updateData = { name, price, description, category, stock };

        // If new image is provided, upload it FROM BUFFER
        if (imageFile) {
            try {
                // Convert buffer to base64
                const b64 = Buffer.from(imageFile.buffer).toString("base64");
                const dataURI = `data:${imageFile.mimetype};base64,${b64}`;

                const uploadResult = await cloudinary.uploader.upload(dataURI, {
                    folder: process.env.CLOUDINARY_UPLOAD_FOLDER || "products",
                    public_id: `product_${Date.now()}`,
                    resource_type: "auto",
                });
                updateData.images = [uploadResult.secure_url];
            } catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError);
            }
        }

        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).populate("category", "name parent");

        if (!updated) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ... rest of the functions (getProducts, getProductById, deleteProduct) remain the same

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Delete image from Cloudinary (optional)
        if (product.images && product.images.length > 0) {
            try {
                const publicId = product.images[0].split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(
                    `${process.env.CLOUDINARY_UPLOAD_FOLDER || "products"}/${publicId}`
                );
            } catch (cloudinaryError) {
                console.log("Cloudinary delete error:", cloudinaryError);
                // Continue with product deletion even if image delete fails
            }
        }

        // Delete product from database
        await Product.findByIdAndDelete(req.params.id);

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




/* ===============================
   GET ALL PRODUCTS
================================ */
export const getProducts = async (req, res) => {
    try {
        // const products = await Product.find()
        //   .populate("category", "name parent")
        //   .sort({ createdAt: -1 });
        const products = await Product.find()
            .populate({
                path: "category",
                select: "name parent", // Get category name and parent ID
                populate: {
                    path: "parent",     // Deep populate the parent category
                    select: "name"      // We specifically need the parent's name
                }
            })
            .sort({ createdAt: -1 });

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* ===============================
   GET SINGLE PRODUCT
================================ */
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("category", "name parent");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};