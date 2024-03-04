"use client";

import useAuth from "../context/AuthContext";
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return user.isLoggedIn ? children : null;
};

export default ProtectedRoute;
