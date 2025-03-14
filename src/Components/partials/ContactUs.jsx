import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div
      className="h-screen w-screen
     bg-black text-white flex flex-col items-center justify-center px-6 py-16 mt-[10%]"
    >
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all"
      >
        ← Back
      </button>

      {/* Page Title */}
      <h1 className="text-5xl font-bold text-yellow-400 mb-6">Contact Us</h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-400 text-center max-w-2xl">
        Have questions or feedback? We’d love to hear from you. Fill out the
        form below and our team will get back to you as soon as possible.
      </p>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 bg-zinc-900 p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        {/* Name Field */}
        <div className="mb-6">
          <label className="block text-gray-400 text-lg mb-2">Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition duration-300"
            placeholder="Enter your name"
          />
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label className="block text-gray-400 text-lg mb-2">Your Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition duration-300"
            placeholder="Enter your email"
          />
        </div>

        {/* Message Field */}
        <div className="mb-6">
          <label className="block text-gray-400 text-lg mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition duration-300"
            placeholder="Enter your message"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-semibold p-3 rounded-md hover:bg-yellow-500 transition duration-300"
        >
          Send Message
        </button>
      </form>

      {/* Contact Info Section */}
      <div className="mt-12 flex flex-col items-center space-y-4 text-center">
        <p className="text-lg text-gray-400">
          📍 <span className="text-yellow-400">Location:</span> Mumbai ,
          Maharashtra India
        </p>
        <p className="text-lg text-gray-400">
          📧 <span className="text-yellow-400">Email:</span>{" "}
          dummyact320@gmail.com
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
