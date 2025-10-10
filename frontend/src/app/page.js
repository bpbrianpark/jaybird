import Image from "next/image";
import TypeWriter from "./components/Typewriter";
import PhotoCarousel from "./components/PhotoCarousel";
import FadeInOnScroll from "./components/FadeInOnScroll";
import "./home-page.css";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="home-hero-section">
        <div className="home-hero-background"></div>
        
        <div className="home-hero-content">
          <div className="home-hero-grid">
            <FadeInOnScroll direction="left" delay={0.2}>
              <div className="home-hero-text-content">
                <div className="home-hero-title-section">
                  <h1 className="home-hero-title">
                    <TypeWriter />
                  </h1>
                  <p className="home-hero-subtitle">
                    Jason Park is a photographer who can capture the perfect moment in a single snapshot. 
                    With everything from eagles soaring through the sky to bears hunting for their next meal, 
                    he&apos;s always on the hunt for the perfect shot.
                  </p>
                </div>
                
                <div className="home-hero-cta-buttons">
                  <a 
                    href="/portfolio" 
                    className="home-cta-button-primary"
                  >
                    View Portfolio
                  </a>
                  <a 
                    href="/contact" 
                    className="home-cta-button-secondary"
                  >
                    Get In Touch
                  </a>
                </div>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll direction="right" delay={0.4}>
              <div className="home-hero-image-container">
                <div className="home-hero-image-wrapper">
                  <div className="home-hero-image-glow"></div>
                  <div className="home-hero-image">
                    <Image
                      src="/frontpageimage/hummingbird2.png"
                      alt="Jason Park - Wildlife Photographer"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      <FadeInOnScroll direction="up" delay={0.2}>
        <section className="home-featured-section">
          <div className="home-featured-container">
            <PhotoCarousel />
          </div>
        </section>
      </FadeInOnScroll>

      <FadeInOnScroll direction="up" delay={0.2}>
        <section className="home-about-section">
          <div className="home-about-container">
            <h2 className="home-about-title">
              About Jason Park
            </h2>
            <div className="home-about-content">
              <p>
                With over 40 years of experience in photography, Jason Park has been a master of his craft,
                able to capture the perfect moment in a single snapshot.
              </p>
            </div>
          </div>
        </section>
      </FadeInOnScroll>
    </div>
  );
}
