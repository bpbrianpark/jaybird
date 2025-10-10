import Image from "next/image";
import { Mail } from "lucide-react";
import "./footer.css";

const Footer = () => {
    return (
      <footer className="footer-container">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-brand-header">
                <Image 
                  src="/jasonparkphotographylogo.png" 
                  alt="Jason Park Photography" 
                  width={32} 
                  height={32} 
                  className="footer-brand-logo"
                />
                <span className="footer-brand-name">
                  Jason Park
                </span>
              </div>
              <p className="footer-brand-description">
                Wildlife photographer with a keen eye for sky-high shots.
              </p>
            </div>

              <div className="footer-social">
                <h3 className="footer-social-title">Connect</h3>
                <div className="footer-social-items">
                  <div className="footer-social-item">
                    <Mail className="footer-social-icon" />
                    <span>jasonparkphotographyrec@gmail.com</span>
                  </div>
                </div>
              </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copyright">
              <p>&copy; 2025 Jason Park Photography. All rights reserved.</p>
              <p className="mt-1">Website by Brian Park (2025)</p>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  