import { useState } from "react";
import { motion as Motion } from "framer-motion";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
// import {useNavigate} from 'react-router-dom'

const Navbar = ({user}) => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState('');

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setClicked(id);
    }
  };

  const links = [
    { text: "Best Deals", id: "blog" },
    { text: "Press Order", id: "order" },
    { text: "Our Community", id: "partner" },
    { text: "Contact Us", id: "contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md h-[57px] w-full flex items-center justify-between px-8 shadow-sm">
      <Logo />
      <div className="w-[1/6]"></div>
      <div className="flex gap-10 cursor-pointer">
        {links.map(item => (
        <Motion.div
            key={item.id}
            onClick={() => scrollTo(item.id)}
            whileHover={{ scale: 1.05 }}
            className={`font-medium ${clicked === item.id ? "text-primary": "text-black" }`}
        >
            {item.text}
        </Motion.div>
        ))}

      </div>
      <button onClick={()=>navigate('/')}>Logout</button>
      <img
        src= {user.profile_path}
        alt="profile"
        className="h-[50px] w-[50px] object-cover rounded-lg"/>
    </nav>
  );
};
/** <img src={cell} alt="preview" className="w-16 h-16 object-cover rounded" /> */
export default Navbar;


// import { UserContext } from '../context/UserContext';
// import React, { useContext, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';

//   const location = useLocation();
//   const { user, setUser } = useContext(UserContext);

//   useEffect(() => {
//     if (location.pathname === '/admin') {
//       setUser('admin');
//     } else {
//       setUser('customer');
//     }
//   }, [location.pathname, setUser]);
/**
 * <Link to="/">Home</Link>
      <Link to="/admin">Admin</Link>
      <span className="ml-auto font-bold">
        {user} MODE
      </span>
 *
 */
