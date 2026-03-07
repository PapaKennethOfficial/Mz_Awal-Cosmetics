"use client";

import { useEffect, useState } from "react";

const reviews = [
  {
    id: 1,
    name: "Akosua M.",
    rating: 5,
    text: "The Azelaic Serum completely cleared my hyperpigmentation. I've been using it for 3 weeks and the results are amazing!",
    date: "1 week ago",
  },
  {
    id: 2,
    name: "David O.",
    rating: 5,
    text: "Best sunscreen I've ever used. Doesn't leave a white cast and feels so light on my skin. Highly recommend!",
    date: "2 weeks ago",
  },
  {
    id: 3,
    name: "Sarah T.",
    rating: 4,
    text: "I love the Hydra Cleanser. It's gentle and doesn't strip my skin. The packaging is also super cute.",
    date: "1 month ago",
  },
  {
    id: 4,
    name: "Emmanuel K.",
    rating: 5,
    text: "Great prices for high-quality products. Delivery was also very fast. Mz.Awal's is my new go-to for skincare.",
    date: "2 months ago",
  }
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="reviews" style={{ backgroundColor: "var(--blush)", padding: "88px 5%", position: "relative", overflow: "hidden" }}>
      <div className="blob" style={{ background: "var(--lavender)", width: "300px", height: "300px", top: "-50px", left: "-50px" }}></div>
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <span className="section-tag" style={{ background: "rgba(255,255,255,0.4)" }}>Customer Love</span>
        <h2 className="section-title">What our community says</h2>
        
        <div style={{ maxWidth: "600px", margin: "40px auto", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(10px)", padding: "40px", borderRadius: "var(--r)", boxShadow: "var(--cs)" }}>
          <div style={{ fontSize: "2rem", color: "var(--terracotta)", marginBottom: "15px" }}>
            {"★".repeat(reviews[currentIndex].rating)}
            <span style={{ color: "rgba(0,0,0,0.1)" }}>{"★".repeat(5 - reviews[currentIndex].rating)}</span>
          </div>
          <p style={{ fontSize: "1.1rem", fontStyle: "italic", lineHeight: "1.6", marginBottom: "20px", minHeight: "80px" }}>
            "{reviews[currentIndex].text}"
          </p>
          <div>
            <strong style={{ display: "block", fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "var(--charcoal)" }}>
              {reviews[currentIndex].name}
            </strong>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{reviews[currentIndex].date}</span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: currentIndex === idx ? "var(--terracotta)" : "rgba(255,255,255,0.6)",
                border: "none",
                cursor: "pointer",
                transition: "background 0.3s"
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
