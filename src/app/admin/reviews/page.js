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
                <td>{new Date(review.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</td>
                <td style={{ fontWeight: "600" }}>{review.author}</td>
                <td>{review.product?.name || "Unknown"}</td>
                <td style={{ color: "#ffd700" }}>{renderStars(review.rating)}</td>
                <td style={{ maxWidth: "300px" }}>&ldquo;{review.content.substring(0, 100)}{review.content.length > 100 ? "..." : ""}&rdquo;</td>
                <td>
                  <span style={{
                    background: review.published ? "#d4edda" : "#f8d7da",
                    color: review.published ? "#155724" : "#721c24",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                  }}>
                    {review.published ? "Published" : "Hidden"}
                  </span>
                </td>
                <td>
                  <button
                    className="admin-action-btn"
                    style={{ background: review.published ? "#cc0000" : "#28a745" }}
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
      )}
    </>
  );
}
