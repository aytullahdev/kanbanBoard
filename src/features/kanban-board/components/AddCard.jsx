import { useState } from "react";
import {} from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AddCard({ column, setCards }) {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim().length) return;
    const newCard = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
    };
    const formData = new FormData();
    formData.append("title", text.trim());
    formData.append("status", column);
    const { data } = await axios({
      method: "post",
      url: "/board",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (data.status === 201) {
      setCards((prev) => [...prev, newCard]);
      setAdding(false);
    }
  };
  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task.."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-2 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <spa>Add</spa>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => {
            setAdding(true);
          }}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add Card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
}
