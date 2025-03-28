import React, { useState, useEffect } from "react";
import { auth, provider, signInWithPopup } from "../utils/firebaseConfig";
import axios from "axios";
import { UserCircleIcon } from "@heroicons/react/24/solid";
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
        const response = await axios.post("http://localhost:5000/api/auth/google", { token: idToken });
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
        <div>
          {/* Profile Icon */}
          <UserCircleIcon
            className="h-10 w-10 text-white bg-white/20 p-1 rounded-full cursor-pointer"
            onClick={() => setShowProfile(!showProfile)}
          />

          {/* Sign Out Dropdown */}
          {showProfile && (
            <div className="absolute inline right-0 mt-2 w-32 bg-white text-black rounded-lg shadow-lg py-2">
              <div className="text-center font-semibold text-lg flex"> 
                <p>
                  Hello, {userName}! 🌝
                </p>
                {/* <img src={moonEmoji} alt="emoji" width="25px" height="25px" />  */}
              </div>
              {isAdmin && <div className="text-center font-semibold text-lg">You have admin access!</div>}
              <hr />
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 hover:cursor-pointer"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          )}
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
