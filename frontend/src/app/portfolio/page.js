import Gallery from "../components/Gallery";
import FadeInOnScroll from "../components/FadeInOnScroll";
import "../portfolio-page.css";

export default function Portfolio() {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <FadeInOnScroll direction="up" delay={0.2}>
          <section className="portfolio-hero">
            <div className="portfolio-hero-container">
              <h1 className="portfolio-hero-title">
                Portfolio
              </h1>
              <p className="portfolio-hero-description">
                Explore a curated collection of Jason&apos;s photos from gorgeous landscapes to the breathtaking wildlife of North America.
              </p>
            </div>
          </section>
        </FadeInOnScroll>

        <FadeInOnScroll direction="up" delay={0.4}>
          <section className="portfolio-gallery-section">
            <div className="portfolio-gallery-container">
              <Gallery />
            </div>
          </section>
        </FadeInOnScroll>
      </div>
    );
  }
  