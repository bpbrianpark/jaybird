import Link from "next/link";
import Image from "next/image";
import NavItem from "./NavItem";

const NavBar = () => {
  return (
    <nav className="bg-white text-orange p-4 flex justify-between items-center">
        <div className="flex items-center">
            <Image src="/jasonparklogo.svg" alt="Jason Park Photography" width={150} height={50} className="w-full h-22 object-contain min-w-[150px]"/>
        </div>
      <div className="hidden md:flex items-center space-x-15">
        <NavItem href="/" text="About" icon="/person.svg"/>
        <NavItem href="/portfolio" text="Portfolio" icon="/camera.svg"/>
        <NavItem href="/dex" text="WildDex" icon="/map.svg"/>
        <NavItem href="/contact" text="Contact" icon="/phone.svg"/>
        <div className="w-24 h-16 flex flex-col items-center justify-center rounded-lg hover:bg-gray-200 transition">  
          <Link href="https://www.instagram.com/jasonpark778/" className="flex flex-col items-center space-y-1">
          <Image src="/instagramlogo.svg" alt="Instagram" width={20} height={20} className="w-1/2 h-1/2 mr-2"/>
          <span className="text-sm">{"Instagram"}</span>
          </Link>
        </div> 
      </div>

      <button className="md:hidden text-3xl">☰</button>
    </nav>
  );
};

export default NavBar;
