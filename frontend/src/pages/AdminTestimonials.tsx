import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";

interface Testimonial {
  _id: string; name: string; role: string; text: string;
  rating: number; isActive: boolean; order: number;
}

const API = "/api";
const getToken = () => localStorage.getItem("speshway_admin_token");
const empty = { name: "", role: "", text: "", rating: "5", order: "0" };

export default function AdminTestimonials() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!getToken()) return navigate("/admin", { replace: true });
    fetchAll();
  }, [navigate]);

  const fetchAll = async () => {
    const res = await fetch(`${API}/testimonials/all`, { headers: { Authorization: `Bearer ${getToken()}` } });
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  };

  const openAdd = () => { setEditing(null); setForm(empty); setError(""); setShowModal(true); };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({ name: t.name, role: t.role, text: t.text, rating: String(t.rating), order: String(t.order) });
    setError(""); setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      const body = { name: form.name, role: form.role, text: form.text, rating: Number(form.rating), order: Number(form.order) };
      const res = await fetch(`${API}/testimonials${editing ? `/${editing._id}` : ""}`, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify(body),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.message); }
      setShowModal(false); fetchAll();
    } catch (err: unknown) { setError(err instanceof Error ? err.message : "Failed"); }
    setSaving(false);
  };

  const handleToggle = async (t: Testimonial) => {
    await fetch(`${API}/testimonials/${t._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ ...t, isActive: !t.isActive }),
    });
    fetchAll();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`${API}/testimonials/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${getToken()}` } });
    fetchAll();
  };

  const f = (key: keyof typeof empty) => (v: string) => setForm(p => ({ ...p, [key]: v }));

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <AdminSidebar active="Testimonials" />

      <main className="ml-56 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Client Testimonials</h1>
            <p className="text-gray-400 text-sm mt-1">Manage what clients say — changes reflect on the home page</p>
          </div>
          <button onClick={openAdd} className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-bold hover:bg-purple-700 transition-colors">
            + Add Testimonial
          </button>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-400 border border-gray-100">No testimonials yet.</div>
        ) : (
          <div className="space-y-4">
            {items.map(t => (
              <div key={t._id} className={`bg-white rounded-2xl border shadow-sm p-6 flex gap-5 items-start transition-all ${t.isActive ? "border-gray-100" : "border-gray-200 opacity-60"}`}>
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center font-black text-xl text-purple-600 shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-bold text-gray-800">{t.name}</span>
                    <span className="text-xs text-gray-400">{t.role}</span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${t.isActive ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                      {t.isActive ? "Active" : "Hidden"}
                    </span>
                    <span className="text-yellow-400 text-sm">{"★".repeat(t.rating)}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">"{t.text}"</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button onClick={() => handleToggle(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${t.isActive ? "bg-yellow-50 text-yellow-600 hover:bg-yellow-100" : "bg-green-50 text-green-600 hover:bg-green-100"}`}>
                    {t.isActive ? "Hide" : "Show"}
                  </button>
                  <button onClick={() => openEdit(t)} className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-100 transition-colors">Edit</button>
                  <button onClick={() => handleDelete(t._id)} className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-black text-gray-900">{editing ? "Edit Testimonial" : "Add Testimonial"}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">x</button>
            </div>
            <form onSubmit={handleSave} className="p-6 flex flex-col gap-4">
              {error && <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>}
              <TField label="Client Name *" value={form.name} onChange={f("name")} required />
              <TField label="Role / Company *" value={form.role} onChange={f("role")} required placeholder="CEO, CompanyName" />
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Message *</label>
                <textarea value={form.text} onChange={e => setForm(p => ({ ...p, text: e.target.value }))} required rows={4}
                  placeholder="What the client said..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Rating</label>
                  <select value={form.rating} onChange={e => setForm(p => ({ ...p, rating: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm">
                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{"★".repeat(r)} ({r})</option>)}
                  </select>
                </div>
                <TField label="Order" value={form.order} onChange={f("order")} type="number" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 disabled:opacity-60">
                  {saving ? "Saving..." : editing ? "Update" : "Add Testimonial"}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold text-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const TField = ({ label, value, onChange, required, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void;
  required?: boolean; placeholder?: string; type?: string;
}) => (
  <div>
    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">{label}</label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} required={required} placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm" />
  </div>
);
