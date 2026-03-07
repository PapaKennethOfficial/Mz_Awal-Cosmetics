import Link from "next/link";
import AdminLogoutButton from "../../components/AdminLogoutButton";
import "./admin.css";

export const metadata = {
  title: "Admin | Mz.Awal's Cosmetics",
};

export default function AdminLayout({ children }) {
  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          Mz.<span>Awal&apos;s</span>
          <br />Admin
        </div>
        <nav className="admin-nav">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/orders">Orders</Link>
          <Link href="/admin/products">Products</Link>
          <Link href="/admin/reviews">Reviews</Link>
          <Link href="/">← Storefront</Link>
        </nav>
        <div style={{ marginTop: "auto", padding: "20px" }}>
          <AdminLogoutButton />
        </div>
      </aside>
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
