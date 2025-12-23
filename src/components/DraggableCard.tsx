import "../styles/draggableCard.css";
import React, {useRef, useState} from "react";
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
  const headerRef = useRef<HTMLDivElement>(null);

  function handleDrag(_: DraggableEvent, data: DraggableData) {
    const zone = dropZoneRef.current;
    const headerZone = headerRef.current;
    if (!zone || !headerZone) return;

    const zoneRect = zone.getBoundingClientRect();
    const cardHeaderRect = headerZone.getBoundingClientRect();

    const inside =
      cardHeaderRect.left < zoneRect.right &&
      cardHeaderRect.right > zoneRect.left &&
      cardHeaderRect.top < zoneRect.bottom &&
      cardHeaderRect.bottom > zoneRect.top;

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
          ref={headerRef}
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
