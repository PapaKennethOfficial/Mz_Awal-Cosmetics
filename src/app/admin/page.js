"use client";

import { useState, useEffect } from "react";
import { DollarSign, Clock, AlertTriangle, MessageCircle } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center", color: "#888" }}>Loading dashboard...</div>;
  }

  if (!stats) {
    return <div style={{ padding: "40px", textAlign: "center", color: "#cc0000" }}>Failed to load dashboard data.</div>;
  }

  return (
    <>
      <h1 className="admin-header">Dashboard Overview</h1>
      <div className="dashboard-cards">
        <div className="dash-card">
          <div className="dash-card-info">
            <h3>Total Sales (This Month)</h3>
            <div className="value">GHS {stats.totalSales?.toLocaleString("en-GH", { minimumFractionDigits: 2 }) || "0.00"}</div>
          </div>
          <div className="dash-card-icon icon-sales"><DollarSign size={28} /></div>
        </div>
        <div className="dash-card">
          <div className="dash-card-info">
            <h3>Orders Pending</h3>
            <div className="value">{stats.pendingOrders ?? 0}</div>
          </div>
          <div className="dash-card-icon icon-orders"><Clock size={28} /></div>
        </div>
        <div className="dash-card">
          <div className="dash-card-info">
            <h3>Products Out of Stock</h3>
            <div className="value">{stats.lowStock ?? 0}</div>
          </div>
          <div className="dash-card-icon icon-stock"><AlertTriangle size={28} /></div>
        </div>
        <div className="dash-card">
          <div className="dash-card-info">
            <h3>New Reviews</h3>
            <div className="value">{stats.newReviews ?? 0}</div>
          </div>
          <div className="dash-card-icon icon-reviews"><MessageCircle size={28} /></div>
        </div>
      </div>

      <h2 style={{ marginBottom: "20px", color: "#333", fontSize: "1.2rem" }}>Recent Orders</h2>
      {stats.recentOrders && stats.recentOrders.length > 0 ? (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 600 }}>{order.orderNumber}</td>
                  <td>{order.customerName}</td>
                  <td style={{ fontWeight: 500 }}>GHS {order.totalAmount?.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${
                      order.orderStatus === "PROCESSING" ? "status-processing" :
                      order.orderStatus === "SHIPPED" ? "status-shipped" :
                      order.orderStatus === "DELIVERED" ? "status-delivered" : "status-error"
                    }`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td style={{ color: "#64748b" }}>{new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ color: "#888", textAlign: "center", padding: "30px" }}>No orders yet.</p>
      )}
    </>
  );
}
