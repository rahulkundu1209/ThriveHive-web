import React, { useState, useEffect } from "react";
import { auth, provider, signInWithPopup } from "../utils/firebaseConfig";
import axios from "axios";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useAuthContext } from "../App";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Login = () => {
  const [signedIn, setSignedIn] = useAuthContext(); // Global Auth state
  const [showSignOut, setShowSignOut] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
      // setLoading(false);
    });

    return () => unsubscribe();
  }, [signedIn]); // Debugging to check if state updates

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken(); // Get Firebase ID Token

      // Send token to the backend
      const response = await axios.post("http://localhost:5000/api/auth/google", { token: idToken });

      console.log("Backend Response:", response.data);

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
        <div>
          {/* Profile Icon */}
          <UserCircleIcon
            className="h-10 w-10 text-white bg-white/20 p-1 rounded-full cursor-pointer"
            onClick={() => setShowSignOut(!showSignOut)}
          />

          {/* Sign Out Dropdown */}
          {showSignOut && (
            <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-lg shadow-lg py-2">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600"
          onClick={handleGoogleSignIn}
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default Login;
