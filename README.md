# Kanban Board

# Tailwind classes for color combination

```
column: active-> bg-neutral-800/50 else-> bg-neutral-800/0
card -> border-neutral-700 bg-neutral-800 text-neutral-100
textarea -> border-violet-400 bg-violet-400/20 text-neutral-50 placeholder-violet-300
fire -> border-red-800 bg-red-800/20 text-red-500
trash -> border-neutral-500 bg-neutral-500/20 text-neutral-500

** to color change use transition-colors
** use motion.div layout and layoutId={unique} for animation

# Main Logic
```

```
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
 const handleDragEnd = (e) => {
   setActive(false);
   clearHightLights();


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
   }
 };
```

Drop Indicator

````
  function DropIndicator({ beforeId, column }) {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    ></div>
  );
}

{filterCards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
<DropIndicator beforeId={-1} column={column} />
        ```
````

\*\* Trash Box

```
const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };
  const handleDragLeave = () => {
    setActive(false);
  };
  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");
    console.log(cardId);
    setActive(false);
    setCards((prev) => prev.filter((c) => c.id !== cardId));
  };
```
