import Link from "next/link";
import { User, Camera, Phone, Instagram } from "lucide-react";
import "./nav-item.css";

const NavItem = ({href, text, iconType}) => {
    const getIcon = () => {
        switch(iconType) {
            case 'user':
                return <User className="nav-item-icon" />;
            case 'camera':
                return <Camera className="nav-item-icon" />;
            case 'phone':
                return <Phone className="nav-item-icon" />;
            case 'instagram':
                return <Instagram className="nav-item-icon" />;
            default:
                return <User className="nav-item-icon" />;
        }
    };

    return (
        <Link 
            href={href} 
            className="nav-item"
        >
            {getIcon()}
            <span className="nav-item-text">
                {text}
            </span>
        </Link>
    );
};

export default NavItem;