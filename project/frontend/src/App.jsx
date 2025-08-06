import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Admin from './pages/Admin.jsx';
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Business from './pages/Business.jsx';
import { useLocation } from 'react-router-dom';

function App() {
  const path = useLocation();
  return (
    <div className='p-1 flex flex-col w-screen'>
      {path.pathname === ("/Home") && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/business" element={<Business/>} />
      </Routes>
    </div>
  );
}

export default App;
