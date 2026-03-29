"use client";

import { useState, useEffect } from "react";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState(null);

  const fetchReviews = () => {
    fetch("/api/reviews?all=true")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setReviews(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchReviews(); }, []);

  const togglePublished = async (id, currentStatus) => {
    setTogglingId(id);
    try {
      await fetch("/api/reviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, published: !currentStatus }),
      });
      fetchReviews();
    } catch (err) {
      console.error("Error toggling review:", err);
    } finally {
      setTogglingId(null);
    }
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <>
      <h1 className="admin-header">Customer Reviews</h1>

      <div className="dashboard-cards" style={{ marginBottom: "20px" }}>
        <div className="dash-card">
          <h3>Average Rating</h3>
          <div className="value">{avgRating} <span style={{ fontSize: "1rem", color: "#ffd700" }}>★★★★★</span></div>
        </div>
        <div className="dash-card">
          <h3>Total Reviews</h3>
          <div className="value">{reviews.length}</div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>No reviews yet.</div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id}>
                  <td style={{ color: "#64748b" }}>{new Date(review.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</td>
                  <td style={{ fontWeight: "600", color: "#0f172a" }}>{review.author}</td>
                  <td style={{ fontWeight: "500" }}>{review.product?.name || "Unknown"}</td>
                  <td style={{ color: "#fbbf24", letterSpacing: "2px", fontSize: "1.1rem" }}>{renderStars(review.rating)}</td>
                  <td style={{ maxWidth: "300px", color: "#475569", lineHeight: "1.5" }}>&ldquo;{review.content.substring(0, 80)}{review.content.length > 80 ? "..." : ""}&rdquo;</td>
                  <td>
                    <span className={`status-badge ${review.published ? "status-delivered" : "status-error"}`}>
                      {review.published ? "Published" : "Hidden"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="admin-action-btn"
                      style={review.published ? { color: "#ef4444", borderColor: "#fca5a5" } : { color: "#16a34a", borderColor: "#86efac" }}
                      disabled={togglingId === review.id}
                      onClick={() => togglePublished(review.id, review.published)}
                    >
                      {review.published ? "Hide" : "Show"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
