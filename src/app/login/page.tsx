"use client";
import React from "react";
import axios from "@/libs/axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";
import Link from "next/link";
import { motion } from "framer-motion";

function Login() {
  const router = useRouter();
  const { logIn } = useAuth();
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // get the Email and Password from the form
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    // check is the Email and Password are not empty
    if (!email || !password) {
      alert("Email and Password are required");
      return;
    }
    // check if the Email is valid
    if (!email.includes("@")) {
      alert("Email is not valid");
    }
    // create a form data
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    // send the Email and Password to the server
    const { data } = await axios.post(`/auth/login`, formData);

    if (data && data.token) {
      // if the server returns a token, store the token in localStorage
      logIn(data.token);
      Cookies.set("user", data.token);
      // redirect the user to the board page with a cookie
      router.push("/board");
    } else {
      // if the server returns an error, show the error to the user
      alert("Invalid Email or Password");
    }
  };
  const swipeVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={swipeVariants}
      transition={{ duration: 0.4 }}
      className=" py-20"
    >
      <div className="border border-neutral-700 bg-neutral-800 text-neutral-100 w-[400px] h-[300px] mx-auto">
        <h1 className="text-2xl text-center py-4">Login</h1>
        <form className="flex flex-col gap-5 p-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="rounded border border-neutral-700 p-2 text-black outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="rounded border border-neutral-700 p-2 text-black outline-none"
          />
          <button
            type="submit"
            className="bg-violet-500 text-neutral-100 p-2 rounded"
          >
            Login
          </button>
          <Link href="/signup">Create an account</Link>
        </form>
      </div>
    </motion.div>
  );
}

export default Login;
