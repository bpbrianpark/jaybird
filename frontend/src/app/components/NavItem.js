import Link from "next/link";
import Image from "next/image";
import "./nav-item.css";

const NavItem = ({href, text, icon}) => (
    <Link 
        href={href} 
        className="nav-item"
    >
        <Image 
            src={icon} 
            alt={text} 
            width={20} 
            height={20} 
            className="nav-item-icon"
        />
        <span className="nav-item-text">
            {text}
        </span>
    </Link>
);

export default NavItem;