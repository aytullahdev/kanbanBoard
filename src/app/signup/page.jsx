"use client";
import React, { FormEvent, useState } from "react";
import axios from "@/libs/axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
function Signup() {
  const router = useRouter();
  const { logIn } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    console.log(formData);
    if (!email || !password) {
      alert("Email and Password are required");
      return;
    }

    if (!email.includes("@")) {
      alert("Email is not valid");
      return;
    }

    const newFormData = new FormData();
    newFormData.append("email", email);
    newFormData.append("password", password);
    try {
      const { data, status } = await axios.post(`/auth/signup`, newFormData);

      if (status === 201) {
        // Redirect to login page upon successful signup
        router.push("/login");
        return;
      }

      if (data && data.token) {
        logIn(data.token);
        Cookies.set("user", data.token);
        router.push("/board");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      alert("Signup failed. Please try again.");
      console.error("Signup error:", error);
    }
  };
  const swipeVariants = {
    hidden: { opacity: 0, x: "-100%" },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={swipeVariants}
      transition={{ duration: 0.4 }}
      className="py-20"
    >
      <div className="border border-neutral-700 bg-neutral-800 text-neutral-100 w-[400px] h-[300px] mx-auto">
        <h1 className="text-2xl text-center py-4">Signup</h1>
        <form className="flex flex-col gap-5 p-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="rounded border border-neutral-700 p-2 text-black outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="rounded border border-neutral-700 p-2 text-black outline-none"
          />
          <button
            type="submit"
            className="bg-violet-500 text-neutral-100 p-2 rounded"
          >
            Signup
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default Signup;
