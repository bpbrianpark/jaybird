import ContactForm from "../components/ContactForm";
import { Mail } from "lucide-react";
import "../contact-page.css";

export default function Contact() {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <section className="contact-hero">
          <div className="contact-hero-container">
            <h1 className="contact-hero-title">
              Get In Touch
            </h1>
            <p className="contact-hero-description">
              Whether you&apos;re interested in prints or have questions about our work, let us know!
            </p>
          </div>
        </section>

        <section className="contact-content-section">
          <div className="contact-content-container">
            <div className="contact-grid">
              <div className="contact-info">
                <div>
                  <h2 className="contact-info-title">
                    Let&apos;s Connect!
                  </h2>
                </div>

                <div className="contact-info-items">
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <Mail />
                    </div>
                    <div className="contact-info-content">
                      <h3>Email</h3>
                      <p>jasonparkphotographyrec@gmail.com</p>
                    </div>
                  </div>                                
                </div>
              </div>

              <div className="contact-form-container-outer">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  