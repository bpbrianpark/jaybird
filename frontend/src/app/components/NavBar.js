import Link from "next/link";
import Image from "next/image";
import NavItem from "./NavItem";

const NavBar = () => {
  return (
    <nav className="bg-white text-orange p-4 flex justify-between items-center">
        <div className="flex items-center">
            <Image src="/jasonparklogo.svg" alt="Jason Park Photography" width={150} height={50} className="w-full h-22 object-contain min-w-[150px]"/>
        </div>
      <div className="hidden md:flex items-center space-x-25">
        <NavItem href="/" text="About" icon="/person.svg"/>
        <NavItem href="/portfolio" text="Portfolio" icon="/camera.svg"/>
        <NavItem href="/dex" text="WildDex" icon="/map.svg"/>
        <NavItem href="/contact" text="Contact" icon="/phone.svg"/>
        <Link href="https://www.instagram.com/jasonpark778/" target="_blank">
          <Image src="/instagramlogo.svg" alt="Instagram" width={30} height={30} className="w-full h-full mr-2"/>
        </Link>
      </div>

      <button className="md:hidden text-3xl">☰</button>
    </nav>
  );
};

export default NavBar;
