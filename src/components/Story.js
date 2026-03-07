export default function Story() {
  return (
    <section id="story">
      <div className="blob story-blob1"></div>
      <div className="blob story-blob2"></div>
      <div className="story-inner">
        <div className="story-content">
          <span className="section-tag">Our Story</span>
          <h2 className="section-title">Simple skin solutions for real people.</h2>
          <p className="section-sub">
            Mz.Awal's Cosmetics was born out of one simple truth: great skin shouldn't be complicated or expensive. We believe every Gen Z skin deserves access to clean, effective, affordable skincare.
          </p>
          <div className="story-points">
            <div className="story-point">
              <div className="story-point-icon">🌿</div>
              <div className="story-point-text">
                <strong>Natural meets Clinical</strong>
                <span>Thoughtfully formulated with science-backed actives and skin-friendly ingredients.</span>
              </div>
            </div>
            <div className="story-point">
              <div className="story-point-icon">💸</div>
              <div className="story-point-text">
                <strong>Affordable Pricing</strong>
                <span>Premium-quality skincare at prices that don't break the bank. Because everyone deserves good skin.</span>
              </div>
            </div>
            <div className="story-point">
              <div className="story-point-icon">🌍</div>
              <div className="story-point-text">
                <strong>Global Reach</strong>
                <span>We ship worldwide so great skin has no borders. Wherever you are, we've got you.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="story-visual">
          <div className="story-card">
            <div className="story-card-num">10+</div>
            <div className="story-card-label">Curated Products</div>
          </div>
          <div className="story-card">
            <div className="story-card-num">🌍</div>
            <div className="story-card-label">International Shipping</div>
          </div>
          <div className="story-card">
            <div className="story-card-num">2</div>
            <div className="story-card-label">Star Active Ingredients</div>
          </div>
          <div className="story-card">
            <div className="story-card-num">Gen Z</div>
            <div className="story-card-label">Formulated for your skin era</div>
          </div>
        </div>
      </div>
    </section>
  );
}
