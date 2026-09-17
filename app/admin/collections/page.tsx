import { supabaseAdmin } from "@/lib/supabase";

export default async function CollectionsPage() {
  const result = supabaseAdmin ? await supabaseAdmin.from("store_collections").select("id, name, slug, enabled, sort_order").order("sort_order") : null;
  const collections = result?.data ?? [];
  return <div className="admin-page"><div className="admin-page-heading"><div><p className="admin-eyebrow">Content</p><h1>Collections</h1><p className="admin-subtitle">Organize products into shoppable groups.</p></div><button className="admin-primary">＋ New collection</button></div><div className="admin-panel admin-table-wrap"><table className="admin-table"><thead><tr><th>Collection</th><th>Handle</th><th>Products</th><th>Status</th></tr></thead><tbody>{collections.map((collection) => <tr key={collection.id}><td><strong>{collection.name}</strong></td><td>{collection.slug}</td><td>—</td><td><span className={`admin-badge ${collection.enabled ? "published" : "draft"}`}><i />{collection.enabled ? "active" : "hidden"}</span></td></tr>)}</tbody></table>{!collections.length && <div className="admin-empty"><span className="empty-icon">◇</span><strong>No collections yet</strong><p>Create collections to curate your storefront navigation.</p></div>}</div></div>;
}
