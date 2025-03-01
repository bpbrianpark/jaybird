import Link from "next/link";
import Image from "next/image";

const NavItem = ({href, text, icon}) => (
    <div className="w-24 h-16 flex flex-col items-center justify-center rounded-lg hover:bg-gray-200 transition">  
        <Link href={href} className="flex flex-col items-center space-y-1">
            <Image src={icon} alt={text} width={24} height={24}></Image>
            <span className="text-sm">{text}</span>
        </Link>
    </div> 
);

export default NavItem;