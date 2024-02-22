"use client";

import { FaFire } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import axios from "@/libs/axios";
import { useState } from "react";

export default function TrashBox({ setCards }) {
  const [active, setActive] = useState(false);
  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };
  const handleDragLeave = () => {
    setActive(false);
  };
  const handleDragEnd = async (e) => {
    const cardId = e.dataTransfer.getData("cardId");
    setActive(false);
    const formData = new FormData();
    formData.append("task_id", cardId);
    const { data } = await axios({
      method: "delete",
      url: "/board",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (data.status === 200) {
      setCards((prev) => prev.filter((c) => c.id !== cardId));
    }
  };
  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500 "
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
}
