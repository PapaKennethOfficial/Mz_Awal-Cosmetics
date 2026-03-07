export default function Hero() {
  return (
    <>
      <section id="hero">
        <div className="blob hero-blob1"></div>
        <div className="blob hero-blob2"></div>
        <div className="blob hero-blob3"></div>
        <div className="hero-content">
          <div className="hero-badge">Simple &amp; Affordable Skin Solutions</div>
          <h1 className="hero-title">
            Your skin,<br />
            <em>simplified</em> &amp;<br />
            radiant.
          </h1>
          <p className="hero-sub">
            Science-backed skincare crafted for Gen Z skin. Azelaic acid for brighter skin, broad-spectrum SPF for daily protection — all at prices that make sense.
          </p>
          <div className="hero-ctas">
            <a href="#products" className="btn-primary">Shop Collection ↓</a>
            <a href="#story" className="btn-outline">Our Story</a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">10+</span>
              <span className="stat-label">Curated Products</span>
            </div>
            <div className="stat">
              <span className="stat-num">🌍</span>
              <span className="stat-label">Ships Worldwide</span>
            </div>
            <div className="stat">
              <span className="stat-num">Gen Z</span>
              <span className="stat-label">Formulated For You</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=120&q=80" alt="Serum" />
            <div className="hero-card-name">Azelaic Serum</div>
            <div className="hero-card-sub">Hyperpigmentation</div>
          </div>
          <div className="hero-card">
            <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=120&q=80" alt="Sunscreen" />
            <div className="hero-card-name">SPF 50 Shield</div>
            <div className="hero-card-sub">UV Protection</div>
          </div>
          <div className="hero-card">
            <img src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=120&q=80" alt="Cleanser" />
            <div className="hero-card-name">Hydra Cleanser</div>
            <div className="hero-card-sub">Gentle Formula</div>
          </div>
          <div className="hero-card">
            <img src="https://images.unsplash.com/photo-1631390285697-f8701ea08571?w=120&q=80" alt="Toner" />
            <div className="hero-card-name">Glow Toner</div>
            <div className="hero-card-sub">Balances &amp; Brightens</div>
          </div>
        </div>
      </section>

      <div className="marquee-wrap" aria-hidden="true">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <span key={i}>
              <span className="marquee-item">Azelaic Acid</span>
              <span className="marquee-item">SPF50 Protection</span>
              <span className="marquee-item">Clean Formulas</span>
              <span className="marquee-item">Gen Z Skincare</span>
              <span className="marquee-item">Hyperpigmentation</span>
              <span className="marquee-item">Ships Worldwide</span>
              <span className="marquee-item">MTN MoMo · Telecel Cash · AirtelTigo</span>
              <span className="marquee-item">Mz.Awal's Cosmetics</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
