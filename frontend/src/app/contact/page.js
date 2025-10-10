import ContactForm from "../components/ContactForm";
import { Mail } from "lucide-react";
import FadeInOnScroll from "../components/FadeInOnScroll";
import "../contact-page.css";

export default function Contact() {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <FadeInOnScroll direction="up" delay={0.2}>
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
        </FadeInOnScroll>

        <FadeInOnScroll direction="up" delay={0.4}>
          <section className="contact-content-section">
            <div className="contact-content-container">
              <div className="contact-grid">
                <FadeInOnScroll direction="left" delay={0.6}>
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
                </FadeInOnScroll>

                <FadeInOnScroll direction="right" delay={0.8}>
                  <div className="contact-form-container-outer">
                    <ContactForm />
                  </div>
                </FadeInOnScroll>
              </div>
            </div>
          </section>
        </FadeInOnScroll>
      </div>
    );
  }
  