"use client";

import { useEffect, useState } from "react";

const fallbackReviews = [
  {
    id: "fallback-1",
    author: "Akosua M.",
    rating: 5,
    content: "The Azelaic Serum completely cleared my hyperpigmentation. I've been using it for 3 weeks and the results are amazing!",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "fallback-2",
    author: "David O.",
    rating: 5,
    content: "Best sunscreen I've ever used. Doesn't leave a white cast and feels so light on my skin. Highly recommend!",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "fallback-3",
    author: "Sarah T.",
    rating: 4,
    content: "I love the Hydra Cleanser. It's gentle and doesn't strip my skin. The packaging is also super cute.",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "fallback-4",
    author: "Emmanuel K.",
    rating: 5,
    content: "Great prices for high-quality products. Delivery was also very fast. Mz.Awal's is my new go-to for skincare.",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }
  const months = Math.floor(diffDays / 30);
  return `${months} month${months > 1 ? "s" : ""} ago`;
}

export default function Reviews() {
  const [reviews, setReviews] = useState(fallbackReviews);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setReviews(data);
        }
      })
      .catch(() => {
        // Keep fallback reviews on error
      });
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  if (reviews.length === 0) return null;

  const current = reviews[currentIndex];

  return (
    <section id="reviews" style={{ backgroundColor: "var(--blush)", padding: "88px 5%", position: "relative", overflow: "hidden" }}>
      <div className="blob" style={{ background: "var(--lavender)", width: "300px", height: "300px", top: "-50px", left: "-50px" }}></div>
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <span className="section-tag" style={{ background: "rgba(255,255,255,0.4)" }}>Customer Love</span>
        <h2 className="section-title">What our community says</h2>
        
        <div style={{ maxWidth: "600px", margin: "40px auto", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(10px)", padding: "40px", borderRadius: "var(--r)", boxShadow: "var(--cs)" }}>
          <div style={{ fontSize: "2rem", color: "var(--terracotta)", marginBottom: "15px" }}>
            {"★".repeat(current.rating)}
            <span style={{ color: "rgba(0,0,0,0.1)" }}>{"★".repeat(5 - current.rating)}</span>
          </div>
          <p style={{ fontSize: "1.1rem", fontStyle: "italic", lineHeight: "1.6", marginBottom: "20px", minHeight: "80px" }}>
            &ldquo;{current.content}&rdquo;
          </p>
          <div>
            <strong style={{ display: "block", fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "var(--charcoal)" }}>
              {current.author}
            </strong>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              {timeAgo(current.createdAt)}
            </span>
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
