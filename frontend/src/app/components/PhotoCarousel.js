"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import Image from "next/image";
import "./photo-carousel.css";

const images = [
  { src: "/frontpageimage/redbird.jpg", alt: "Red Bird in Natural Habitat" },
  { src: "/frontpageimage/greatblueheron.jpg", alt: "Great Blue Heron by the Water" },
  { src: "/frontpageimage/lazulibunting.jpg", alt: "Lazuli Bunting in Flight" },
  { src: "/frontpageimage/yellowbird.jpg", alt: "Yellow Bird Perched on Branch" },
  { src: "/frontpageimage/bird.jpg", alt: "Wild Bird in Natural Environment" }
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
    <div className="carousel-container">
      <div className="carousel-main-display">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="carousel-image"
          >
            <Image
              src={images[index].src}
              alt={images[index].alt}
              fill
              className="object-cover"
              priority
            />
            <div className="carousel-overlay" />
          </motion.div>
        </AnimatePresence>

        <div className="carousel-navigation">
          <button
            onClick={prevImage}
            className="carousel-nav-button"
            aria-label="Previous image"
          >
            <ChevronLeft className="carousel-nav-icon" />
          </button>
          
          <button
            onClick={nextImage}
            className="carousel-nav-button"
            aria-label="Next image"
          >
            <ChevronRight className="carousel-nav-icon" />
          </button>
        </div>
      </div>

      <div className="carousel-thumbnails">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`carousel-thumbnail ${i === index ? 'active' : ''}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
            />
            {i === index && (
              <div className="carousel-thumbnail-overlay" />
            )}
          </button>
        ))}
      </div>

      <div className="carousel-counter">
        <span className="carousel-counter-text">
          {index + 1} of {images.length}
        </span>
      </div>
    </div>
  );
}