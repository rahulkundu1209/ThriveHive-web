import React, { useState,useEffect } from "react";
import Login from "./Login";
import axios from "axios";
import Logo from "../assets/Logo.png";
import { ArrowRightIcon } from '@heroicons/react/24/solid'; // Correct import for Heroicons v2
import { auth } from "../utils/firebaseConfig";
import { useAuthContext } from "../App";
import { getAuth,onAuthStateChanged  } from "firebase/auth";
const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null); // Added local state for user photo
  const { signedIn, setSignedIn, isAdmin, setIsAdmin, userName, setUserName } = useAuthContext();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        setSignedIn(false);
        setUserPhoto(null);
        localStorage.removeItem("hasRedirected");
      })
      .catch((error) => {
        console.error("Sign Out Error:", error);
      });
  };
  useEffect(() => {
    const authInstance = getAuth();
    const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/google`,
            { token }
          );
          const photoUrl = response.data.picture || user.photoURL;
          setUserPhoto(photoUrl);
        } catch (error) {
          console.error("Auth error in Navbar:", error);
        }
      } else {
        setUserPhoto(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Side view of the menu in small screen width
  const MenuSideView = () => {
    return (
      <div className="flex flex-col items-center justify-between bg-darkblue text-white p-4">
        {/* Hello, User or Login */}
        <div className="flex flex-col items-center space-y-4 w-full mt-2">
          {signedIn ? (
            <>
              {userPhoto && (
                <img
                  src={userPhoto}
                  alt="User"
                  onError={(e) => (e.target.src = '/default-avatar.png')}
                  className="h-16 w-16 rounded-full border-2 border-white shadow-md"
                />
              )}
              <p className="text-xl font-bold text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.5)] text-center">
                Hello, {userName} 😊!
              </p>
              {isAdmin && (
                <p className="text-sm text-blue-500">Admin Access</p>
              )}
            </>
          ) : (
            <Login />
          )}
        </div>

        {/* Navigation Links */}
        <ul className="space-y-4 w-full mt-6">
          <li className="border-b border-white pb-2">
            <a href="/worksheet" className="hover:text-babyblue">
              Edit Worksheet
            </a>
          </li>
          {signedIn && (
            <li className="border-b border-white pb-2">
              <a href="/worksheet-submissions" className="hover:text-babyblue">
                Your Submissions
              </a>
            </li>
          )}
          {signedIn && isAdmin && (
            <li className="border-b border-white pb-2">
              <a href="/view-worksheet-submissions" className="hover:text-babyblue">
                All Submissions
              </a>
            </li>
          )}
          {isAdmin && (
            <li className="border-b border-white pb-2">
              <a href="/admin-dashboard" className="hover:text-babyblue">
                Admin Dashboard
              </a>
            </li>
          )}
          {signedIn && (
            <>
              <li className="border-b border-white pb-2">
                <a href="/profile" className="hover:text-babyblue">
                  Your Profile
                </a>
              </li>
              <li className="pb-2">
                <button
                  onClick={handleSignOut}
                  className="w-full text-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                >
                  Log Out
                </button>
              </li>
            </>
          )}
        </ul>
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
