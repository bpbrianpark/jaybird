import Gallery from "../components/Gallery";
import "../portfolio-page.css";

export default function Portfolio() {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <section className="portfolio-hero">
          <div className="portfolio-hero-container">
            <h1 className="portfolio-hero-title">
              Portfolio
            </h1>
            <p className="portfolio-hero-description">
              Explore a curated collection of Jason's photos from gorgeous landscapes to the breathtaking wildlife of North America.
            </p>
          </div>
        </section>

        <section className="portfolio-gallery-section">
          <div className="portfolio-gallery-container">
            <Gallery />
          </div>
        </section>
      </div>
    );
  }
  