"use client";

export default function AdminLogoutButton() {
  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        width: "100%",
        padding: "10px",
        background: "rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.7)",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "0.85rem",
      }}
    >
      Logout →
    </button>
  );
}
