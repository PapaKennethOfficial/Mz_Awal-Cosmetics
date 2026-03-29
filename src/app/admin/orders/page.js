"use client";

import { useState, useEffect } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = () => {
    const params = new URLSearchParams();
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (search) params.set("search", search);

    fetch(`/api/orders?${params}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchOrders();
  };

  const updateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, orderStatus: newStatus }),
      });
      fetchOrders();
    } catch (err) {
      console.error("Failed to update order:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const statusColors = {
    PROCESSING: { bg: "#fff3cd", color: "#856404" },
    SHIPPED: { bg: "#cce5ff", color: "#004085" },
    DELIVERED: { bg: "#d4edda", color: "#155724" },
    CANCELLED: { bg: "#f8d7da", color: "#721c24" },
  };

  return (
    <>
      <h1 className="admin-header">Manage Orders</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Search by Order ID or Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "10px 15px", borderRadius: "8px", border: "1px solid #cbd5e1", width: "300px", fontSize: "0.95rem" }}
          />
          <button type="submit" className="admin-action-btn primary">Search</button>
        </form>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }}
        >
          <option value="all">All Statuses</option>
          <option value="PROCESSING">Processing</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>Loading orders...</div>
      ) : orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>No orders found.</div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: "600", color: "var(--forest)" }}>{order.orderNumber}</td>
                  <td style={{ color: "#64748b" }}>{new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</td>
                  <td style={{ fontWeight: "500" }}>{order.customerName}</td>
                  <td>GHS {order.totalAmount?.toFixed(2)}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    <span className={`status-badge ${
                      order.orderStatus === "PROCESSING" ? "status-processing" :
                      order.orderStatus === "SHIPPED" ? "status-shipped" :
                      order.orderStatus === "DELIVERED" ? "status-delivered" : "status-error"
                    }`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>
                    <select
                      value={order.orderStatus}
                      disabled={updatingId === order.id}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.85rem", background: "#f8fafc", color: "#334155", cursor: "pointer" }}
                    >
                      <option value="PROCESSING">Processing</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
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
