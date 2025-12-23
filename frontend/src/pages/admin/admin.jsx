import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Upload,
  Save
} from 'lucide-react';
import AddCategory from '../../components/admin/Addcategory';
import Categories from '../../components/admin/categroy';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Sample data
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', category: 'Electronics', price: 1500, stock: 50, image: '' },
    { id: 2, name: 'Product 2', category: 'Clothing', price: 800, stock: 30, image: '' },
  ]);

  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics', products: 25, status: 'Active' },
    { id: 2, name: 'Clothing', products: 40, status: 'Active' },
    { id: 3, name: 'Books', products: 15, status: 'Active' },
  ]);

  const [orders, setOrders] = useState([
    { id: 1, customer: 'John Doe', total: 2500, status: 'Pending', date: '2024-01-15' },
    { id: 2, customer: 'Jane Smith', total: 1800, status: 'Delivered', date: '2024-01-14' },
    { id: 3, customer: 'Mike Johnson', total: 3200, status: 'Processing', date: '2024-01-13' },
  ]);

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', name: 'Products', icon: Package },
    { id: 'add-product', name: 'Add Product', icon: Plus },
    { id: 'categories', name: 'Categories', icon: FolderTree },
    { id: 'add-category', name: 'Add Category', icon: Plus },
    { id: 'orders', name: 'Orders', icon: ShoppingCart },
    { id: 'customers', name: 'Customers', icon: Users },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  // Dashboard Component
  const Dashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm">Total Products</p>
              <p className="text-3xl font-bold mt-2">234</p>
            </div>
            <Package className="w-10 h-10 opacity-80" />
          </div>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-100 text-sm">Total Orders</p>
              <p className="text-3xl font-bold mt-2">142</p>
            </div>
            <ShoppingCart className="w-10 h-10 opacity-80" />
          </div>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-100 text-sm">Total Customers</p>
              <p className="text-3xl font-bold mt-2">89</p>
            </div>
            <Users className="w-10 h-10 opacity-80" />
          </div>
        </div>

        <div className="bg-orange-500 text-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-orange-100 text-sm">Revenue</p>
              <p className="text-3xl font-bold mt-2">PKR 45K</p>
            </div>
            <LayoutDashboard className="w-10 h-10 opacity-80" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.slice(0, 5).map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">#{order.id}</td>
                  <td className="px-4 py-3 text-sm">{order.customer}</td>
                  <td className="px-4 py-3 text-sm">PKR {order.total}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 text-xs rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                      }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Products Component
  const Products = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <button
          onClick={() => setCurrentPage('add-product')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Stock</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{product.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{product.category}</td>
                  <td className="px-4 py-3 text-sm">PKR {product.price}</td>
                  <td className="px-4 py-3 text-sm">{product.stock}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Add Product Component
  const AddProduct = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Add New Product</h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
            <input
              type="text"
              placeholder="Enter product name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (PKR) *</label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
              <input
                type="text"
                placeholder="SKU-001"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows="4"
              placeholder="Enter product description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
              <Save className="w-5 h-5" />
              Save Product
            </button>
            <button
              onClick={() => setCurrentPage('products')}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  <Categories />;
  <AddCategory />;

  // Orders Component
  const Orders = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Orders</h2>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">#{order.id}</td>
                  <td className="px-4 py-3 text-sm">{order.customer}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.date}</td>
                  <td className="px-4 py-3 text-sm font-medium">PKR {order.total}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 text-xs rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                      }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'products': return <Products />;
      case 'add-product': return <AddProduct />;
      // case 'categories': return <Categories />;
       case 'categories': 
      return <Categories setCurrentPage={setCurrentPage} />; 
      // case 'add-category': return <AddCategory />;
      case 'add-category':
      case 'edit-category':
        return <AddCategory setCurrentPage={setCurrentPage} />;
      case 'orders': return <Orders />;
      case 'customers': return <div className="text-xl">Customers Page (Coming Soon)</div>;
      case 'settings': return <div className="text-xl">Settings Page (Coming Soon)</div>;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            {sidebarOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-800 rounded-lg"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${currentPage === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                  }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
            <LogOut className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800 capitalize">
              {currentPage.replace('-', ' ')}
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}