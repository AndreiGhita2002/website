import React, { forwardRef } from "react";
import "../styles/dropZone.css";

export const DropZone = forwardRef<HTMLDivElement>((_, ref) => {
  return <div ref={ref} className="drop-zone" />;
});

DropZone.displayName = "DropZone";
