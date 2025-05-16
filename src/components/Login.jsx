import React from "react";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import AuthPage from "./Auth";
import { googleProvider, auth } from "../config/Firebase";
import { useNavigate } from "react-router-dom";
import { useDetails } from "../context/userContext";
const LoginPage = () => {
  const navigate = useNavigate();
  //   const auth = getAuth();
  const { isLoggedIN, setIsLoggedIn } = useDetails();

  const handleGoogleSignIn = async () => {
    try {
      //   const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleProvider);
      // navigate("/dashboard"); // Navigate after successful login
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black w-screen flex flex-col items-center justify-center">
      {/* Header with logo */}
      <div className="absolute top-6 w-screen flex justify-center">
        <h1>REACHINBOX</h1>
        {/* <img src="images/reachinbox.png" alt="REACHINBOX" className="h-6" /> */}
      </div>

      {/* Auth container */}
      <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-white font-bold text-2xl text-center mb-6">
            Create a new account
          </h2>

          {/* Google Sign-in button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-transparent border border-gray-700 text-white py-2 px-4 rounded mb-4 hover:bg-gray-800"
          >
            <img src="images/google.png" alt="G" className="h-5 w-5 mr-2" />
            Sign Up with Google
          </button>

          {/* Create Account button */}
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
            onClick={() => {
              setIsLoggedIn(false);
              navigate("/auth");
            }}
          >
            Create an Account
          </button>

          {/* Sign In link */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-400">
              Already have an account?
              <span
                className="ml-1 text-blue-400 hover:underline cursor-pointer"
                onClick={() => {
                  setIsLoggedIn(true);
                  navigate("/auth");
                }}
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
