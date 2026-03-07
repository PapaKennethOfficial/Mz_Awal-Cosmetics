"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(""); // "", "sending", "success", "error"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact">
      <div className="blob contact-blob"></div>
      <div className="contact-inner">
        <div>
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">We&apos;d love to<br />hear from you</h2>
          <p className="section-sub">
            Have a question about a product, an order, or just want to say hello? Our team is always here to help.
          </p>
          <div className="contact-items">
            <div className="contact-item fade-up">
              <div className="contact-item-icon">📧</div>
              <div className="contact-item-text">
                <strong>Email Us</strong>
                <span>hello@mzawal.com</span>
              </div>
            </div>
            <div className="contact-item fade-up">
              <div className="contact-item-icon">⏰</div>
              <div className="contact-item-text">
                <strong>Response Time</strong>
                <span>We reply within 24–48 hours</span>
              </div>
            </div>
            <div className="contact-item fade-up">
              <div className="contact-item-icon">🌍</div>
              <div className="contact-item-text">
                <strong>International Queries</strong>
                <span>We support customers worldwide</span>
              </div>
            </div>
            <div className="contact-item fade-up">
              <div className="contact-item-icon">💳</div>
              <div className="contact-item-text">
                <strong>We Accept</strong>
                <span>MTN MoMo · Telecel Cash · AirtelTigo · Visa/Mastercard</span>
              </div>
            </div>
          </div>
        </div>
        <form className="contact-form fade-up" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              className="form-input"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="form-input"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Subject</label>
            <input
              className="form-input"
              type="text"
              placeholder="Order enquiry, product question…"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              className="form-textarea"
              placeholder="Tell us how we can help…"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            ></textarea>
          </div>

          {status === "success" && (
            <div style={{ color: "#155724", background: "#d4edda", padding: "10px 14px", borderRadius: "8px", fontSize: "0.85rem", marginBottom: "12px", textAlign: "center" }}>
              ✅ Message sent successfully! We'll get back to you soon.
            </div>
          )}
          {status === "error" && (
            <div style={{ color: "#721c24", background: "#f8d7da", padding: "10px 14px", borderRadius: "8px", fontSize: "0.85rem", marginBottom: "12px", textAlign: "center" }}>
              ❌ Failed to send message. Please try again.
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={status === "sending"}
            style={{ width: "100%", border: "none", textAlign: "center" }}
          >
            {status === "sending" ? "Sending..." : "Send Message ✉️"}
          </button>
        </form>
      </div>
    </section>
  );
}
