import React, { useState } from "react";
import Login from "./Login";
import Logo from "../assets/Logo.png";
import { useAuthContext } from "../App";
const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { signedIn, isAdmin } = useAuthContext();

  // Side view of the menu in small screen width
  const MenuSideView = () => {
    return (
      <div className="flex flex-col items-center justify-between bg-darkblue text-white">
      <ul className="space-y-4 w-full">
        <li className="border-b border-white pb-2">
          <a href="/worksheet" className="hover:text-babyblue"> Edit Worksheet</a>
        </li>
        {signedIn && <li className="border-b border-white pb-2">
          <a href="/worksheet-submissions" className="hover:text-babyblue"> Your Submissions</a>
        </li>}
        {(signedIn && isAdmin) && <li className="border-b border-white pb-2">
          <a href="/view-worksheet-submissions" className="hover:text-babyblue">All Submissions</a>
        </li>}
        {/* Comment should be removed after the Admin Dashboard development is complete
        {isAdmin && <li className="border-b border-white pb-2">
          <a href="/admin-dashboard" className="hover:text-babyblue">Admin Dashboard</a>
        </li>} */}
      </ul>
      <div className="mt-4">
        <Login />
      </div>
      </div>
    );
  };


  return (
    <>
      <nav className="bg-darkblue text-white flex items-center justify-between z-10 px-6 py-3 fixed top-0 left-0 right-0 h-20">
        {/* Logo */}
        <a href="/" className="">
          <img src={Logo} alt="logo" height="auto" width="100px" />
        </a>

        {/* Navigation Links for large screens */}
        <div className="hidden lg:flex space-x-6 text-gray-100 font-semibold">
          <a href="/worksheet" className="hover:text-babyblue">
            Edit Worksheet
          </a>
          {signedIn && (
            <a href="/worksheet-submissions" className="hover:text-babyblue">
              Your Submissions
            </a>
          )}
          {signedIn && isAdmin && (
            <a href="/view-worksheet-submissions" className="hover:text-babyblue">
              All Submissions
            </a>
          )}
          {isAdmin && (
            <a href="/admin-dashboard" className="hover:text-babyblue">
              Admin Dashboard
            </a>
          )}
        </div>

        {/* Sidebar Toggle Button for small screens */}
        <button
          className="lg:hidden text-white text-2xl focus:outline-none hover:cursor-pointer"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {!isSidebarOpen ? "☰" : "✕"}
        </button>

        {/* Authentication Section for large screens */}
        <div className="hidden lg:block relative">
          <Login />
        </div>
      </nav>

      {/* Sidebar for Small Screens */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed top-20 right-0 w-60 h-screen bg-darkblue z-20">
          <MenuSideView />
        </div>
      )}
    </>
  );
};

export default Navbar;
