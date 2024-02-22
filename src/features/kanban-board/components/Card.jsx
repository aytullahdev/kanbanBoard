import { motion } from "framer-motion";
import DropIndicator from "./DropIndicator";

export default function Card({ title, id, column, handleDragStart }) {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layoutId={id}
        layout
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        draggable={true}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing "
      >
        <p className="text-sm text-neutral-100">{title} </p>
      </motion.div>
    </>
  );
}
