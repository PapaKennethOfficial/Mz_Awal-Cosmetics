"use client";

import { useState, useEffect } from "react";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ name: "", category: "face-cleanse", image: "", price: "", badge: "", inStock: true, description: "" });

  const fetchProducts = () => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const openAddModal = () => {
    setEditProduct(null);
    setForm({ name: "", category: "face-cleanse", image: "", price: "", badge: "", inStock: true, description: "" });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      image: product.image,
      price: product.price.toString(),
      badge: product.badge || "",
      inStock: product.inStock,
      description: product.description,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editProduct ? "PUT" : "POST";
    const body = editProduct ? { id: editProduct.id, ...form } : form;

    try {
      const res = await fetch("/api/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        fetchProducts();
      }
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const categories = [
    { value: "face-cleanse", label: "Face Cleanse" },
    { value: "face-treat", label: "Face Treat" },
    { value: "face-moisturise", label: "Face Moisturise" },
    { value: "protection", label: "Protection" },
    { value: "body", label: "Body" },
  ];

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: "8px",
    border: "1px solid #ddd", fontSize: "0.9rem", boxSizing: "border-box",
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 className="admin-header" style={{ marginBottom: 0 }}>Manage Products</h1>
        <button className="admin-action-btn" style={{ padding: "10px 20px", fontSize: "0.9rem" }} onClick={openAddModal}>
          + Add New Product
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>Loading products...</div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>No products found. Add your first product!</div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  <img src={p.image} alt={p.name} style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "6px" }} />
                </td>
                <td style={{ fontWeight: "600" }}>{p.name}</td>
                <td>{p.category.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase())}</td>
                <td>GHS {p.price?.toFixed(2)}</td>
                <td>
                  <span style={{ color: p.inStock ? "green" : "red", fontWeight: "bold" }}>
                    {p.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td>
                  <button className="admin-action-btn" style={{ marginRight: "10px" }} onClick={() => openEditModal(p)}>Edit</button>
                  <button className="admin-action-btn" style={{ background: "#cc0000" }} onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999,
        }}>
          <div style={{
            background: "#fff", borderRadius: "16px", padding: "32px",
            width: "100%", maxWidth: "500px", maxHeight: "90vh", overflowY: "auto",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{ margin: 0, fontSize: "1.3rem" }}>{editProduct ? "Edit Product" : "Add New Product"}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer" }}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: 600, fontSize: "0.85rem" }}>Product Name</label>
                <input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: 600, fontSize: "0.85rem" }}>Category</label>
                <select style={inputStyle} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: 600, fontSize: "0.85rem" }}>Image URL</label>
                <input style={inputStyle} value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: 600, fontSize: "0.85rem" }}>Price (GHS)</label>
                <input style={inputStyle} type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: 600, fontSize: "0.85rem" }}>Badge (optional)</label>
                <input style={inputStyle} placeholder="e.g. New, Best Seller, Trending" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} />
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: 600, fontSize: "0.85rem" }}>Description</label>
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} />
                  <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>In Stock</span>
                </label>
              </div>
              <button type="submit" className="admin-action-btn" style={{ width: "100%", padding: "12px", fontSize: "1rem" }}>
                {editProduct ? "Save Changes" : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
