"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <Link href="/" className="nav-logo">
        Mz.<span>Awal's</span> Cosmetics
      </Link>
      <ul className={`nav-links ${menuOpen ? "open" : ""}`} id="navLinks">
        <li><Link href="#products">Shop</Link></li>
        <li><Link href="#ingredients">Ingredients</Link></li>
        <li><Link href="#story">Our Story</Link></li>
        <li><Link href="#shipping">Shipping</Link></li>
        <li><Link href="#contact">Contact</Link></li>
      </ul>
      <div className="nav-right">
        <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
          🛒 Cart <span className="cart-count" id="cartCount">{cartCount}</span>
        </button>
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
