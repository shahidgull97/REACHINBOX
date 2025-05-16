import { useState, useEffect } from "react";
import React from "react";
import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
} from "lucide-react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/Firebase";

// Mock Firebase Auth functions
// Replace these with your actual Firebase implementation
// const mockFirebase = {
//   auth: {
//     createUserWithEmailAndPassword: (email, password) => {
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           if (email && password && password.length >= 6) {
//             resolve({ user: { email } });
//           } else {
//             reject({
//               code: "auth/weak-password",
//               message: "Password should be at least 6 characters",
//             });
//           }
//         }, 1000);
//       });
//     },
//     signInWithEmailAndPassword: (email, password) => {
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           if (email && password) {
//             resolve({ user: { email } });
//           } else {
//             reject({
//               code: "auth/wrong-password",
//               message: "Invalid email or password",
//             });
//           }
//         }, 1000);
//       });
//     },
//   },
// };

// // Replace with your actual Firebase implementation
// const firebase = mockFirebase;
import { useDetails } from "../context/userContext";
export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { isLoggedIN, setIsLoggedIn } = useDetails();
  useEffect(() => {
    // Reset form when switching between login and signup
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(null);
    setSuccess(null);
  }, [isLoggedIN]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!isLoggedIN && password !== confirmPassword) {
        throw { message: "Passwords do not match" };
      }

      if (isLoggedIN) {
        // Login
        const result = await signInWithEmailAndPassword(auth, email, password);
        setSuccess("Login successful!");
      } else {
        // Sign up
        console.log("Creating user with email:", email);
        console.log("Password length:", password.length);

        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setSuccess("Account created successfully! You can now login.");
        setIsLoggedIn(true);
      }
    } catch (err) {
      setError(err.message || "An error occurred");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleView = () => {
    setIsLoggedIn(!isLoggedIN);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-black text-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            {isLoggedIN ? "Login" : "Sign Up"}
          </h1>
          <p className="mt-2 text-gray-400">
            {isLoggedIN ? "Welcome back!" : "Create your account"}
          </p>
        </div>

        {error && (
          <div className="flex items-center p-4 bg-red-900/30 border border-red-800 rounded-md text-red-300">
            <AlertCircle className="flex-shrink-0 mr-3" size={18} />
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center p-4 bg-green-900/30 border border-green-800 rounded-md text-green-300">
            <CheckCircle className="flex-shrink-0 mr-3" size={18} />
            <p>{success}</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {!isLoggedIN && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          <div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <span className="inline-block animate-pulse">
                  Processing...
                </span>
              ) : isLoggedIN ? (
                <>
                  <LogIn className="mr-2" size={18} />
                  Login
                </>
              ) : (
                <>
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </>
              )}
            </button>
          </div>
        </div>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={toggleView}
            className="flex items-center justify-center w-full text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            {isLoggedIN ? (
              <>
                Don't have an account? Sign up
                <ChevronRight size={16} className="ml-1" />
              </>
            ) : (
              <>
                <ChevronLeft size={16} className="mr-1" />
                Already have an account? Login
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
