"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function PaymentModal() {
  const { cart, cartTotal, isPaymentOpen, setIsPaymentOpen, clearCart } = useCart();
  const [payMethod, setPayMethod] = useState("momo");
  const [momoProvider, setMomoProvider] = useState("MTN Mobile Money");
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Customer info
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [momoNumber, setMomoNumber] = useState("");
  const [momoAccName, setMomoAccName] = useState("");

  const handlePayment = async () => {
    if (!customerName.trim() || !customerEmail.trim()) {
      setError("Please fill in your name and email.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim(),
          totalAmount: cartTotal,
          paymentMethod: payMethod === "momo" ? momoProvider : "Card",
          items: cart.map(item => ({
            id: item.id,
            qty: item.qty,
            price: item.price,
          })),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setOrderId(data.order.orderNumber);
        setSuccess(true);
        clearCart();
      } else {
        setError("Order failed. Please try again.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeAndReset = () => {
    setIsPaymentOpen(false);
    setTimeout(() => {
      setSuccess(false);
      setOrderId("");
      setError("");
      setCustomerName("");
      setCustomerEmail("");
      setMomoNumber("");
      setMomoAccName("");
    }, 300);
  };

  return (
    <div className={`modal-overlay ${isPaymentOpen ? "open" : ""}`}>
      <div className="modal">
        {!success ? (
          <div>
            <div className="modal-header">
              <h2>Complete Payment 💳</h2>
              <button className="modal-close" onClick={closeAndReset}>✕</button>
            </div>
            <div className="modal-body">
              <div className="order-summary">
                {cart.map((item) => (
                  <div className="order-row" key={item.id}>
                    <span>{item.qty}x {item.name}</span>
                    <span>GHS {(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
                <div className="order-row">
                  <span>Total</span>
                  <span>GHS {cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Customer Info */}
              <div style={{ marginBottom: "16px" }}>
                <input
                  className="pay-input"
                  type="text"
                  placeholder="Full Name *"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
                <input
                  className="pay-input"
                  type="email"
                  placeholder="Email Address *"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  style={{ marginBottom: 0 }}
                />
              </div>

              {error && (
                <div style={{ color: "#cc0000", fontSize: "0.85rem", marginBottom: "12px", textAlign: "center" }}>
                  {error}
                </div>
              )}

              <div className="pay-tabs">
                <button
                  className={`pay-tab ${payMethod === "momo" ? "active" : ""}`}
                  onClick={() => setPayMethod("momo")}
                >
                  📱 Mobile Money
                </button>
                <button
                  className={`pay-tab ${payMethod === "card" ? "active" : ""}`}
                  onClick={() => setPayMethod("card")}
                >
                  💳 Card Payment
                </button>
              </div>

              {/* MOMO PANEL */}
              <div className={`pay-panel ${payMethod === "momo" ? "active" : ""}`}>
                <div className="momo-options">
                  <div
                    className={`momo-option ${momoProvider === "MTN Mobile Money" ? "selected" : ""}`}
                    onClick={() => setMomoProvider("MTN Mobile Money")}
                  >
                    <div className="momo-logo mtn-logo">MTN</div>
                    <div>
                      <div className="momo-name">MTN Mobile Money</div>
                      <div className="momo-sub">Pay with MTN MoMo</div>
                    </div>
                  </div>
                  <div
                    className={`momo-option ${momoProvider === "Telecel Cash" ? "selected" : ""}`}
                    onClick={() => setMomoProvider("Telecel Cash")}
                  >
                    <div className="momo-logo voda-logo">TC</div>
                    <div>
                      <div className="momo-name">Telecel Cash</div>
                      <div className="momo-sub">Pay with Telecel Cash</div>
                    </div>
                  </div>
                  <div
                    className={`momo-option ${momoProvider === "AirtelTigo Money" ? "selected" : ""}`}
                    onClick={() => setMomoProvider("AirtelTigo Money")}
                  >
                    <div className="momo-logo at-logo">AT</div>
                    <div>
                      <div className="momo-name">AirtelTigo Money</div>
                      <div className="momo-sub">Pay with AirtelTigo</div>
                    </div>
                  </div>
                </div>
                <input className="pay-input" type="tel" placeholder="Mobile Money number (e.g. 024XXXXXXX)" value={momoNumber} onChange={e => setMomoNumber(e.target.value)} />
                <input className="pay-input" type="text" placeholder="Account name" style={{ marginBottom: 0 }} value={momoAccName} onChange={e => setMomoAccName(e.target.value)} />
                <button className="pay-now-btn" onClick={handlePayment} disabled={loading}>
                  {loading ? "Processing..." : "Pay Now 🔒"}
                </button>
                <div className="secure-note">🔒 Secured by SSL encryption. Your details are safe.</div>
              </div>

              {/* CARD PANEL */}
              <div className={`pay-panel ${payMethod === "card" ? "active" : ""}`}>
                <input className="pay-input" type="text" placeholder="Cardholder Name" />
                <input className="pay-input" type="text" placeholder="Card Number" maxLength="19" />
                <div className="form-row">
                  <input className="pay-input" style={{ marginBottom: 0 }} type="text" placeholder="MM / YY" maxLength="7" />
                  <input className="pay-input" style={{ marginBottom: 0 }} type="text" placeholder="CVV" maxLength="3" />
                </div>
                <button className="pay-now-btn" onClick={handlePayment} disabled={loading}>
                  {loading ? "Processing..." : "Pay Now 🔒"}
                </button>
                <div className="secure-note">🔒 Your card details are encrypted &amp; never stored.</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="success-screen show">
            <div className="success-icon">🎉</div>
            <h3>Payment Successful!</h3>
            <p>
              Thank you for shopping with Mz.Awal&apos;s Cosmetics!<br />
              Your order confirmation will be sent to your email.<br /><br />
              <strong>Order ID: </strong><span>{orderId}</span>
            </p>
            <button className="pay-now-btn" onClick={closeAndReset} style={{ maxWidth: "260px", margin: "20px auto 0" }}>
              Continue Shopping →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
