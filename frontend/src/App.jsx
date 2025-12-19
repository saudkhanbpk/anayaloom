import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import CreateAccount from './pages/Signup';
import MenProducts from './pages/Men';
import WomenProducts from './pages/Women';
import JuniorsProducts from './pages/juniors';

function App() {
  return (
    
    <Router>
      <Navbar />

    <main className="pt-28 md:pt-32"> 
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/create-account' element={<CreateAccount />} />
          <Route path='/men'element={<MenProducts />} />
          <Route path='/women' element={<WomenProducts />} />
          <Route path='/juniors' element={<JuniorsProducts />} />
        </Routes>
      </main>
      
      <Footer />
    </Router>
  )
}

export default App