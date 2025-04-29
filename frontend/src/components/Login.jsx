import React, { useState, useEffect } from "react";
import { auth, provider, signInWithPopup } from "../utils/firebaseConfig";
import axios from "axios";
import { UserCircleIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { useAuthContext } from "../App";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { signedIn, setSignedIn, isAdmin, setIsAdmin, userName, setUserName, userPhoto, setUserPhoto } = useAuthContext(); // Global Auth state
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken(); // Get Firebase ID Token
        // Check if this is a new login
        const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;
        
        try {
          // Send token to backend
          const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/google`, { token: idToken });
          
          // Update state with user info
          setSignedIn(true);
          setIsAdmin(response.data.isAdmin);
          setUserName(response.data.name);
          setUserPhoto(user.photoURL); // Store user photo URL in the global state

          // If it's a new user, redirect to the edit page only once
          if (isNewUser && !localStorage.getItem('hasRedirected')) {
            localStorage.setItem('hasRedirected', 'true');
            navigate("/edit");
          }
        } catch (error) {
          console.error("Authentication error:", error);
        }
      } else {
        setSignedIn(false);
      }
    });

    return () => unsubscribe();
  }, []); // No dependency on signedIn to prevent infinite loops

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // The redirect will happen in the useEffect when the auth state changes
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      setSignedIn(false);
      localStorage.removeItem('hasRedirected'); // Remove the redirect flag on sign out
    }).catch(error => {
      console.error("Sign Out Error:", error);
    });
  };

  return (
    <div className="relative">
    {signedIn ? (
      <div className="flex items-center space-x-2">
        {/* Profile Icon / Photo */}
        <div onClick={() => setShowProfile(!showProfile)} className="cursor-pointer">
          {userPhoto ? (
            <img
              src={userPhoto}
              alt="User"
              className="h-10 w-10 rounded-full border-2 border-white shadow-md hover:ring-2 hover:ring-blue-400 transition-all duration-200"
            />
          ) : (
            <UserCircleIcon
              className="h-10 w-10 text-white bg-white/20 p-1 rounded-full hover:ring-2 hover:ring-blue-400 transition-all duration-200"
            />
          )}
        </div>
  
        {/* Dropdown Menu */}
        {showProfile && (
          <div className="absolute right-0 top-12 w-64 bg-white text-black rounded-xl shadow-2xl border border-gray-200 z-50 animate-fade-in">
            <div className="px-4 py-3 border-b border-gray-300">
              <p className="font-semibold text-lg">Hello, {userName}! 🌝</p>
              {isAdmin && <p className="text-sm text-blue-500 mt-1">You have admin access!</p>}
            </div>
            <div className="px-4 py-2 border-b border-gray-300 hover:bg-gray-100 transition cursor-pointer">
              <a href="/profile" className="block w-full">Your Profile</a>
            </div>
            <div className="px-4 py-2">
              <button
                className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                onClick={handleSignOut}
              >
                Sign Out
                <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    ) : (
      <button 
        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
        onClick={handleGoogleSignIn}
      >
        Sign In with Google
      </button>
    )}
  </div>
  
  );
};

export default Login;
