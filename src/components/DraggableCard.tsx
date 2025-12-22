import "../styles/draggableCard.css";
import React, { useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

type DraggableCardProps = {
  title: string;
  children: React.ReactNode;
  dropZoneRef: React.RefObject<HTMLDivElement>;
  headerColor: string;
  bodyColor: string;
  defaultPosition: { x: number; y: number };
};

export function DraggableCard({
                                title,
                                children,
                                dropZoneRef,
                                headerColor,
                                bodyColor,
                                defaultPosition,
                              }: DraggableCardProps) {
  const [isOverZone, setIsOverZone] = useState(false);

  function handleDrag(_: DraggableEvent, data: DraggableData) {
    const zone = dropZoneRef.current;
    if (!zone) return;

    const zoneRect = zone.getBoundingClientRect();
    const cardRect = data.node.getBoundingClientRect();

    const inside =
      cardRect.left < zoneRect.right &&
      cardRect.right > zoneRect.left &&
      cardRect.top < zoneRect.bottom &&
      cardRect.bottom > zoneRect.top;

    setIsOverZone(inside);
  }

  return (
    <Draggable
      handle=".card-header"
      defaultPosition={defaultPosition}
      onDrag={handleDrag}
    >
      <div
        className={`card ${isOverZone ? "card--collapsed" : ""}`}
        style={{ backgroundColor: bodyColor }}
      >
        <div
          className="card-header"
          style={{ backgroundColor: headerColor }}
        >
          {title}
        </div>

        {!isOverZone && (
          <div className="card-body">
            {children}
          </div>
        )}
      </div>
    </Draggable>
  );
}
