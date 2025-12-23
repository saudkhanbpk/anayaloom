import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import CreateAccount from './pages/Signup';
import MenProducts from './pages/Men';
import WomenProducts from './pages/Women';
import JuniorsProducts from './pages/juniors';
import CheckoutPage from './pages/checkout';
import AdminDashboard from './pages/admin/admin';
import OTPVerification from './pages/otp';
import ForgotPassword from './pages/forgetpassword';

function AppContent() {
  const location = useLocation();

  // ✅ Check if current route is admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Show Navbar only if NOT admin */}
      {!isAdminRoute && <Navbar />}

      <main className={!isAdminRoute ? "pt-28 md:pt-32" : ""}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/create-account' element={<CreateAccount />} />
          <Route path='/verify-otp' element={<OTPVerification />} />
          <Route path='/forget-password' element={<ForgotPassword />} />
          <Route path='/men' element={<MenProducts />} />
          <Route path='/women' element={<WomenProducts />} />
          <Route path='/juniors' element={<JuniorsProducts />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/admin' element={<AdminDashboard />} />
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
