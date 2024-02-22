import { useState } from "react";
import axios from "@/libs/axios";
import Card from "./Card";
import AddCard from "./AddCard";
import DropIndicator from "./DropIndicator";

export default function Column({
  title,
  column,
  headingColor,
  cards,
  setCards,
}) {
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
