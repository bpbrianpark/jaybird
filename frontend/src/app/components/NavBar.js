import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  return (
    <nav className="bg-white text-orange p-4 flex justify-between items-center">
        <div className="flex items-center">
            <Image src="/jasonparklogo.svg" alt="Jason Park Photography" width={150} height={50} className="w-full h-25"/>
        </div>
      <div className="hidden md:flex items-center space-x-25">
        <Link href="/" className="text-lg hover:text-orange-500">Home</Link>
        <Link href="/portfolio" className="text-lg hover:text-orange-500">Portfolio</Link>
        <Link href="/dex" className="text-lg hover:text-orange-500">Dex</Link>
        <Link href="/contact" className="text-lg hover:text-orange-500">Contact</Link>
        <Link href="https://instagram.com" target="_blank">
          <Image src="/instagramlogo.svg" alt="Instagram" width={30} height={30} className="w-full h-full mr-2"/>
        </Link>
      </div>

      <button className="md:hidden text-3xl">☰</button>
    </nav>
  );
};

export default NavBar;
