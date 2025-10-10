"use client"
import Link from "next/link";
import Image from "next/image";
import NavItem from "./NavItem";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import "./navbar.css";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="nav-container">
      <div className="nav-inner">
        <div className="nav-content">
          <div className="nav-logo">
            <Link href="/" className="nav-logo-link">
              <Image 
                src="/jasonparkphotographylogo.png" 
                alt="Jason Park Photography" 
                width={200} 
                height={200} 
                className="nav-logo-image"
              />
            </Link>
          </div>

          <div className="nav-desktop">
            <NavItem href="/" text="About" iconType="user"/>
            <NavItem href="/portfolio" text="Portfolio" iconType="camera"/>
            <NavItem href="/contact" text="Contact" iconType="phone"/>
            <NavItem href="https://www.instagram.com/jasonpark778/" text="Instagram" iconType="instagram"/>
          </div>

          <button 
            className="nav-mobile-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="nav-mobile-icon" />
            ) : (
              <Menu className="nav-mobile-icon" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="nav-mobile-menu">
            <div className="nav-mobile-content">
              <NavItem href="/" text="About" iconType="user"/>
              <NavItem href="/portfolio" text="Portfolio" iconType="camera"/>
              <NavItem href="/contact" text="Contact" iconType="phone"/>
              <NavItem href="https://www.instagram.com/jasonpark778/" text="Instagram" iconType="instagram"/>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
