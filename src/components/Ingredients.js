export default function Ingredients() {
  return (
    <section id="ingredients">
      <div className="blob ingr-blob"></div>
      <span className="section-tag">Star Ingredients</span>
      <h2 className="section-title">
        Science that<br />
        actually works
      </h2>
      <p className="section-sub">
        Every Mz.Awal's formula is built around hero actives chosen for real, visible results — no fluff, just skin science.
      </p>
      <div className="ingr-grid">
        <div className="ingr-card">
          <div className="ingr-icon">🔬</div>
          <div className="ingr-name">Azelaic Acid</div>
          <div className="ingr-benefit">For Hyperpigmentation</div>
          <div className="ingr-desc">
            A dermatologist-favourite acid that targets dark spots, uneven skin tone, and post-acne marks — revealing a brighter, more even complexion with consistent use.
          </div>
        </div>
        <div className="ingr-card">
          <div className="ingr-icon">☀️</div>
          <div className="ingr-name">Broad-Spectrum Sunscreen</div>
          <div className="ingr-benefit">UV Protection</div>
          <div className="ingr-desc">
            Your daily non-negotiable. Our SPF formulas guard against UVA &amp; UVB rays, prevent photoaging, and protect your skin's progress from fading in the sun.
          </div>
        </div>
      </div>
    </section>
  );
}
