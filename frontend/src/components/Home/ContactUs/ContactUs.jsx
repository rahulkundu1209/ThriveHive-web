import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);

    // **✅ Reset form data after submission**
    setFormData({
      name: "",
      email: "",
      message: "",
    });

    // Hide popup after 2 seconds
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl flex flex-col md:flex-row w-full max-w-4xl">

        {/* Left Section - Text Content */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-gray-900 text-white rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
          <h2 className="text-3xl font-semibold leading-tight mb-4">
            "You’re not lost, you’re just one step away from clarity."
          </h2>
          <p className="text-lg opacity-80">
            Thrive Hives helps you turn uncertainty into confidence, guiding you toward a future you can own.
          </p>
        </div>

        {/* Right Section - Contact Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Contact Us
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-gray-800 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-gray-800 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-gray-800 outline-none"
                rows="4"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-700 transition-all font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Popup Notification */}
      {showPopup && (
        <div className="fixed bottom-5 right-5 bg-gray-900 text-white px-6 py-3 rounded-md shadow-md opacity-90 transition-opacity duration-300">
          ✅ Data Saved!
        </div>
      )}
    </div>
  );
};

export default ContactUs;
