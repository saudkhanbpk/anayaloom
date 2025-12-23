// import { Plus, Pencil, Trash2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setEditCategory } from "../../redux/categoryslice";

// const Categories = ({ setCurrentPage}) => {
//   const [categories, setCategories] = useState([]);
//   const API_BASE_URL = import.meta.env.VITE_API_URL;
//   const dispatch = useDispatch();

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     const res = await axios.get(`${API_BASE_URL}/categories`);
//     setCategories(res.data);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this category?")) return;
//     await axios.delete(`${API_BASE_URL}/categories/${id}`);
//     fetchCategories();
//   };

//   const handleEdit = (category) => {
//     setEditCategory(category);
//     setCurrentPage("edit-category");
//   };

//   // 🔹 Parent categories
//   const parentCategories = categories.filter((cat) => !cat.parent);

//   // 🔹 Sub categories
//   const getSubCategories = (parentId) =>
//     categories.filter((cat) => cat.parent === parentId);

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">Categories</h2>
//         <button
//           onClick={() => setCurrentPage("add-category")}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
//         >
//           <Plus size={16} />
//           Add Category
//         </button>
//       </div>

//       {/* Parent Category Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {parentCategories.map((parent) => {
//           const subCategories = getSubCategories(parent._id);

//           return (
//             <div
//               key={parent._id}
//               className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
//             >
//               {/* Parent Card Header */}
//               <div className="flex justify-between items-start mb-3">
//                 <h3 className="text-lg font-semibold">{parent.name}</h3>

//                 <div className="flex gap-2">
//                   <button onClick={() => handleEdit(parent)}>
//                     <Pencil size={16} className="text-blue-600" />
//                   </button>
//                   <button onClick={() => handleDelete(parent._id)}>
//                     <Trash2 size={16} className="text-red-600" />
//                   </button>
//                 </div>
//               </div>

//               {/* Status */}
//               <span
//                 className={`inline-block mb-4 px-3 py-1 text-xs rounded-full ${
//                   parent.status === "active"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-700"
//                 }`}
//               >
//                 {parent.status}
//               </span>

//               {/* Sub Category Cards */}
//               {subCategories.length > 0 && (
//                 <div className="space-y-2">
//                   <p className="text-sm font-medium text-gray-500">
//                     Sub Categories
//                   </p>

//                   <div className="grid grid-cols-1 gap-2">
//                     {subCategories.map((sub) => (
//                       <div
//                         key={sub._id}
//                         className="flex justify-between items-center bg-gray-50 border rounded-lg px-3 py-2"
//                       >
//                         <span className="text-sm text-gray-700">
//                           {sub.name}
//                         </span>

//                         <div className="flex gap-2">
//                           <button onClick={() => handleEdit(sub)}>
//                             <Pencil size={14} className="text-blue-600" />
//                           </button>
//                           <button onClick={() => handleDelete(sub._id)}>
//                             <Trash2 size={14} className="text-red-600" />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Categories;



import { Plus, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setEditCategory } from "../../redux/categoryslice";

const Categories = ({ setCurrentPage }) => {  
  const [categories, setCategories] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get(`${API_BASE_URL}/categories`);
    setCategories(res.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await axios.delete(`${API_BASE_URL}/categories/${id}`);
    fetchCategories();
  };

  const handleEdit = (category) => {
    dispatch(setEditCategory(category)); // ✅ Use dispatch
    setCurrentPage("edit-category");
  };

  // 🔹 Parent categories
  const parentCategories = categories.filter((cat) => !cat.parent);

  // 🔹 Sub categories
  const getSubCategories = (parentId) =>
    categories.filter((cat) => cat.parent === parentId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories</h2>
        <button
          onClick={() => {
            dispatch(setEditCategory(null)); // ✅ Clear edit mode when adding new
            setCurrentPage("add-category");
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Parent Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parentCategories.map((parent) => {
          const subCategories = getSubCategories(parent._id);

          return (
            <div
              key={parent._id}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
            >
              {/* Parent Card Header */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold">{parent.name}</h3>

                <div className="flex gap-2">
                  <button onClick={() => handleEdit(parent)} className="hover:bg-blue-50 p-1 rounded">
                    <Pencil size={16} className="text-blue-600" />
                  </button>
                  <button onClick={() => handleDelete(parent._id)} className="hover:bg-red-50 p-1 rounded">
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </div>

              {/* Status */}
              <span
                className={`inline-block mb-4 px-3 py-1 text-xs rounded-full ${
                  parent.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {parent.status}
              </span>

              {/* Sub Category Cards */}
              {subCategories.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">
                    Sub Categories
                  </p>

                  <div className="grid grid-cols-1 gap-2">
                    {subCategories.map((sub) => (
                      <div
                        key={sub._id}
                        className="flex justify-between items-center bg-gray-50 border rounded-lg px-3 py-2"
                      >
                        <span className="text-sm text-gray-700">
                          {sub.name}
                        </span>

                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(sub)} className="hover:bg-blue-50 p-1 rounded">
                            <Pencil size={14} className="text-blue-600" />
                          </button>
                          <button onClick={() => handleDelete(sub._id)} className="hover:bg-red-50 p-1 rounded">
                            <Trash2 size={14} className="text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;

