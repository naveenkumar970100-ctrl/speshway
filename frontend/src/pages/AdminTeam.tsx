import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";

interface Member {
  _id: string; name: string; role: string; bio: string; initials: string;
  gradient: string; linkedin: string; github: string; twitter: string;
  email: string; image: string; order: number; isActive: boolean;
}

const API = "http://localhost:5000/api";
const getToken = () => localStorage.getItem("speshway_admin_token");
const emptyForm = { name: "", role: "", bio: "", initials: "", gradient: "from-purple-500 to-pink-500", linkedin: "", github: "", twitter: "", email: "", order: "0" };

const gradients = [
  "from-purple-500 to-pink-500",
  "from-cyan-500 to-blue-500",
  "from-green-500 to-teal-500",
  "from-orange-500 to-red-500",
  "from-indigo-500 to-purple-500",
  "from-pink-500 to-rose-500",
];

export default function AdminTeam() {
  const navigate = useNavigate();
  const [members, setMembers] = useState<Member[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editMember, setEditMember] = useState<Member | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!getToken()) return navigate("/admin", { replace: true });
    fetchMembers();
  }, [navigate]);

  const fetchMembers = async () => {
    const res = await fetch(`${API}/team/all`, { headers: { Authorization: `Bearer ${getToken()}` } });
    const data = await res.json();
    setMembers(Array.isArray(data) ? data : []);
  };

  const openAdd = () => { setEditMember(null); setForm(emptyForm); setImageFile(null); setImagePreview(""); setError(""); setShowModal(true); };

  const openEdit = (m: Member) => {
    setEditMember(m);
    setForm({ name: m.name, role: m.role, bio: m.bio, initials: m.initials, gradient: m.gradient, linkedin: m.linkedin, github: m.github, twitter: m.twitter, email: m.email, order: String(m.order) });
    setImageFile(null); setImagePreview(m.image || ""); setError(""); setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imageFile) fd.append("image", imageFile);
      const res = await fetch(`${API}/team${editMember ? `/${editMember._id}` : ""}`, {
        method: editMember ? "PUT" : "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: fd,
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.message); }
      setShowModal(false); fetchMembers();
    } catch (err: unknown) { setError(err instanceof Error ? err.message : "Failed"); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    await fetch(`${API}/team/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${getToken()}` } });
    fetchMembers();
  };

  const f = (key: keyof typeof emptyForm) => (v: string) => setForm(p => ({ ...p, [key]: v }));

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <AdminSidebar active="Team" />

      <main className="ml-56 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Team Members ({members.length})</h1>
            <p className="text-gray-400 text-sm mt-1">Manage your team — changes reflect on the Team page</p>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-bold hover:bg-purple-700 transition-colors">
            + Add Team Member
          </button>
        </div>

        {members.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-400 border border-gray-100">No team members yet.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {members.map(m => (
              <div key={m._id} className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 ${!m.isActive ? "opacity-60" : ""}`}>
                <div className="flex items-center gap-4 mb-4">
                  {m.image ? (
                    <img src={m.image} alt={m.name} className="w-14 h-14 rounded-full object-cover" />
                  ) : (
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${m.gradient} flex items-center justify-center text-white font-black text-lg`}>
                      {m.initials}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 truncate">{m.name}</h3>
                    <p className="text-purple-600 text-xs font-bold uppercase tracking-wider">{m.role}</p>
                  </div>
                </div>
                {m.bio && <p className="text-gray-500 text-xs line-clamp-2 mb-4">{m.bio}</p>}
                <div className="flex gap-2">
                  <button onClick={() => openEdit(m)} className="flex-1 py-2 rounded-xl bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-100 transition-colors">Edit</button>
                  <button onClick={() => handleDelete(m._id)} className="flex-1 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-black text-gray-900">{editMember ? "Edit Member" : "Add Team Member"}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>
            <form onSubmit={handleSave} className="p-6 flex flex-col gap-4">
              {error && <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>}

              <div className="grid grid-cols-2 gap-4">
                <TField label="Full Name *" value={form.name} onChange={f("name")} required />
                <TField label="Role / Title *" value={form.role} onChange={f("role")} required placeholder="CEO & Founder" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Bio</label>
                <textarea value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} rows={2}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <TField label="Initials (e.g. RK)" value={form.initials} onChange={f("initials")} placeholder="Auto-generated" />
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Avatar Gradient</label>
                  <select value={form.gradient} onChange={e => setForm(p => ({ ...p, gradient: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm">
                    {gradients.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <TField label="LinkedIn URL" value={form.linkedin} onChange={f("linkedin")} placeholder="https://linkedin.com/in/..." />
                <TField label="GitHub URL" value={form.github} onChange={f("github")} placeholder="https://github.com/..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <TField label="Twitter URL" value={form.twitter} onChange={f("twitter")} placeholder="https://twitter.com/..." />
                <TField label="Email" value={form.email} onChange={f("email")} placeholder="name@speshway.com" />
              </div>
              <TField label="Display Order" value={form.order} onChange={f("order")} type="number" />

              {/* Photo upload */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Profile Photo</label>
                <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:border-purple-400 transition-colors">
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="w-20 h-20 rounded-full object-cover mx-auto" />
                  ) : (
                    <div className="text-gray-400"><div className="text-3xl mb-1">📷</div><div className="text-sm">Click to upload photo</div><div className="text-xs mt-1">PNG, JPG, WEBP (Max 5MB)</div></div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) { setImageFile(f); setImagePreview(URL.createObjectURL(f)); } }} className="hidden" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 disabled:opacity-60">
                  {saving ? "Saving…" : editMember ? "Update Member" : "Add Member"}
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
  label: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string; type?: string;
}) => (
  <div>
    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">{label}</label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} required={required} placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm" />
  </div>
);
