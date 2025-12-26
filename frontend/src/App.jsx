// import './App.css'
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import LoginPage from './pages/Login';
// import CreateAccount from './pages/Signup';
// import MenProducts from './pages/Men';
// import WomenProducts from './pages/Women';
// import JuniorsProducts from './pages/juniors';
// import CheckoutPage from './pages/checkout';
// import AdminDashboard from './pages/admin/admin';
// import OTPVerification from './pages/otp';
// import ForgotPassword from './pages/forgetpassword';
// import CategoryProductsPage from "./pages/CategoryProductsPage";


// function AppContent() {
//   const location = useLocation();

//   // ✅ Check if current route is admin
//   const isAdminRoute = location.pathname.startsWith('/admin');

//   return (
//     <>
//       {/* Show Navbar only if NOT admin */}
//       {!isAdminRoute && <Navbar />}

//       <main className={!isAdminRoute ? "pt-28 md:pt-32" : ""}>
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/login' element={<LoginPage />} />
//           <Route path='/create-account' element={<CreateAccount />} />
//           <Route path='/verify-otp' element={<OTPVerification />} />
//           <Route path='/forget-password' element={<ForgotPassword />} />
//           {/* <Route path='/men' element={<MenProducts />} /> */}
//           <Route path='/women' element={<WomenProducts />} />
//           <Route path='/juniors' element={<JuniorsProducts />} />
//           <Route path="/collection/:slug" element={<CategoryProductsPage />} />
//           <Route path='/checkout' element={<CheckoutPage />} />
//           <Route path='/admin' element={<AdminDashboard />} />
//         </Routes>
//       </main>

//       {/* Show Footer only if NOT admin */}
//       {!isAdminRoute && <Footer />}
//     </>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// export default App;



import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import CreateAccount from './pages/Signup';
import WomenProducts from './pages/Women';
import JuniorsProducts from './pages/juniors';
import CheckoutPage from './pages/checkout';
import AdminDashboard from './pages/admin/admin';
import OTPVerification from './pages/otp';
import ForgotPassword from './pages/forgetpassword';
import CategoryProductsPage from "./pages/CategoryProductsPage";

// Protected Admin Route Component
const AdminRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      
      if (token && role === 'admin') {
        setIsAuthenticated(true);
        setIsAdmin(true);
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
      setIsLoading(false);
    };

    checkAuth();
    
    // Listen for storage changes (in case of logout from another tab)
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Not logged in, redirect to login
    return <Navigate to="/login" state={{ from: '/admin' }} replace />;
  }

  if (!isAdmin) {
    // Logged in but not admin, redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
};

// Protected Checkout Route (requires login)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" state={{ from: '/checkout' }} replace />;
  }
  
  return children;
};

// Public Route that redirects if already logged in
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  
  if (token) {
    if (role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function AppContent() {
  const location = useLocation();

  // ✅ Check if current route is admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Show Navbar only if NOT admin */}
      {!isAdminRoute && <Navbar />}

      <main className={!isAdminRoute ? "pt-28 md:pt-42" : ""}>
        <Routes>
          <Route path='/' element={<Home />} />
          
          {/* Public routes - redirect if already logged in */}
          <Route path='/login' element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          <Route path='/create-account' element={<CreateAccount />} />
          <Route path='/verify-otp' element={<OTPVerification />} />
          <Route path='/forget-password' element={<ForgotPassword />} />
          
          {/* Product routes - accessible to all */}
          <Route path='/women' element={<WomenProducts />} />
          <Route path='/juniors' element={<JuniorsProducts />} />
          <Route path="/collection/:slug" element={<CategoryProductsPage />} />
          
          {/* Checkout - requires login */}
          <Route path='/checkout' element={
            <ProtectedRoute>
              <CheckoutPage />
             </ProtectedRoute>
          } />
          
          {/* Admin routes - requires admin role */}
          <Route path='/admin' element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          
          {/* Add more admin routes if needed */}
          {/* <Route path='/admin/orders' element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          } /> */}
          
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Show Footer only if NOT admin */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;