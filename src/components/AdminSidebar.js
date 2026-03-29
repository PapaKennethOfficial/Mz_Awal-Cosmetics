"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingCart, Package, Star, MessageSquare, Store } from "lucide-react";
import AdminLogoutButton from "./AdminLogoutButton";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        Mz.<span>Awal&apos;s</span>
        <br />Admin
      </div>
      <div className="admin-nav">
        <Link href="/admin" className={pathname === "/admin" ? "active" : ""}><LayoutDashboard /> Dashboard</Link>
        <Link href="/admin/orders" className={pathname === "/admin/orders" ? "active" : ""}><ShoppingCart /> Orders</Link>
        <Link href="/admin/products" className={pathname === "/admin/products" ? "active" : ""}><Package /> Products</Link>
        <Link href="/admin/reviews" className={pathname === "/admin/reviews" ? "active" : ""}><Star /> Reviews</Link>
        <Link href="/admin/messages" className={pathname === "/admin/messages" ? "active" : ""}><MessageSquare /> Messages</Link>
        <div style={{ marginTop: "25px", marginBottom: "5px", padding: "0 16px", textTransform: "uppercase", fontSize: "0.75rem", color: "#94a3b8", fontWeight: "600", letterSpacing: "1px" }}>External</div>
        <Link href="/"><Store /> Storefront</Link>
      </div>
      <div style={{ marginTop: "auto", padding: "20px" }}>
        <AdminLogoutButton />
      </div>
    </aside>
  );
}
