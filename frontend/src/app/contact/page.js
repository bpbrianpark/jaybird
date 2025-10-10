import ContactForm from "../components/ContactForm";
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
              Whether you're interested in prints or have questions about our work, let us know!
            </p>
          </div>
        </section>

        <section className="contact-content-section">
          <div className="contact-content-container">
            <div className="contact-grid">
              <div className="contact-info">
                <div>
                  <h2 className="contact-info-title">
                    Let's Connect
                  </h2>
                </div>

                <div className="contact-info-items">
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="contact-info-content">
                      <h3>Email</h3>
                      <p>jasonparkphotographyrec@gmail.com</p>
                    </div>
                  </div>                                
                </div>
              </div>

              <div className="contact-form-container">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  