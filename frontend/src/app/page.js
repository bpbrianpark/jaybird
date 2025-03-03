import Image from "next/image";
import TypeWriter from "./components/Typewriter";
import PhotoCarousel from "./components/PhotoCarousel";

export default function Home() {
  return (
    <div style={{ textAlign: "left"}}>
      <div className="flex items-left justify-between w-full max-w-full mx-auto mt-5">
        <div className="flex-1">
      <TypeWriter />
      </div>
      <div className="px-10">
      <div className="w-[250px] h-[250px] flex items-right justify-center border-4 border-orange-500 rounded-full shadow-lg overflow-hidden">
          <Image
            src="/frontpageimage/hummingbird2.png"
            alt="Logo"
            width={250}
            height={250}
            className="rounded-full"
          />
        </div>
      </div>
      </div>
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
