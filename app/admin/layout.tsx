import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { AdminNav } from "@/components/admin-nav";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (!await requireAdmin()) redirect("/sign-in?redirect_url=/admin");
  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <Link className="admin-brand" href="/admin" aria-label="Giraffe Clothing admin home">
          <span className="admin-brand-mark">G</span>
          <span><strong>Giraffe</strong><small>Commerce</small></span>
        </Link>
        <AdminNav />
        <div className="admin-sidebar-footer">
          <Link href="/" className="admin-store-link"><span className="admin-store-dot" />View storefront <span>↗</span></Link>
          <div className="admin-user-chip"><span className="admin-avatar">A</span><span><strong>Admin</strong><small>Store owner</small></span><span className="admin-more">•••</span></div>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-mobile-brand"><span className="admin-brand-mark">G</span><strong>Giraffe</strong></div>
          <label className="admin-search"><span>⌕</span><input placeholder="Search products, orders, customers..." aria-label="Search admin" /><kbd>⌘ K</kbd></label>
          <div className="admin-top-actions"><button className="admin-icon-button" aria-label="Notifications">♢<i /></button><button className="admin-help-button">?</button></div>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
