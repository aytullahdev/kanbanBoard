"use client";
import { useEffect, useState } from "react";
import axios from "@/libs/axios";
import Column from "./Column";
import TrashBox from "./TrashBox";

export default function KanbanBoard() {
  return (
    <div className="w-full bg-neutral-900 text-neutral-50">
      <Board />
    </div>
  );
}

export function Board() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // annonomus async function
    try {
      (async () => {
        await axios.get("/board").then((res) => {
          setLoading(false);
          setCards(
            res.data.tasks.map((t) => ({
              ...t,
              id: String(t.task_id),
              column: t.status,
            }))
          );
        });
      })();
    } catch (error) {
      console.log("Unable to fetch data from the server.");
    }
  }, []);

  return (
    <>
      {loading ? (
        <div className="py-20 text-center">Loading...</div>
      ) : (
        <div className="flex  w-full gap-5 overflow-scroll p-12">
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
