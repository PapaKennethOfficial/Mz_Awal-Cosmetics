"use client";

import { useCart } from "../context/CartContext";

export default function CartSidebar() {
  const { cart, isCartOpen, setIsCartOpen, updateQty, removeFromCart, cartTotal, setIsPaymentOpen } = useCart();

  return (
    <>
      <div
        className={`cart-overlay ${isCartOpen ? "open" : ""}`}
        onClick={() => setIsCartOpen(false)}
      ></div>
      <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`} id="cartSidebar">
        <div className="cart-header">
          <h2>Your Cart 🛒</h2>
          <button className="cart-close" onClick={() => setIsCartOpen(false)}>✕</button>
        </div>
        
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="empty-icon">🛒</div>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.img} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">GHS {(item.price * item.qty).toFixed(2)}</div>
                  <div className="cart-qty" style={{ marginTop: "5px" }}>
                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>-</button>
                    <span className="qty-num">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      style={{ border: "none", background: "none", color: "var(--terracotta)", marginLeft: "10px", fontSize: "0.8rem", cursor: "pointer", textDecoration: "underline"}}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>GHS {cartTotal.toFixed(2)}</span>
            </div>
            <button
              className="checkout-btn"
              onClick={() => {
                setIsCartOpen(false);
                setIsPaymentOpen(true);
              }}
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
