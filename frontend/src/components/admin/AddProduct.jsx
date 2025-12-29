import { Upload, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const AddProduct = ({ setCurrentPage, editProduct }) => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const isEditMode = Boolean(editProduct);

  // 🔹 Pre-fill form if editing
  // useEffect(() => {
  //   if (editProduct) {
  //     setName(editProduct.name || "");
  //     setPrice(editProduct.price || "");
  //     setDescription(editProduct.description || "");
  //     setStock(editProduct.stock || 0);
  //     if (editProduct.category) {
  //       if (editProduct.category.parent) {
  //         setMainCategory(editProduct.category.parent);
  //         setSubCategory(editProduct.category._id);
  //       } else {
  //         setMainCategory(editProduct.category._id);
  //         setSubCategory("");
  //       }

  useEffect(() => {
    if (editProduct) {
      setName(editProduct.name || "");
      setPrice(editProduct.price || "");
      setDescription(editProduct.description || "");
      setStock(editProduct.stock || 0);

      if (editProduct.category) {
        // FIX: Ensure you are saving the ID string, not the whole object
        const categoryId = typeof editProduct.category === 'object'
          ? editProduct.category._id
          : editProduct.category;

        if (editProduct.category.parent) {
          // If parent is an object, take ID; if it's already an ID, take it
          const parentId = typeof editProduct.category.parent === 'object'
            ? editProduct.category.parent._id
            : editProduct.category.parent;

          setMainCategory(parentId);
          setSubCategory(categoryId);
        } else {
          setMainCategory(categoryId);
          setSubCategory("");
        }
    }
    if (editProduct.images?.[0]) {
      setImagePreview(editProduct.images[0]);
    }
  }else {
    // CRITICAL FIX: Reset form when NOT in edit mode
    setName("");
      setPrice("");
      setDescription("");
      setStock(0);
      setMainCategory("");
      setSubCategory("");
      setImage(null);
      setImagePreview("");
  }
  }, [editProduct]);

// 🔹 Handle image selection
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please select an image file (JPG, PNG, WEBP)");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("Image size should be less than 5MB");
    return;
  }

  setImage(file);
  setImagePreview(URL.createObjectURL(file));
};

const removeImage = () => {
  setImage(null);
  if (imagePreview && !isEditMode) URL.revokeObjectURL(imagePreview);
  setImagePreview("");
};

// 🔹 Fetch categories
useEffect(() => {
  axios
    .get(`${API_BASE_URL}/categories`)
    .then((res) => {
      setCategories(res.data);
      setParentCategories(res.data.filter((c) => !c.parent));
    })
    .catch(() => alert("Failed to load categories"));
}, []);

// 🔹 Load sub categories
useEffect(() => {
  if (mainCategory) {
    setSubCategories(categories.filter((c) => c.parent === mainCategory));
  } else {
    setSubCategories([]);
    setSubCategory("");
  }
}, [mainCategory, categories]);

const handleSubCategoryChange = (subId) => {
  const selectedSub = categories.find((c) => c._id === subId);
  if (selectedSub) {
    setSubCategory(subId);
    setMainCategory(selectedSub.parent);
  }
};

// 🔹 Save / Update product
const handleSaveProduct = async () => {
  if (!name.trim() || !price) {
    return alert("Product name and price are required");
  }

  if (!mainCategory && !subCategory) {
    return alert("Please select a category");
  }

  if (!image && !isEditMode) {
    return alert("Please select an image");
  }

  setSaving(true);

  try {
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("price", Number(price));
    formData.append("description", description.trim());
    formData.append("category", subCategory || mainCategory);
    formData.append("stock", Number(stock) || 0);
    if (image) formData.append("image", image);

    if (isEditMode) {
      // 🔹 Update existing product
      await axios.put(`${API_BASE_URL}/products/${editProduct._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Product updated successfully");
    } else {
      // 🔹 Add new product
      await axios.post(`${API_BASE_URL}/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Product added successfully");
    }

    setCurrentPage("products");
  } catch (err) {
    console.error("Save error:", err);
    alert(err.response?.data?.message || "Failed to save product");
  } finally {
    setSaving(false);
  }
};

return (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">{isEditMode ? "Edit Product" : "Add New Product"}</h2>

    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Product Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter product name"
        />
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Main Category *</label>
          <select
            value={mainCategory}
            onChange={(e) => setMainCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Main Category</option>
            {parentCategories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sub Category</label>
          <select
            value={subCategory}
            onChange={(e) => handleSubCategoryChange(e.target.value)}
            disabled={!subCategories.length}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Select Sub Category</option>
            {subCategories.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price & Stock */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Price (PKR) *</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Quantity in stock"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter product description"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium mb-1">Product Image {isEditMode ? "(Leave empty to keep current)" : "*"}</label>
        {imagePreview ? (
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4">
            <button type="button" onClick={removeImage} className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors">
              <X className="w-4 h-4" />
            </button>
            <img src={imagePreview} alt="Preview" className="max-h-60 mx-auto rounded object-contain" />
            {image && <p className="text-center text-sm text-gray-600 mt-2">{image.name} • {Math.round(image.size / 1024)}KB</p>}
          </div>
        ) : (
          <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer block hover:border-blue-400 transition-colors hover:bg-blue-50">
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 font-medium">Click to upload product image</p>
            <p className="text-xs text-gray-500 mt-1">Supports: JPG, PNG, WEBP (Max 5MB)</p>
            <input type="file" accept="image/*" hidden onChange={handleImageChange} disabled={uploading} />
          </label>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          onClick={handleSaveProduct}
          disabled={saving || uploading || (!image && !isEditMode)}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : <><Save className="w-5 h-5" /> {isEditMode ? "Update Product" : "Save Product"}</>}
        </button>

        <button onClick={() => setCurrentPage("products")} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  </div>
);
};

export default AddProduct;
