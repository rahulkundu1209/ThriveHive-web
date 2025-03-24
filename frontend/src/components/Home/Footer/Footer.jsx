import React from "react";
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Left Section - Contact & Address */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
          <p className="text-gray-400">123 Thrive Hives Street</p>
          <p className="text-gray-400">New Delhi, India</p>
          <p className="text-gray-400">Email: <a href="mailto:Thrivehivenow@gmail.com" className="text-gray-300 hover:text-white">Thrivehivenow@gmail.com</a></p>
        </div>

        {/* Center Section - Social Media Icons */}
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-5">
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-2xl"><FaLinkedin /></a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-2xl"><FaInstagram /></a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-2xl"><FaFacebook /></a>
            <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-2xl"><FaTwitter /></a>
          </div>
        </div>

        {/* Right Section - Quick Links */}
        <div className="text-right">
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Projects</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Thrive Hives. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
