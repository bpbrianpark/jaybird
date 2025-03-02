"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "owl.png",
  "photo2.jpg",
  "photo3.jpg",
  "photo4.jpg",
  "photo5.jpg"
];

export default function PhotoCarousel() {
  const [index, setIndex] = useState(0);

  const prevImage = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative flex flex-col items-center w-full">
      <div className="relative w-full max-w-full h-[700px] flex justify-center items-center overflow-hidden">
        {images.map((img, i) => {
          let position = "translate-x-full opacity-0 scale-90";
          if (i === index) position = "translate-x-0 opacity-100 scale-100 z-10";
          else if (i === (index - 1 + images.length) % images.length)
            position = "-translate-x-32 opacity-80 scale-90 z-0";
          else if (i === (index + 1) % images.length)
            position = "translate-x-32 opacity-80 scale-90 z-0";
          else if (i == (index - 2 + images.length) % images.length)
            position = "-translate-x-64 opacity-20 scale-90 z-0";
          else if (i == (index + 2) % images.length)
            position = "translate-x-64 opacity-20 scale-90 z-0";

          return (
            <motion.img
              key={i}
              src={img}
              className={`absolute w-55/100 h-9/10 object-cover transition-all duration-500 ease-in-out rounded-2xl ${position}`}
            />
          );
        })}
      </div>
      <div className="flex items-center gap-30">
        <button
          onClick={prevImage}
          className="p-1 bg-[#ef983f] rounded-full text-white hover:bg-orange-600"
        >
          <ChevronLeft />
        </button>
        <span className="text-lg font-regular text-[#ef983f] font-size-100">Gallery</span>
        <button
          onClick={nextImage}
          className="p-1 bg-[#ef983f] rounded-full text-white hover:bg-orange-600"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}