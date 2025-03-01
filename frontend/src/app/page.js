import Image from "next/image";
import TypeWriter from "./components/Typewriter";
import PhotoCarousel from "./components/PhotoCarousel";

export default function Home() {
  return (
    <div style={{ textAlign: "left"}}>
      <TypeWriter />
      <div 
        style={{
          maxWidth: "1200px",
          borderRadius: "10px",
        }}
      >
        <p style={{ fontSize: "20px", lineHeight: "1.5", margin: "50px"}}>
          Jason Park is a photographer who can capture the perfect moment in a single snapshot. 
          With everything from eagles soaring through the sky to bears hunting for their next meal, he's always on the hunt for the perfect shot.

        </p>
      </div>
      <PhotoCarousel />
    </div>
  );
}
