import React,{useState,useEffect} from 'react'
import Blog from '../sections/Blog.jsx';
import Order from '../sections/Order.jsx';
import Partner from '../sections/Partner.jsx';
import Contact from '../sections/Contact.jsx';
import Footer from '../layout/Footer.jsx';
import Navbar from '../components/Navbar.jsx';



const Home = () => {
const [userValues, setUserValues] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      setUserValues(user);
    }
  }, []);
  return (
    <div className='flex flex-col'>
        <Navbar user={userValues}/>
        <Blog/>
        <Order Id={userValues.id}/>
        <Partner/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default Home;
