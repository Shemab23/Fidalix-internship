import React, { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmition = () => {
    if (!name || !email || !message) {
      alert("Fill all sections!");
      return;
    }
    setName("");
    setEmail("");
    setMessage("");
    alert("Thank you for your message.");
  };

  return (
    <section
      id="contact"
      className="w-full py-12 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 flex flex-col items-center gap-6"
    >
      <h2 className="font-bold text-2xl underline">Contact Us</h2>

      <div className="w-full max-w-lg bg-black/20 p-8 rounded-xl shadow-lg flex flex-col gap-4">
        {/* Name */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label className="font-semibold w-24">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 p-3 rounded-lg shadow-md text-sm"
            placeholder="Your name"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label className="font-semibold w-24">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 p-3 rounded-lg shadow-md text-sm"
            placeholder="your@email.com"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label className="font-semibold w-24">Message:</label>
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-3 rounded-lg shadow-md text-sm resize-none h-32"
            placeholder="Type your message here"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmition}
          className="self-end bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2 rounded shadow-md transition-all"
        >
          Submit
        </button>
      </div>
    </section>
  );
};

export default Contact;
