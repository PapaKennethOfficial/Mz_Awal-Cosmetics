import AdminSidebar from "../../components/AdminSidebar";
import "./admin.css";

export const metadata = {
  title: "Admin | Mz.Awal's Cosmetics",
};

export default function AdminLayout({ children }) {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
