"use client";

import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function Products() {
  const { addToCart } = useCart();
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(p => filter === "all" || p.category === filter);
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0; // Newest logic
  });

  return (
    <section id="products">
      <div className="blob prod-blob"></div>
      <div className="products-header">
        <div>
          <span className="section-tag">The Collection</span>
          <h2 className="section-title">Shop All Products</h2>
          <p className="product-count" id="productCount">{sortedProducts.length} items</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-end" }}>
          <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Sort: Newest First</option>
            <option value="price-asc">Sort: Price Low → High</option>
            <option value="price-desc">Sort: Price High → Low</option>
          </select>
          <div className="filter-tabs">
            <button className={`filter-tab ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</button>
            <button className={`filter-tab ${filter === "face-cleanse" ? "active" : ""}`} onClick={() => setFilter("face-cleanse")}>🫧 Cleanse</button>
            <button className={`filter-tab ${filter === "face-treat" ? "active" : ""}`} onClick={() => setFilter("face-treat")}>💎 Treat</button>
            <button className={`filter-tab ${filter === "face-moisturise" ? "active" : ""}`} onClick={() => setFilter("face-moisturise")}>🌸 Moisturise</button>
            <button className={`filter-tab ${filter === "protection" ? "active" : ""}`} onClick={() => setFilter("protection")}>☀️ Protection</button>
            <button className={`filter-tab ${filter === "body" ? "active" : ""}`} onClick={() => setFilter("body")}>🧴 Body</button>
          </div>
        </div>
      </div>
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>Loading products...</div>
      ) : (
        <div className="products-grid">
        {sortedProducts.map(p => (
          <div key={p.id} className={`product-card ${!p.inStock ? "sold-out" : ""}`}>
            {p.badge && <div className={`product-badge ${p.badge === "New" ? "new-badge" : ""}`}>{p.badge}</div>}
            {!p.inStock && <div className="product-badge sold-out-badge">Sold Out</div>}
            <div className="product-img-wrap">
              <img src={p.image} alt={p.name} />
            </div>
            <div className="product-body">
              <div className="product-category">{p.category.replace('-', ' ')}</div>
              <h3 className="product-name">{p.name}</h3>
              <div style={{ marginBottom: "8px", fontSize: "0.8rem", color: "var(--terracotta)"}}>
                ⭐⭐⭐⭐⭐ (12)
              </div>
              <p className="product-desc">{p.desc}</p>
              <div className="product-footer">
                <span className="product-price">GHS {p.price.toFixed(2)}</span>
                <button 
                  className={`add-to-cart ${!p.inStock ? "sold-out-btn" : ""}`} 
                  disabled={!p.inStock}
                  onClick={() => addToCart(p)}
                >
                  {p.inStock ? "+ Add to Cart" : "Sold Out"}
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
    </section>
  );
}
