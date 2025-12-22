// const AddCategory = () => (
//   <div className="space-y-6">
//     <h2 className="text-2xl font-bold">Add New Category</h2>
    
//     <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Category Name *</label>
//           <input
//             type="text"
//             placeholder="Enter category name"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
//           <input
//             type="text"
//             placeholder="category-slug"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//           <textarea
//             rows="4"
//             placeholder="Enter category description"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//           <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//         </div>

//         <div className="flex gap-4 pt-4">
//           <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
//             {/* Note: You'll need to import Save icon in the file where it's used */}
//             Save Category
//           </button>
//           <button 
//             onClick={() => setCurrentPage('categories')}
//             className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default AddCategory;

import { Save } from "lucide-react";
import { useEffect, useState } from "react";
// import axios from "axios";

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [parentId, setParentId] = useState("");
  const [subCategories, setSubCategories] = useState([]);

  const [isNewParent, setIsNewParent] = useState(false);
  const [newParentName, setNewParentName] = useState("");

  // Fetch categories
//   useEffect(() => {
//     axios.get("/api/categories")
//       .then(res => setCategories(res.data))
//       .catch(err => console.log(err));
//   }, []);

  // Filter sub categories
  useEffect(() => {
    if (parentId) {
      setSubCategories(categories.filter(cat => cat.parent === parentId));
    } else {
      setSubCategories([]);
    }
  }, [parentId, categories]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Add New Category</h2>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
        <div className="space-y-4">

          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Category Name *
            </label>
            <input
              type="text"
              placeholder="Enter category name"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Toggle New Parent */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isNewParent}
              onChange={(e) => setIsNewParent(e.target.checked)}
            />
            <label className="text-sm font-medium">
              Add New Parent Category
            </label>
          </div>

          {/* Parent Category */}
          {!isNewParent ? (
            <div>
              <label className="block text-sm font-medium mb-1">
                Select Parent Category
              </label>
              <select
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">None (Main Category)</option>
                {categories
                  .filter(cat => cat.parent === null)
                  .map(cat => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-1">
                New Parent Category Name
              </label>
              <input
                type="text"
                value={newParentName}
                onChange={(e) => setNewParentName(e.target.value)}
                placeholder="Enter new parent category"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          )}

          {/* Sub Category */}
          {parentId && !isNewParent && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Existing Sub Categories
              </label>
              <select className="w-full px-4 py-2 border rounded-lg">
                <option value="">Select Sub Category</option>
                {subCategories.map(sub => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
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
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Status
            </label>
            <select className="w-full px-4 py-2 border rounded-lg">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2">
              <Save className="w-5 h-5" />
              Save Category
            </button>

            <button
              onClick={() => setCurrentPage("categories")}
              className="px-6 py-3 border rounded-lg"
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
