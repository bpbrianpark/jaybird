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
            <NavItem href="/" text="About" icon="/person.svg"/>
            <NavItem href="/portfolio" text="Portfolio" icon="/camera.svg"/>
            <NavItem href="/contact" text="Contact" icon="/phone.svg"/>

            <Link 
              href="https://www.instagram.com/jasonpark778/" 
              target="_blank"
              rel="noopener noreferrer"
              className="nav-item"
            >
              <Image 
                src="/instagramlogo.svg" 
                alt="Instagram" 
                width={20} 
                height={20} 
                className="nav-item-icon"
              />
              <span className="nav-item-text">
                Instagram
              </span>
            </Link>
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
              <NavItem href="/" text="About" icon="/person.svg"/>
              <NavItem href="/portfolio" text="Portfolio" icon="/camera.svg"/>
              <NavItem href="/contact" text="Contact" icon="/phone.svg"/>
              <Link 
                href="https://www.instagram.com/jasonpark778/" 
                target="_blank"
                rel="noopener noreferrer"
                className="nav-item"
              >
                <Image 
                  src="/instagramlogo.svg" 
                  alt="Instagram" 
                  width={20} 
                  height={20} 
                  className="nav-item-icon"
                />
                <span className="nav-item-text">
                  Instagram
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
