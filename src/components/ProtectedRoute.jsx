"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState({
    isLoggedIn: false,
  });
  useEffect(() => {
    if (window) {
      if (localStorage.getItem("token")) {
        setUser({ isLoggedIn: true });
      } else {
        router.push("/login");
      }
    }
  }, []);
  return user.isLoggedIn ? children : null;
};

export default ProtectedRoute;
