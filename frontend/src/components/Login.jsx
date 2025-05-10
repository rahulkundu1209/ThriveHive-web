import React, { useState, useEffect, useRef } from "react";
import { auth, provider, signInWithPopup } from "../utils/firebaseConfig";
import axios from "axios";
import {
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { useAuthContext } from "../App";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    signedIn,
    setSignedIn,
    isAdmin,
    setIsAdmin,
    userName,
    setUserName,
    // Removed setUserPhoto since it's not being used in the context
  } = useAuthContext();
  const [showProfile, setShowProfile] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null); // Added local state for user photo
  const modalRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        const isNewUser =
          user.metadata.creationTime === user.metadata.lastSignInTime;

        try {
          const response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/google`,
            { token: idToken }
          );
          console.log(response.data);

          setSignedIn(true);
          setIsAdmin(response.data.isAdmin);
          setUserName(response.data.name);
          const photoUrl = response.data.picture; // Use the photo URL from the response or fallback to Firebase
          console.log(photoUrl);
          setUserPhoto(photoUrl);

          if (isNewUser && !localStorage.getItem("hasRedirected")) {
            localStorage.setItem("hasRedirected", "true");
            navigate("/edit");
          }
        } catch (error) {
          console.error("Authentication error:", error);
        }
      } else {
        setSignedIn(false);
        setUserPhoto(null);
      }
    });

    return () => unsubscribe();
  }, [setSignedIn, setIsAdmin, setUserName, navigate]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfile]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

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

  return (
    <div>
      {signedIn ? (
        <div>
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="cursor-pointer z-50"
          >
            {userPhoto ? (
              <img
                src={userPhoto}
                alt="User"
                onError={(e) => (e.target.src = '/default-avatar.png')} // Fallback to a default image
                className="h-10 w-10 rounded-full border-2 border-white shadow-md hover:ring-2 hover:ring-blue-400 transition-all duration-200"
              />
            ) : (
              <UserCircleIcon className="h-10 w-10 text-white bg-white/20 p-1 rounded-full hover:ring-2 hover:ring-blue-400 transition-all duration-200" />
            )}
          </div>

          <div className={`absolute lg:${showProfile ? 'inline' : 'hidden'} lg:right-0 right-0 mt-2 w-60 lg:bg-white lg:text-black rounded-lg lg:shadow-lg lg:p-2 p-0`}>
            <div className="px-4 py-3 border-b border-gray-300">
              <p className="font-semibold drop-shadow-[0_0_4px_rgba(255,255,255,0.5)] text-lg">Hello, {userName}! 🌝</p>
              {isAdmin && (
                <p className="text-sm text-blue-500 mt-1">
                  You have admin access!
                </p>
              )}
            </div>
            <div className="px-4 py-2 border-b border-gray-300 hover:bg-gray-100 transition cursor-pointer">
              <a href="/profile" className="block w-full">
                Your Profile
              </a>
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