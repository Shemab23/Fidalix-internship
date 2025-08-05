import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Admin from './pages/Admin.jsx';
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';
import { useLocation } from 'react-router-dom';

function App() {
  const path = useLocation();
  return (
    <div className='p-1 flex flex-col w-screen'>
      {path.pathname.startsWith("/home") && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
