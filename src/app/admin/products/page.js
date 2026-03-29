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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB limit. Please choose a smaller image.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
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
        <button className="admin-action-btn primary" style={{ padding: "10px 20px", fontSize: "0.95rem", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }} onClick={openAddModal}>
          + Add New Product
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>Loading products...</div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>No products found. Add your first product!</div>
      ) : (
        <div className="admin-table-container">
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
                    <img src={p.image} alt={p.name} style={{ width: "45px", height: "45px", objectFit: "cover", borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                  </td>
                  <td style={{ fontWeight: "600", color: "#0f172a" }}>{p.name}</td>
                  <td style={{ color: "#64748b" }}>{p.category.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase())}</td>
                  <td style={{ fontWeight: "500" }}>GHS {p.price?.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${p.inStock ? "status-delivered" : "status-error"}`}>
                      {p.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td>
                    <button className="admin-action-btn" style={{ marginRight: "10px" }} onClick={() => openEditModal(p)}>Edit</button>
                    <button className="admin-action-btn" style={{ color: "#ef4444", borderColor: "#fca5a5" }} onClick={() => handleDelete(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
                <label style={{ display: "block", marginBottom: "4px", fontWeight: 600, fontSize: "0.85rem" }}>Product Image</label>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px", padding: "8px", background: "#f8fafc", borderRadius: "8px", border: "1px dashed #cbd5e1" }}>
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ fontSize: "0.85rem", flex: 1 }} />
                  <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 500 }}>Max 2MB</span>
                </div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "4px", textAlign: "center" }}>OR PASTE AN IMAGE URL</div>
                <input style={inputStyle} placeholder="https://..." value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
                {form.image && (
                  <div style={{ marginTop: "10px", textAlign: "center" }}>
                    <img src={form.image} alt="Preview" style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                  </div>
                )}
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
              <button type="submit" className="admin-action-btn primary" style={{ width: "100%", padding: "12px", fontSize: "1rem", justifyContent: "center" }}>
                {editProduct ? "Save Changes" : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
