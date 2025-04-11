import React, { useState, useEffect } from "react";
import { auth, provider, signInWithPopup } from "../utils/firebaseConfig";
import axios from "axios";
import { UserCircleIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { useAuthContext } from "../App";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Login = () => {
  const {signedIn, setSignedIn, isAdmin, setIsAdmin, userName, setUserName} = useAuthContext(); // Global Auth state
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setSignedIn(true);

        const idToken = await user.getIdToken(); // Get Firebase ID Token
        // console.log(idToken);
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/google`, { token: idToken });
        // console.log("Backend Response:", response.data);
        setIsAdmin(response.data.isAdmin);
        setUserName(response.data.name);
      } else {
        setSignedIn(false);
      }
      // setLoading(false);
    });

    return () => unsubscribe();
  }, [signedIn]); // Debugging to check if state updates

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      

      // Send token to the backend
      

      // console.log("Backend Response:", response.data);

      setSignedIn(true); // Update Auth Context
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      setSignedIn(false);
    }).catch(error => {
      console.error("Sign Out Error:", error);
    });
  };

  return (
    <div>
      {signedIn ? (
        <div className="">
          {/* Profile Icon */}
          <UserCircleIcon
            className="h-10 w-10 text-white bg-white/20 p-1 rounded-full lg:cursor-pointer"
            onClick={() => setShowProfile(!showProfile)}
          />

          {/* Sign Out Dropdown */}
            <div className={`absolute lg:${showProfile ? 'inline' : 'hidden'} lg:right-0 right-4 mt-2 w-50 lg:bg-white lg:text-black rounded-lg lg:shadow-lg p-2`}>
              <div className="text-center font-semibold text-lg flex border-b border-gray-300 pb-2 mb-2"> 
                <p>
                  Hello, {userName}! 🌝
                  <br/>
                  {isAdmin && "You have admin access!"}
                </p>
              </div>
              <div className="border-b border-gray-300 pb-2 mb-2">
                <a href="#">Your Profile</a>
              </div>
              <div className="border-gray-300 pb-2">
                <button
                  className="block w-full text-center p-2 rounded-xl hover:lg:bg-gray-200 hover:text-babyblue hover:cursor-pointer"
                  onClick={handleSignOut}
                >
                  Sign Out
                  <ArrowRightStartOnRectangleIcon className="h-5 w-5 inline ml-2" />
                </button>
              </div>
            </div>
        </div>
      ) : (
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 hover:cursor-pointer"
          onClick={handleGoogleSignIn}
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default Login;
