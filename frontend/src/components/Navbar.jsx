import React, { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const Navbar = ({ isAuthenticated, onSignOut }) => {
  const [showSignOut, setShowSignOut] = useState(false);

  return (
    <nav className="bg-darkblue text-white flex items-center justify-between z-10 px-6 py-3 fixed top-0 left-0 right-0">
      {/* Logo */}
      <a href="/" className="">
        <h1 className="text-2xl font-bold">Thrive Hives</h1>
      </a>

      {/* Navigation Links */}
      <div className="flex space-x-6 text-gray-100 font-semibold">
        <a href="/worksheet" className="hover:text-white">Worksheet</a>
        <a href="#" className="hover:text-white">Link 2</a>
        <a href="#" className="hover:text-white">Link 3</a>
      </div>

      {/* Authentication Section */}
      <div className="relative">
        {isAuthenticated ? (
          <div>
            {/* Profile Icon */}
            <UserCircleIcon
              className="h-10 w-10 text-white bg-white/20 p-1 rounded-full cursor-pointer"
              onClick={() => setShowSignOut(!showSignOut)}
            />

            {/* Sign Out Dropdown */}
            {showSignOut && (
              <div
                className="absolute right-0 mt-2 w-32 bg-white text-black rounded-lg shadow-lg py-2"
                onClick={() => { setShowSignOut(false); onSignOut(); }}
              >
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600">
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
