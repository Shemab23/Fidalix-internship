import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Admin from './pages/admin.jsx'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Business from './pages/Business.jsx';


function App() {

  return (
    <div className='p-1 flex flex-col w-screen'>

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
