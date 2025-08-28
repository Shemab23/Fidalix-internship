import React, { useState, useEffect } from "react";
import Blog from "../sections/Blog.jsx";
import Order from "../sections/Order.jsx";
import Partner from "../sections/Partner.jsx";
import Contact from "../sections/Contact.jsx";
import Footer from "../layout/Footer.jsx";
import Navbar from "../components/Navbar.jsx";

const Home = () => {
  const [userValues, setUserValues] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setUserValues(user);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-b from-green-400 via-blue-400 to-purple-400">

      {/* Navbar */}
      <Navbar user={userValues} />

      {/* Blog Section */}
      <section id="blog" className="w-full py-12 px-4 sm:px-6 md:px-10">
        <Blog />
      </section>

      {/* Orders Section */}
      <section id="order" className="w-full py-12 px-4 sm:px-6 md:px-10 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded-t-3xl">
        <Order Id={userValues.id} />
      </section>

      {/* Partners Section */}
      <section id="partner" className="w-full py-12 px-4 sm:px-6 md:px-10">
        <Partner />
      </section>

      {/* Contact Section */}
      <section className="w-full py-12 px-4 sm:px-6 md:px-10 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 rounded-t-3xl">
        <Contact />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
