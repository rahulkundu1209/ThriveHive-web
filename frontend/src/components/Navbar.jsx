import React, { useState } from "react";
import Login from "./Login";

const Navbar = ({isAdmin, signedIn}) => {

  return (
    <nav className="bg-darkblue text-white flex items-center justify-between z-10 px-6 py-3 fixed top-0 left-0 right-0">
      {/* Logo */}
      <a href="/" className="">
        <h1 className="text-2xl font-bold">Thrive Hives</h1>
      </a>

      {/* Navigation Links */}
      <div className="flex space-x-6 text-gray-100 font-semibold">
        <a href="/worksheet" className="hover:text-white">Worksheet</a>
        {signedIn && <a href="worksheet-submissions" className="hover:text-white">Submissions</a>}
        <a href="#" className="hover:text-white">Link 3</a>
      </div>

      {/* Authentication Section */}
      <div className="relative">
        <Login/>
      </div>
    </nav>
  );
};

export default Navbar;
