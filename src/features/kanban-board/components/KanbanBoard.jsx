"use client";
import { use, useEffect, useState } from "react";
import { FaFire } from "react-icons/fa";
import { FiTrash, FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";

import axios from "@/libs/axios";
export default function KanbanBoard() {
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <Board />
    </div>
  );
}

export function Board() {
  const [cards, setCards] = useState([]);
  // Queries
  // const query = useQuery({
  //   queryKey: ["todos"],
  //   queryFn: axios
  //     .get("/board", {
  //       headers: {
  //         Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImF5YXRAZ21haWwuY29tIiwiaWF0IjoxNzA4NTE0ODc3fQ.wO4NRIk5Tv1Gs4LJ_C_KOUF4Fh9MQNyGozVXQIKsMbo`,
  //       },
  //     })
  //     .then((res) => res.data),
  //   retry: 1,
  // });

  useEffect(() => {
    // annonomus async function
    (async () => {
      await axios
        .get("/board", {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImF5YXRAZ21haWwuY29tIiwiaWF0IjoxNzA4NTE0ODc3fQ.wO4NRIk5Tv1Gs4LJ_C_KOUF4Fh9MQNyGozVXQIKsMbo`,
          },
        })
        .then((res) => {
          setCards(
            res.data.tasks.map((t) => ({
              ...t,
              id: String(t.task_id),
              column: t.status,
            }))
          );
        });
    })();
  }, []);

  return (
    <>
      {cards.length <= 0 ? (
        <div>Loading...</div>
      ) : (
        <div className="flex h-full w-full gap-5 overflow-scroll p-12">
          <Column
            title="Backlog"
            column="backlog"
            headingColor="text-neutral-500"
            cards={cards}
            setCards={setCards}
          />
          <Column
            title="Todo"
            column="todo"
            headingColor="text-yellow-200"
            cards={cards}
            setCards={setCards}
          />
          <Column
            title="In progress"
            column="doing"
            headingColor="text-blue-w00"
            cards={cards}
            setCards={setCards}
          />
          <Column
            title="Complete"
            column="done"
            headingColor="text-emerald-200"
            cards={cards}
            setCards={setCards}
          />
          <TrashBox setCards={setCards} />
        </div>
      )}
    </>
  );
}

export function Column({ title, column, headingColor, cards, setCards }) {
  const [active, setActive] = useState(false);
  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };
  const highlightIndicator = (e) => {
    const indicators = getIndicators();
    clearHightLights(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };
  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };
  const clearHightLights = (els) => {
    const indicators = els || getIndicators();
    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
    return el;
  };
  const handleDragLeave = () => {
    setActive(false);
    clearHightLights();
  };
  const handleDragEnd = async (e) => {
    setActive(false);
    clearHightLights();

    // How it's working
    const cardId = e.dataTransfer.getData("cardId");
    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);
    const before = element.dataset.before || "-1";
    if (before !== cardId) {
      let copy = [...cards];
      let cardTotransfer = copy.find((c) => c.id === cardId);
      if (!cardTotransfer) return;
      cardTotransfer = { ...cardTotransfer, column };
      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";
      if (moveToBack) {
        copy.push(cardTotransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;
        copy.splice(insertAtIndex, 0, cardTotransfer);
      }
      setCards(copy);
      const formData = new FormData();
      formData.append("task_id", cardId);
      formData.append("status", column);
      formData.append("title", cardTotransfer.title);
      const { data } = await axios({
        method: "put",
        url: "/board",
        data: formData,
      });
      if (data.status == 200) {
        console.log("Task moved");
      }
    }
  };
  const filterCards = cards.filter((c) => c.column === column);
  return (
    <div className="w-56 shrink-0">
      <div className="flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filterCards?.length}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`h-full  w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filterCards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={-1} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
}

export function Card({ title, id, column, handleDragStart }) {
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
function AddCard({ column, setCards }) {
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
function DropIndicator({ beforeId, column }) {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    ></div>
  );
}
function TrashBox({ setCards }) {
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
