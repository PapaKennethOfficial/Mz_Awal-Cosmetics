"use client";

import { useState } from "react";

export default function Shipping() {
  const [trackNumber, setTrackNumber] = useState("");
  const [trackResult, setTrackResult] = useState(null);
  const [trackError, setTrackError] = useState("");
  const [trackLoading, setTrackLoading] = useState(false);

  const handleTrack = async () => {
    if (!trackNumber.trim()) return;
    setTrackLoading(true);
    setTrackResult(null);
    setTrackError("");

    try {
      const res = await fetch(`/api/orders/track?orderNumber=${encodeURIComponent(trackNumber.trim())}`);
      const data = await res.json();

      if (data.success) {
        setTrackResult(data.order);
      } else {
        setTrackError(data.error || "Order not found");
      }
    } catch (err) {
      setTrackError("Something went wrong. Please try again.");
    } finally {
      setTrackLoading(false);
    }
  };

  const statusSteps = ["PROCESSING", "SHIPPED", "DELIVERED"];
  const getStatusIndex = (status) => statusSteps.indexOf(status);

  return (
    <section id="shipping">
      <div className="blob ship-blob"></div>
      <span className="section-tag">Delivery &amp; Shipping</span>
      <h2 className="section-title">
        We deliver to <em style={{ color: "var(--terracotta)", fontFamily: "'Playfair Display', serif" }}>your door</em>
      </h2>
      <p className="section-sub">
        From local neighbourhoods to international destinations — getting your Mz.Awal&apos;s faves is always easy.
      </p>
      <div className="shipping-grid">
        <div className="ship-card fade-up">
          <div className="ship-icon">🏠</div>
          <div className="ship-title">Local Delivery</div>
          <div className="ship-desc">
            Fast domestic shipping. Orders processed within 1–2 business days with real-time tracking updates.
          </div>
        </div>
        <div className="ship-card fade-up">
          <div className="ship-icon">✈️</div>
          <div className="ship-title">International Shipping</div>
          <div className="ship-desc">
            We ship globally! Products are carefully packaged to meet international standards and arrive safely.
          </div>
        </div>
        <div className="ship-card fade-up">
          <div className="ship-icon">📦</div>
          <div className="ship-title">Secure Packaging</div>
          <div className="ship-desc">
            Every order is packed with care to ensure your skincare arrives in perfect condition — fresh, sealed, ready to use.
          </div>
        </div>
      </div>
      <div className="track-section fade-up">
        <div>
          <h3>Track Your Order</h3>
          <p>Enter your order number to get live delivery updates.</p>
        </div>
        <div className="track-form">
          <input
            type="text"
            className="track-input"
            placeholder="e.g. MZA-001234"
            value={trackNumber}
            onChange={(e) => setTrackNumber(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleTrack()}
          />
          <button className="btn-primary" style={{ whiteSpace: "nowrap" }} onClick={handleTrack} disabled={trackLoading}>
            {trackLoading ? "Tracking..." : "Track →"}
          </button>
        </div>
      </div>

      {/* Track Result */}
      {trackError && (
        <div style={{ maxWidth: "600px", margin: "20px auto 0", padding: "16px 20px", background: "#fff0f0", color: "#721c24", borderRadius: "12px", textAlign: "center", fontSize: "0.9rem" }}>
          {trackError}
        </div>
      )}

      {trackResult && (
        <div style={{ maxWidth: "600px", margin: "20px auto 0", padding: "24px", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <strong style={{ fontSize: "1.1rem" }}>Order {trackResult.orderNumber}</strong>
            <span style={{
              background: trackResult.orderStatus === "DELIVERED" ? "#d4edda" :
                         trackResult.orderStatus === "SHIPPED" ? "#cce5ff" :
                         trackResult.orderStatus === "CANCELLED" ? "#f8d7da" : "#fff3cd",
              color: trackResult.orderStatus === "DELIVERED" ? "#155724" :
                     trackResult.orderStatus === "SHIPPED" ? "#004085" :
                     trackResult.orderStatus === "CANCELLED" ? "#721c24" : "#856404",
              padding: "4px 12px",
              borderRadius: "6px",
              fontSize: "0.85rem",
              fontWeight: "bold",
            }}>
              {trackResult.orderStatus}
            </span>
          </div>

          {trackResult.orderStatus !== "CANCELLED" && (
            <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0", position: "relative" }}>
              <div style={{ position: "absolute", top: "14px", left: "10%", right: "10%", height: "3px", background: "#eee", zIndex: 0 }}></div>
              <div style={{ position: "absolute", top: "14px", left: "10%", width: `${Math.max(0, getStatusIndex(trackResult.orderStatus)) * 40}%`, height: "3px", background: "var(--terracotta)", zIndex: 1, transition: "width 0.5s" }}></div>
              {statusSteps.map((step, i) => (
                <div key={step} style={{ textAlign: "center", zIndex: 2, flex: 1 }}>
                  <div style={{
                    width: "30px", height: "30px", borderRadius: "50%", margin: "0 auto 8px",
                    background: i <= getStatusIndex(trackResult.orderStatus) ? "var(--terracotta)" : "#eee",
                    color: i <= getStatusIndex(trackResult.orderStatus) ? "#fff" : "#aaa",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: "bold",
                  }}>
                    {i <= getStatusIndex(trackResult.orderStatus) ? "✓" : i + 1}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#666" }}>{step.charAt(0) + step.slice(1).toLowerCase()}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{ fontSize: "0.85rem", color: "#666", marginTop: "12px" }}>
            <div>Total: <strong>GHS {trackResult.totalAmount?.toFixed(2)}</strong></div>
            <div>Placed: {new Date(trackResult.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</div>
            {trackResult.items && (
              <div style={{ marginTop: "8px" }}>
                Items: {trackResult.items.map((item) => `${item.product?.name || "Product"} (x${item.quantity})`).join(", ")}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
