// Add this to a file called App.jsx
import React from "react";
import { useState, useEffect } from "react";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "./Firebase";
import AuthPage from "./components/Auth";
import LoginPage from "./components/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserDetails } from "./context/userContext";
import Home from "./pages/Home";
function App() {
  const routes = createBrowserRouter([
    { path: "/", element: <LoginPage /> },
    { path: "/auth", element: <AuthPage /> },
    { path: "/home", element: <Home /> },
  ]);
  return (
    <>
      <UserDetails>
        <RouterProvider router={routes}></RouterProvider>
      </UserDetails>
    </>
  );
}

export default App;
