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
} from 'lucide-react';
import AddCategory from '../../components/admin/Addcategory';
import Categories from '../../components/admin/categroy';
import AddProduct from '../../components/admin/AddProduct';
import Products from '../../components/admin/products';
import Orders from '../../components/admin/order';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [editProduct, setEditProduct] = useState(null);


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

  const Dashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <div><p className="text-blue-100 text-sm">Total Products</p><p className="text-3xl font-bold mt-2">234</p></div>
            <Package className="w-10 h-10 opacity-80" />
          </div>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <div><p className="text-green-100 text-sm">Total Orders</p><p className="text-3xl font-bold mt-2">142</p></div>
            <ShoppingCart className="w-10 h-10 opacity-80" />
          </div>
        </div>
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <div><p className="text-purple-100 text-sm">Total Customers</p><p className="text-3xl font-bold mt-2">89</p></div>
            <Users className="w-10 h-10 opacity-80" />
          </div>
        </div>
        <div className="bg-orange-500 text-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <div><p className="text-orange-100 text-sm">Revenue</p><p className="text-3xl font-bold mt-2">PKR 45K</p></div>
            <LayoutDashboard className="w-10 h-10 opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );

  //  const Orders = () => (
  //   <div className="space-y-6">
  //     <h2 className="text-2xl font-bold">Orders</h2>
  //     <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
  //       <table className="w-full">
  //         <thead className="bg-gray-50">
  //           <tr>
  //             <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
  //             <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
  //             <th className="px-4 py-3 text-left text-sm font-semibold">Total</th>
  //             <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
  //           </tr>
  //         </thead>
  //         <tbody className="divide-y divide-gray-200">
  //           {orders.map(order => (
  //             <tr key={order.id} className="hover:bg-gray-50">
  //               <td className="px-4 py-3 text-sm">#{order.id}</td>
  //               <td className="px-4 py-3 text-sm">{order.customer}</td>
  //               <td className="px-4 py-3 text-sm">PKR {order.total}</td>
  //               <td className="px-4 py-3"><span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">{order.status}</span></td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'products': return <Products setCurrentPage={setCurrentPage} setEditProduct={setEditProduct}/>;
      case 'add-product': return <AddProduct setCurrentPage={setCurrentPage} editProduct={editProduct} />;
      case 'categories': return <Categories setCurrentPage={setCurrentPage} />; 
      case 'add-category':
      case 'edit-category': return <AddCategory setCurrentPage={setCurrentPage} />;
      case 'orders': return <Orders />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-800 rounded-lg">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  // CRITICAL FIX: Reset edit state when navigating via sidebar
                  setEditProduct(null); 
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${currentPage === item.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800 capitalize">{currentPage.replace('-', ' ')}</h2>
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">A</div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{renderPage()}</main>
      </div>
    </div>
  );
}