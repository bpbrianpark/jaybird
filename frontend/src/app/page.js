import Image from "next/image";
import TypeWriter from "./components/Typewriter";
import PhotoCarousel from "./components/PhotoCarousel";

export default function Home() {
  return (
    <div style={{ textAlign: "left"}}>
      <TypeWriter />
      <div 
        style={{
          maxWidth: "706px",
          borderRadius: "10px",
        }}
      >
        <p style={{ fontSize: "18px", lineHeight: "1.5" }}>
          Jason Park is a nature photographer with a natural .
        </p>
      </div>
      <PhotoCarousel />
    </div>
  );
}
