"use client";
import { useEffect } from "react";

export default function ImageProtection() {
  useEffect(() => {
    // Prevent right-click context menu on images and videos
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

    // Prevent keyboard shortcuts (Ctrl+S, Ctrl+Shift+I, F12, etc.)
    const handleKeyDown = (e) => {
      // Prevent Save (Ctrl+S or Cmd+S)
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        return false;
      }
      // Prevent Print Screen (though this is harder to prevent completely)
      if (e.key === "PrintScreen") {
        e.preventDefault();
        return false;
      }
    };

    // Prevent drag and drop of images
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

    // Add event listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("dragstart", handleDragStart);

    // Cleanup
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return null;
}

