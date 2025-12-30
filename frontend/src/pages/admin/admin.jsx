import React, { useState, useEffect } from 'react';
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
  ChevronDown,
  User,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddCategory from '../../components/admin/Addcategory';
import Categories from '../../components/admin/categroy';
import AddProduct from '../../components/admin/AddProduct';
import Products from '../../components/admin/products';
import Orders from '../../components/admin/order';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [editProduct, setEditProduct] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  // Get email from localStorage when component mounts
  const userData = localStorage.getItem('email');
 
  
  if (userData) {
    try {
      let email = '';
      if (userData.startsWith('{')) {
        const parsedUser = JSON.parse(userData);
        email = parsedUser.email || '';
      } else {
        email = userData;
      }
      setUserEmail(email);
    } catch (error) {
      console.error('Error parsing user data:', error);
      setUserEmail(userData);
    }
  }
}, []);

  const handleLogout = () => {
    
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/');
    
  };

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

  // Get first letter for avatar
  const getAvatarLetter = () => {
    if (userEmail) {
      return userEmail.charAt(0).toUpperCase();
    }
    return 'A'; // Default
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
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {getAvatarLetter()}
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Admin Account</p>
                      <p className="text-sm text-gray-500 truncate">{userEmail || 'No email found'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>
        
        {/* Click outside to close dropdown */}
        {dropdownOpen && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setDropdownOpen(false)}
          />
        )}
        
        <main className="flex-1 overflow-y-auto p-6">{renderPage()}</main>
      </div>
    </div>
  );
}