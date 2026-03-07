import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <span className="footer-brand-logo">
            Mz.<span>Awal's</span> Cosmetics
          </span>
          <p className="footer-desc">
            Simple and affordable skin solutions for Gen Z. Because great skin belongs to everyone, everywhere.
          </p>
          <div className="pay-badges">
            <span className="pay-badge">MTN MoMo</span>
            <span className="pay-badge">Telecel Cash</span>
            <span className="pay-badge">AirtelTigo</span>
            <span className="pay-badge">Visa / Mastercard</span>
          </div>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <ul className="footer-links">
            <li><Link href="#products">All Products</Link></li>
            <li><Link href="#products">Cleanse</Link></li>
            <li><Link href="#products">Treat</Link></li>
            <li><Link href="#products">Sun Protection</Link></li>
            <li><Link href="#products">Body Care</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Help</h4>
          <ul className="footer-links">
            <li><Link href="#shipping">Shipping Info</Link></li>
            <li><Link href="#contact">Contact Us</Link></li>
            <li><Link href="#shipping">Track Order</Link></li>
            <li><Link href="#">Returns</Link></li>
            <li><Link href="#">FAQ</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Brand</h4>
          <ul className="footer-links">
            <li><Link href="#story">Our Story</Link></li>
            <li><Link href="#ingredients">Ingredients</Link></li>
            <li><Link href="#">Sustainability</Link></li>
            <li><Link href="#">Press</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Mz.Awal's Cosmetics. All rights reserved. | hello@mzawal.com</p>
        <div className="social-links">
          <Link className="social-link" href="#" aria-label="Instagram">📸</Link>
          <Link className="social-link" href="#" aria-label="TikTok">🎵</Link>
          <Link className="social-link" href="#" aria-label="Twitter">🐦</Link>
          <Link className="social-link" href="#" aria-label="WhatsApp">💬</Link>
        </div>
      </div>
    </footer>
  );
}
