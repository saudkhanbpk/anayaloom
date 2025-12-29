import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartslice";

const CategoryProductsPage = () => {
  const { slug } = useParams(); // parent category ID
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const [subCategories, setSubCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // keep all products
  const [products, setProducts] = useState([]); // products to display
  const [loading, setLoading] = useState(true);
  const [activeSubCategory, setActiveSubCategory] = useState("all");
  const [toast, setToast] = useState(false);
  const [addingProduct, setAddingProduct] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);

        // Fetch all categories
        const catRes = await axios.get(`${API_BASE_URL}/categories`);
        const subs = catRes.data.filter(
          cat => cat.parent === slug || cat.parent?._id === slug
        );
        setSubCategories(subs);

        // Fetch all products
        const productRes = await axios.get(`${API_BASE_URL}/products`);
        // Filter products that belong to sub-categories
        const subCategoryIds = subs.map(cat => cat._id);
        const filteredProducts = productRes.data.filter(product => {
          const categoryId =
            typeof product.category === "string"
              ? product.category
              : product.category?._id;
          return subCategoryIds.includes(categoryId);
        });

        setAllProducts(filteredProducts);
        setProducts(filteredProducts); // default display all
      } catch (error) {
        console.error("Error loading category products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [slug]);

  const handleSubCategoryClick = (subId) => {
    setActiveSubCategory(subId);
    if (subId === "all") {
      setProducts(allProducts);
    } else {
      const filtered = allProducts.filter(product => {
        const categoryId =
          typeof product.category === "string"
            ? product.category
            : product.category?._id;
        return categoryId === subId;
      });
      setProducts(filtered);
    }
  };

  const handleAddToCart = (product) => {
    setAddingProduct(product._id);
    dispatch(
      addToCart({
        id: product._id,
        title: product.name,
        price: product.price,
        image: product.images?.[0],
      })
    );

    setToast(true);
    setTimeout(() => {
      setToast(false);
      setAddingProduct(null);
    }, 2000);
  };

  if (loading) {
    return <p className="text-center pt-28">Loading products...</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 pt-8 relative">
      {/* Toast */}
      {toast && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-black text-white px-6 py-3 rounded shadow-lg opacity-90">
            Item added to cart!
          </div>
        </div>
      )}

      {/* Sub Category Tabs */}
      <div className="flex flex-wrap gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => handleSubCategoryClick("all")}
          className={`px-6 py-2 rounded-full border transition-all duration-200 whitespace-nowrap text-sm font-medium ${
            activeSubCategory === "all"
              ? "bg-[#F7F3EB] border-[#D16B2D] text-[#D16B2D] shadow-sm"
              : "bg-white border-gray-300 text-gray-600 hover:border-[#D16B2D]"
          }`}
        >
          All
        </button>
        {subCategories.map((sub) => (
          <button
            key={sub._id}
            onClick={() => handleSubCategoryClick(sub._id)}
            className={`px-6 py-2 rounded-full border transition-all duration-200 whitespace-nowrap text-sm font-medium ${
              activeSubCategory === sub._id
                ? "bg-[#F7F3EB] border-[#D16B2D] text-[#D16B2D] shadow-sm"
                : "bg-white border-gray-300 text-gray-600 hover:border-[#D16B2D]"
            }`}
          >
            {sub.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border shadow-sm"
            >
              <img
                src={product.images?.[0]}
                alt={product.name}
                className=" w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-sm font-medium truncate">{product.name}</h2>
                <p className="font-semibold mt-2">PKR {product.price}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={addingProduct === product._id}
                  className={`mt-4 w-full border border-black py-2 text-sm transition ${
                    addingProduct === product._id
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "hover:bg-black hover:text-white"
                  }`}
                >
                  {addingProduct === product._id ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryProductsPage;
