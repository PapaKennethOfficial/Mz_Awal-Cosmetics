"use client";

import React, { useState, useEffect } from "react";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const fetchMessages = () => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMessages(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchMessages(); }, []);

  const toggleRead = async (id, currentRead) => {
    try {
      await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: !currentRead }),
      });
      fetchMessages();
    } catch (err) {
      console.error("Error updating message:", err);
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <>
      <h1 className="admin-header">Contact Messages</h1>

      <div className="dashboard-cards" style={{ marginBottom: "20px" }}>
        <div className="dash-card">
          <h3>Total Messages</h3>
          <div className="value">{messages.length}</div>
        </div>
        <div className="dash-card">
          <h3>Unread</h3>
          <div className="value" style={{ color: unreadCount > 0 ? "#cc0000" : "inherit" }}>
            {unreadCount}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th><th>Name</th><th>Email</th><th>Subject</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map(i => (
                <tr key={i}>
                  <td><div className="skeleton" style={{width: "80px", height: "20px"}}></div></td>
                  <td><div className="skeleton" style={{width: "120px", height: "20px"}}></div></td>
                  <td><div className="skeleton" style={{width: "150px", height: "20px"}}></div></td>
                  <td><div className="skeleton" style={{width: "200px", height: "20px"}}></div></td>
                  <td><div className="skeleton" style={{width: "60px", height: "24px", borderRadius: "99px"}}></div></td>
                  <td><div className="skeleton" style={{width: "120px", height: "32px", borderRadius: "6px"}}></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : messages.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>No messages yet.</div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <React.Fragment key={msg.id}>
                  <tr style={{ background: !msg.read ? "#f0fdf4" : "transparent" }}>
                    <td style={{ color: "#64748b" }}>{new Date(msg.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</td>
                    <td style={{ fontWeight: !msg.read ? "700" : "500", color: "#0f172a" }}>{msg.name}</td>
                    <td>
                      <a href={`mailto:${msg.email}`} style={{ color: "var(--terracotta, #d4826a)", textDecoration: "none", fontWeight: "500" }}>
                        {msg.email}
                      </a>
                    </td>
                    <td style={{ fontWeight: !msg.read ? "600" : "400" }}>{msg.subject}</td>
                    <td>
                      <span className={`status-badge ${msg.read ? "status-delivered" : "status-processing"}`}>
                        {msg.read ? "Read" : "Unread"}
                      </span>
                    </td>
                    <td style={{ display: "flex", gap: "8px" }}>
                      <button
                        className="admin-action-btn"
                        onClick={() => setExpandedId(expandedId === msg.id ? null : msg.id)}
                      >
                        {expandedId === msg.id ? "Close" : "View"}
                      </button>
                      <button
                        className="admin-action-btn"
                        style={msg.read ? { color: "#64748b", borderColor: "#cbd5e1" } : { color: "#16a34a", borderColor: "#86efac" }}
                        onClick={() => toggleRead(msg.id, msg.read)}
                      >
                        {msg.read ? "Mark Unread" : "Mark Read"}
                      </button>
                    </td>
                  </tr>
                  {expandedId === msg.id && (
                    <tr key={`${msg.id}-detail`}>
                      <td colSpan="6" style={{
                        padding: "24px 32px",
                        background: "#fafafa",
                        borderLeft: "4px solid var(--forest, #3a5a4a)",
                        borderBottom: "1px solid #e2e8f0"
                      }}>
                        <strong style={{ color: "#334155", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Message Content:</strong>
                        <p style={{ marginTop: "12px", lineHeight: "1.7", color: "#475569", whiteSpace: "pre-wrap", fontSize: "0.95rem" }}>
                          {msg.message}
                        </p>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
