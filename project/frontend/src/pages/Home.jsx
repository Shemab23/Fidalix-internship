import React from 'react'
import Blog from '../sections/Blog.jsx';
import Order from '../sections/Order.jsx';
import Partner from '../sections/Partner.jsx';
import Contact from '../sections/Contact.jsx';
import Footer from '../layout/Footer.jsx';



const Home = () => {
  return (
    <div className='flex flex-col'>
        <Blog/>
        <Order/>
        <Partner/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default Home;
