import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Jason Park Photography</h1>
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/portfolio">Portfolio</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default NavBar;
