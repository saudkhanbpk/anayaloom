// import { useState, useEffect } from "react";
// import { Plus, Search, Eye, Edit, Trash2, Loader2 } from "lucide-react";
// import axios from "axios";

// const Products = ({ setCurrentPage }) => {
//   const API_BASE_URL = import.meta.env.VITE_API_URL;
  
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   // 🔹 Fetch all products
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // 🔹 Filter products based on search
//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setFilteredProducts(products);
//     } else {
//       const filtered = products.filter(
//         (product) =>
//           product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (product.category?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
//       );
//       setFilteredProducts(filtered);
//     }
//   }, [searchTerm, products]);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${API_BASE_URL}/products`);
//       setProducts(response.data);
//       setFilteredProducts(response.data);
//     } catch (error) {
//       console.error("Failed to fetch products:", error);
//       alert("Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 View Product Details
//   const handleViewProduct = (product) => {
//     setSelectedProduct(product);
//     // You can implement a modal or navigate to details page
//     alert(`Product Details:\n\nName: ${product.name}\nPrice: PKR ${product.price}\nCategory: ${product.category?.name || "N/A"}\nDescription: ${product.description || "No description"}`);
//   };

//   // 🔹 Edit Product
//   const handleEditProduct = (product) => {
//     // You can implement edit functionality
//     // Option 1: Navigate to edit page
//     // Option 2: Open edit modal
//     // Option 3: Pass to parent for editing
//     alert(`Edit product: ${product.name}\n\nYou can implement edit functionality here.`);
    
//     // Example: Navigate to edit page with product data
//     // setCurrentPage({
//     //   page: 'edit-product',
//     //   product: product
//     // });
//   };

//   // 🔹 Delete Product
//   const handleDeleteProduct = async (productId, productName) => {
//     if (!confirm(`Are you sure you want to delete "${productName}"?`)) {
//       return;
//     }

//     setDeletingId(productId);
//     try {
//       await axios.delete(`${API_BASE_URL}/products/${productId}`);
//       alert("Product deleted successfully");
//       fetchProducts(); // Refresh the list
//     } catch (error) {
//       console.error("Delete error:", error);
//       alert(error.response?.data?.message || "Failed to delete product");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   // 🔹 Format price
//   const formatPrice = (price) => {
//     return new Intl.NumberFormat("en-PK", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(price);
//   };

//   // 🔹 Get category name
//   const getCategoryName = (category) => {
//     if (typeof category === "string") return category;
//     if (category?.name) return category.name;
//     return "Uncategorized";
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">Products ({products.length})</h2>
//         <button
//           onClick={() => setCurrentPage("add-product")}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
//         >
//           <Plus className="w-4 h-4" />
//           Add Product
//         </button>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         {/* Search Bar */}
//         <div className="flex gap-4 mb-6">
//           {/* <div className="flex-1 relative">
//             <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search products by name or category..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div> */}
          
//           {/* Optional: Category Filter */}
//           {/* <select className="px-4 py-2 border rounded-lg">
//             <option value="">All Categories</option>
//             {categories.map(cat => (
//               <option key={cat._id} value={cat._id}>{cat.name}</option>
//             ))}
//           </select> */}
//         </div>

//         {/* Products Table */}
//         {loading ? (
//           <div className="flex justify-center items-center py-12">
//             <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
//             <span className="ml-2 text-gray-600">Loading products...</span>
//           </div>
//         ) : filteredProducts.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="text-gray-400 mb-4">
//               <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
//               </svg>
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               {searchTerm ? "No products found" : "No products yet"}
//             </h3>
//             <p className="text-gray-500 mb-4">
//               {searchTerm
//                 ? "Try a different search term"
//                 : "Add your first product to get started"}
//             </p>
//             {!searchTerm && (
//               <button
//                 onClick={() => setCurrentPage("add-product")}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 <Plus className="w-4 h-4 inline mr-2" />
//                 Add First Product
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="overflow-x-auto rounded-lg border border-gray-200">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Product
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Category
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Price
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Stock
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredProducts.map((product) => (
//                   <tr
//                     key={product._id}
//                     className="hover:bg-gray-50 transition-colors"
//                   >
//                     {/* Product Column with Image */}
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         {product.images && product.images[0] ? (
//                           <img
//                             src={product.images[0]}
//                             alt={product.name}
//                             className="w-10 h-10 rounded-md object-cover mr-3"
//                           />
//                         ) : (
//                           <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center mr-3">
//                             <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                             </svg>
//                           </div>
//                         )}
//                         <div>
//                           <div className="text-sm font-medium text-gray-900">
//                             {product.name}
//                           </div>
//                           <div className="text-xs text-gray-500 truncate max-w-xs">
//                             {product.description || "No description"}
//                           </div>
//                         </div>
//                       </div>
//                     </td>

//                     {/* Category Column */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         {getCategoryName(product.category)}
//                       </div>
//                       {product.category?.parent && (
//                         <div className="text-xs text-gray-500">
//                           Parent: {product.category.parent.name}
//                         </div>
//                       )}
//                     </td>

//                     {/* Price Column */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">
//                         PKR {formatPrice(product.price)}
//                       </div>
//                     </td>

//                     {/* Stock Column */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         {product.stock || 0}
//                       </div>
//                       <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
//                         <div
//                           className={`h-full rounded-full ${
//                             product.stock > 10
//                               ? "bg-green-500"
//                               : product.stock > 0
//                               ? "bg-yellow-500"
//                               : "bg-red-500"
//                           }`}
//                           style={{
//                             width: `${Math.min(
//                               ((product.stock || 0) / 50) * 100,
//                               100
//                             )}%`,
//                           }}
//                         ></div>
//                       </div>
//                     </td>

//                     {/* Status Column */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 py-1 text-xs font-medium rounded-full ${
//                           product.status === "active"
//                             ? "bg-green-100 text-green-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {product.status || "active"}
//                       </span>
//                       <div className="text-xs text-gray-500 mt-1">
//                         {new Date(product.createdAt).toLocaleDateString()}
//                       </div>
//                     </td>

//                     {/* Actions Column */}
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <div className="flex items-center gap-2">
//                         {/* View Button */}
//                         <button
//                           onClick={() => handleViewProduct(product)}
//                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                           title="View Details"
//                         >
//                           <Eye className="w-4 h-4" />
//                         </button>

//                         {/* Edit Button */}
//                         <button
//                           onClick={() => handleEditProduct(product)}
//                           className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                           title="Edit Product"
//                         >
//                           <Edit className="w-4 h-4" />
//                         </button>

//                         {/* Delete Button */}
//                         <button
//                           onClick={() =>
//                             handleDeleteProduct(product._id, product.name)
//                           }
//                           disabled={deletingId === product._id}
//                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
//                           title="Delete Product"
//                         >
//                           {deletingId === product._id ? (
//                             <Loader2 className="w-4 h-4 animate-spin" />
//                           ) : (
//                             <Trash2 className="w-4 h-4" />
//                           )}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Products;



import { useState, useEffect } from "react";
import { Plus, Eye, Edit, Trash2, Loader2 } from "lucide-react";
import axios from "axios";

const Products = ({ setCurrentPage ,setEditProduct}) => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 🔹 Fetch all products
  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Filter products based on search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.category?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 View Product Details
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // 🔹 Edit Product
  const handleEditProduct = (product) => {
//   setCurrentPage({ page: "add-product", product: product });
setEditProduct(product); // Use the setter passed from AdminDashboard
  setCurrentPage("add-product");
};

  // 🔹 Delete Product
  const handleDeleteProduct = async (productId, productName) => {
    if (!confirm(`Are you sure you want to delete "${productName}"?`)) return;

    setDeletingId(productId);
    try {
      await axios.delete(`${API_BASE_URL}/products/${productId}`);
      alert("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.response?.data?.message || "Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-PK", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price);

  const getCategoryName = (category) => {
    if (typeof category === "string") return category;
    if (category?.name) return category.name;
    return "Uncategorized";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products ({products.length})</h2>
        <button
          onClick={() => setCurrentPage("add-product")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading products...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? "No products found" : "No products yet"}
            </h3>
            {!searchTerm && (
              <button
                onClick={() => setCurrentPage("add-product")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4"
              >
                <Plus className="w-4 h-4 inline mr-2" /> Add First Product
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-10 h-10 rounded-md object-cover mr-3" />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center mr-3">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500 truncate max-w-xs">{product.description || "No description"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getCategoryName(product.category)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">PKR {formatPrice(product.price)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.stock || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${product.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {product.status || "active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleViewProduct(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleEditProduct(product)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit Product">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteProduct(product._id, product.name)} disabled={deletingId === product._id} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50" title="Delete Product">
                          {deletingId === product._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 🔹 Product Detail Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6 relative animate-fadeIn">
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold">✕</button>
            {selectedProduct.images?.[0] && (
              <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="w-full h-64 object-cover rounded-lg mb-4" />
            )}
            <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
            <p className="text-gray-700 mb-1"><span className="font-semibold">Price:</span> PKR {formatPrice(selectedProduct.price)}</p>
            <p className="text-gray-700 mb-1"><span className="font-semibold">Category:</span> {getCategoryName(selectedProduct.category)}</p>
            {selectedProduct.stock !== undefined && <p className="text-gray-700 mb-1"><span className="font-semibold">Stock:</span> {selectedProduct.stock}</p>}
            <p className="text-gray-600 mt-3">{selectedProduct.description || "No description available"}</p>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setShowModal(false)} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
