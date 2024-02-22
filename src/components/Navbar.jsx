"use client";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex flex-row justify-between w-full py-5 px-5 bg-neutral-800/50 border border-neutral-700 bg-neutral-800 text-neutral-100 ">
      <h1 className="text-2xl font-bold">Kanban Board</h1>
      <nav className="flex flex-row gap-5 justify-center items-center">
        <Link href={"/"}>Home</Link>
        <Link href={"/board"}>Board</Link>
        {localStorage.getItem("token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("token");
            }}
          >
            Logout
          </button>
        ) : (
          <Link href={"/login"}>Login</Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
