import { createContext, useContext, useState } from "react";
import React from "react";
import { auth } from "../config/Firebase";
import { signOut } from "firebase/auth";
// import { toast } from "react-toastify";

// Create the context
const userContext = createContext();

// Create the context provider component
const UserDetails = ({ children }) => {
  const [isLoggedIN, setIsLoggedIn] = useState(false); // Example state
  const [darkMode, setDarkMode] = useState(true);

  // logout function
  const signOutUser = async () => {
    try {
      await signOut(auth);
      toast.success("User Signout Successfull");
      setIsLoggedIn(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <userContext.Provider
      value={{ isLoggedIN, setIsLoggedIn, signOutUser, darkMode, setDarkMode }}
    >
      {children}
    </userContext.Provider>
  );
};

// Custom hook to use the context
const useDetails = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useDetails must be used within a UserDetails Provider");
  }
  return context;
};

export { useDetails, UserDetails };
