"use client";
import { useEffect } from "react";

export default function ImageProtection() {
  useEffect(() => {
    const handleContextMenu = (e) => {
      if (
        e.target.tagName === "IMG" ||
        e.target.tagName === "VIDEO" ||
        e.target.closest("img") ||
        e.target.closest("video")
      ) {
        e.preventDefault();
        return false;
      }
    };

    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        return false;
      }

      if (e.key === "PrintScreen") {
        e.preventDefault();
        return false;
      }
    };

    const handleDragStart = (e) => {
      if (
        e.target.tagName === "IMG" ||
        e.target.tagName === "VIDEO" ||
        e.target.closest("img") ||
        e.target.closest("video")
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return null;
}

