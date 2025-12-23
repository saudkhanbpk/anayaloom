// import { Save } from "lucide-react";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Select from "react-select";


// const AddCategory = ({ setCurrentPage }) => {
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState("");
//   const [parentId, setParentId] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState("active");

//   const [isNewParent, setIsNewParent] = useState(false);
//   const [newParentName, setNewParentName] = useState("");

//   const API_BASE_URL = import.meta.env.VITE_API_URL;

//   useEffect(() => {
//     axios
//       .get(`${API_BASE_URL}/categories/parents`)
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleSaveCategory = async () => {
//     if (isNewParent && !newParentName.trim()) {
//       return alert("New parent category name is required");
//     }

//     if (!isNewParent && !name.trim()) {
//       return alert("Category name is required");
//     }

//     try {
//       await axios.post(`${API_BASE_URL}/categories`, {
//         name: isNewParent ? newParentName : name,
//         parentId: isNewParent ? null : parentId || null,
//         description,
//         status,
//       });

//       alert("Category saved successfully");

//       setName("");
//       setNewParentName("");
//       setParentId("");
//       setDescription("");
//       setStatus("active");
//       setIsNewParent(false);
//     } catch (error) {
//       alert(error.response?.data?.message || "Failed to save category");
//     }
//   };

//   return (
//     <div className="w-full px-4 sm:px-6 lg:px-8">
//       <h2 className="text-2xl font-bold mb-6">Add Category</h2>

//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full max-w-full lg:max-w-3xl">
//         <div className="space-y-4">

//           {/* Toggle */}
//           <div className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={isNewParent}
//               onChange={(e) => {
//                 setIsNewParent(e.target.checked);
//                 setParentId("");
//               }}
//             />
//             <label className="text-sm font-medium">
//               Add New Parent Category
//             </label>
//           </div>

//           {/* Category Name */}
//           {!isNewParent && (
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Category Name *
//               </label>
//               <input
//                 type="text"
//                 className="w-full px-4 py-2 border rounded-lg"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//           )}

//           {/* New Parent */}
//           {isNewParent && (
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 New Parent Category Name *
//               </label>
//               <input
//                 type="text"
//                 className="w-full px-4 py-2 border rounded-lg"
//                 value={newParentName}
//                 onChange={(e) => setNewParentName(e.target.value)}
//               />
//             </div>
//           )}

//           {/* Parent Select
//           {!isNewParent && (
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Parent Category 
//               </label>
//               <select
//                 className="w-full px-4 py-2 border rounded-lg"
//                 value={parentId}
//                 onChange={(e) => setParentId(e.target.value)}
//               >
//                 <option value="">None (Main Category)</option>
//                 {categories.map((cat) => (
//                   <option key={cat._id} value={cat._id} >
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )} */}

//           {/* Parent Category (Responsive) */}
//           {!isNewParent && (
//             <div className="w-full">
//               <label className="block text-sm font-medium mb-1">
//                 Parent Category
//               </label>

//               <Select
//                 className="w-full"
//                 classNamePrefix="react-select"
//                 placeholder="None (Main Category)"
//                 isClearable
//                 options={categories.map((cat) => ({
//                   value: cat._id,
//                   label: cat.name,
//                 }))}
//                 value={
//                   parentId
//                     ? categories
//                       .map((cat) => ({
//                         value: cat._id,
//                         label: cat.name,
//                       }))
//                       .find((opt) => opt.value === parentId)
//                     : null
//                 }
//                 onChange={(selected) =>
//                   setParentId(selected ? selected.value : "")
//                 }
//                 styles={{
//                   control: (base) => ({
//                     ...base,
//                     minHeight: "44px",
//                     borderRadius: "0.5rem",
//                   }),
//                   menu: (base) => ({
//                     ...base,
//                     zIndex: 50, // fixes dropdown overlapping issues
//                   }),
//                 }}
//               />
//             </div>
//           )}


//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Description
//             </label>
//             <textarea
//               rows="4"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>

//           {/* Status */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Status
//             </label>
//             <select
//               className="w-full px-4 py-2 border rounded-lg"
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//             >
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>

//           {/* Buttons – Responsive */}
//           <div className="flex flex-col sm:flex-row gap-4 pt-4">
//             <button
//               onClick={handleSaveCategory}
//               className="w-full sm:flex-1 bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
//             >
//               <Save className="w-5 h-5" />
//               Save Category
//             </button>

//             <button
//               onClick={() => setCurrentPage("categories")}
//               className="w-full sm:w-auto px-6 py-3 border rounded-lg"
//             >
//               Cancel
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCategory;



import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { setEditCategory } from "../../redux/categoryslice";

const AddCategory = ({ setCurrentPage }) => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");

  const [isNewParent, setIsNewParent] = useState(false);
  const [newParentName, setNewParentName] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_URL;
  
  // Get edit category from Redux
  const editCategory = useSelector((state) => state.category.editCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/categories/parents`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Populate form when editing
  useEffect(() => {
    if (editCategory) {
      setName(editCategory.name || "");
      setParentId(editCategory.parent || "");
      setDescription(editCategory.description || "");
      setStatus(editCategory.status || "active");
      setIsNewParent(false);
    }
  }, [editCategory]);

  const handleSaveCategory = async () => {
    if (isNewParent && !newParentName.trim()) {
      return alert("New parent category name is required");
    }

    if (!isNewParent && !name.trim()) {
      return alert("Category name is required");
    }

    try {
      if (editCategory) {
        // Update existing category
        await axios.put(`${API_BASE_URL}/categories/${editCategory._id}`, {
          name: isNewParent ? newParentName : name,
          parentId: isNewParent ? null : parentId || null,
          description,
          status,
        });
        alert("Category updated successfully");
      } else {
        // Create new category
        await axios.post(`${API_BASE_URL}/categories`, {
          name: isNewParent ? newParentName : name,
          parentId: isNewParent ? null : parentId || null,
          description,
          status,
        });
        alert("Category saved successfully");
      }

      // Reset form
      setName("");
      setNewParentName("");
      setParentId("");
      setDescription("");
      setStatus("active");
      setIsNewParent(false);
      
      // Clear edit category from Redux
      dispatch(setEditCategory(null));
      
      // Go back to categories page
      setCurrentPage("categories");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save category");
    }
  };

  const handleCancel = () => {
    // Clear edit category from Redux
    dispatch(setEditCategory(null));
    
    // Reset form
    setName("");
    setNewParentName("");
    setParentId("");
    setDescription("");
    setStatus("active");
    setIsNewParent(false);
    
    setCurrentPage("categories");
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6">
        {editCategory ? "Edit Category" : "Add Category"}
      </h2>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full max-w-full lg:max-w-3xl">
        <div className="space-y-4">

          {/* Toggle - Only show when adding new category */}
          {!editCategory && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isNewParent}
                onChange={(e) => {
                  setIsNewParent(e.target.checked);
                  setParentId("");
                }}
              />
              <label className="text-sm font-medium">
                Add New Parent Category
              </label>
            </div>
          )}

          {/* Category Name */}
          {!isNewParent && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Category Name *
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          {/* New Parent */}
          {isNewParent && (
            <div>
              <label className="block text-sm font-medium mb-1">
                New Parent Category Name *
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                value={newParentName}
                onChange={(e) => setNewParentName(e.target.value)}
              />
            </div>
          )}

          {/* Parent Category (Responsive) */}
          {!isNewParent && (
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">
                Parent Category
              </label>

              <Select
                className="w-full"
                classNamePrefix="react-select"
                placeholder="None (Main Category)"
                isClearable
                options={categories.map((cat) => ({
                  value: cat._id,
                  label: cat.name,
                }))}
                value={
                  parentId
                    ? categories
                      .map((cat) => ({
                        value: cat._id,
                        label: cat.name,
                      }))
                      .find((opt) => opt.value === parentId)
                    : null
                }
                onChange={(selected) =>
                  setParentId(selected ? selected.value : "")
                }
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "44px",
                    borderRadius: "0.5rem",
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 50,
                  }),
                }}
              />
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 border rounded-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Status
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Buttons – Responsive */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleSaveCategory}
              className="w-full sm:flex-1 bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
            >
              <Save className="w-5 h-5" />
              {editCategory ? "Update Category" : "Save Category"}
            </button>

            <button
              onClick={handleCancel}
              className="w-full sm:w-auto px-6 py-3 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddCategory;