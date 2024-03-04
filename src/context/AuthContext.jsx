"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const { push } = useRouter();
  const [user, setUser] = useState({
    email: "",
    isLoggedIn: false,
  });

  useEffect(() => {
    // check for the token cookie from cookie storage

    const token = localStorage.getItem("token");
    if (token) {
      setUser((prev) => ({
        ...prev,
        isLoggedIn: true,
      }));
    }
  }, []);

  const logIn = (token) => {
    localStorage.setItem("token", token);
    setUser((prev) => ({
      ...prev,
      isLoggedIn: true,
    }));
  };
  // Logout function delete the token from cookie storage
  const logOut = () => {
    localStorage.removeItem("token");
    push("/login");
    setUser((prev) => ({
      ...prev,
      isLoggedIn: false,
    }));
  };
  return (
    <AuthContext.Provider value={{ user, logOut, logIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
