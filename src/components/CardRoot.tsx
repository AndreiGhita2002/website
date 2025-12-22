import React, { useRef } from "react";
import { DraggableCard } from "./DraggableCard";
import { DropZone } from "./DropZone";
import "../styles/cardRoot.css";

export function CardRoot() {
  const dropZoneRef = useRef<HTMLDivElement>(null);

  return (
    <div className="card-root">
      <DropZone ref={dropZoneRef} />

      <DraggableCard
        title="Card One"
        dropZoneRef={dropZoneRef}
        headerColor="#377771"
        bodyColor="#4CE0B3"
        defaultPosition={{ x: 80, y: 60 }}
      >
        This is the first card
      </DraggableCard>

      <DraggableCard
        title="Card Two"
        dropZoneRef={dropZoneRef}
        headerColor="#FF8E72"
        bodyColor="#FFAF87"
        defaultPosition={{ x: 360, y: 90 }}
      >
        This is the second card
      </DraggableCard>
    </div>
  );
}
