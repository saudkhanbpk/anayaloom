import { useState } from 'react'
import './App.css'
// 1. ADD THIS IMPORT
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import CreateAccount from './pages/Signup';

function App() {
  return (
    // 2. Wrap everything in the Router
    <Router>
      <Navbar />

    <main className="pt-28 md:pt-32"> 
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/create-account' element={<CreateAccount />} />
        </Routes>
      </main>
      
      <Footer />
    </Router>
  )
}

export default App