import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";

interface Post {
  _id: string; title: string; excerpt: string; content: string; tag: string;
  author: string; readTime: string; image: string; status: string; featured: boolean; order: number;
  createdAt: string;
}

const API = "http://localhost:5000/api";
const getToken = () => localStorage.getItem("speshway_admin_token");
const emptyForm = { title: "", excerpt: "", content: "", tag: "Technology", author: "", readTime: "5 min", status: "Published", featured: "false", order: "0" };

const tagOptions = ["Technology", "AI", "Cloud", "Security", "DevOps", "Data", "Strategy", "Mobile", "General"];

const statusColors: Record<string, string> = {
  Published: "bg-green-100 text-green-700",
  Draft: "bg-gray-100 text-gray-600",
};

export default function AdminBlog() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!getToken()) return navigate("/admin", { replace: true });
    fetchPosts();
  }, [navigate]);

  const fetchPosts = async () => {
    const res = await fetch(`${API}/blog/all`, { headers: { Authorization: `Bearer ${getToken()}` } });
    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);
  };

  const openAdd = () => { setEditPost(null); setForm(emptyForm); setImageFile(null); setImagePreview(""); setError(""); setShowModal(true); };

  const openEdit = (p: Post) => {
    setEditPost(p);
    setForm({ title: p.title, excerpt: p.excerpt, content: p.content, tag: p.tag, author: p.author, readTime: p.readTime, status: p.status, featured: String(p.featured), order: String(p.order) });
    setImageFile(null); setImagePreview(p.image || ""); setError(""); setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imageFile) fd.append("image", imageFile);
      const res = await fetch(`${API}/blog${editPost ? `/${editPost._id}` : ""}`, {
        method: editPost ? "PUT" : "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: fd,
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.message); }
      setShowModal(false); fetchPosts();
    } catch (err: unknown) { setError(err instanceof Error ? err.message : "Failed"); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    await fetch(`${API}/blog/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${getToken()}` } });
    fetchPosts();
  };

  const f = (key: keyof typeof emptyForm) => (v: string) => setForm(p => ({ ...p, [key]: v }));

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <AdminSidebar active="Blog" />

      <main className="ml-56 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Blog Posts ({posts.length})</h1>
            <p className="text-gray-400 text-sm mt-1">Create and manage blog articles</p>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-bold hover:bg-purple-700 transition-colors">
            + New Post
          </button>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-400 border border-gray-100">No blog posts yet.</div>
        ) : (
          <div className="space-y-4">
            {posts.map(p => (
              <div key={p._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-5 items-start hover:shadow-md transition-shadow">
                {p.image && <img src={p.image} alt={p.title} className="w-24 h-16 rounded-xl object-cover shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-800 truncate">{p.title}</h3>
                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${statusColors[p.status] || "bg-gray-100 text-gray-600"}`}>{p.status}</span>
                    {p.featured && <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-yellow-100 text-yellow-700">⭐ Featured</span>}
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-600 font-bold">{p.tag}</span>
                  </div>
                  <p className="text-gray-500 text-xs line-clamp-2 mb-2">{p.excerpt}</p>
                  <div className="flex gap-3 text-[11px] text-gray-400">
                    <span>✍️ {p.author}</span>
                    <span>⏱ {p.readTime}</span>
                    <span>📅 {new Date(p.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEdit(p)} className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-100 transition-colors">Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="px-4 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 transition-colors">Delete</button>
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
              <h2 className="text-lg font-black text-gray-900">{editPost ? "Edit Post" : "New Blog Post"}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>
            <form onSubmit={handleSave} className="p-6 flex flex-col gap-4">
              {error && <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>}

              <BField label="Title *" value={form.title} onChange={f("title")} required />
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Excerpt *</label>
                <textarea value={form.excerpt} onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))} required rows={2}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm resize-none" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Full Content</label>
                <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} rows={5}
                  placeholder="Write the full blog post content here..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Tag / Category</label>
                  <select value={form.tag} onChange={e => setForm(p => ({ ...p, tag: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm">
                    {tagOptions.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Status</label>
                  <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm">
                    <option>Published</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <BField label="Author" value={form.author} onChange={f("author")} placeholder="Rajesh K." />
                <BField label="Read Time" value={form.readTime} onChange={f("readTime")} placeholder="5 min" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="featured" checked={form.featured === "true"} onChange={e => setForm(p => ({ ...p, featured: String(e.target.checked) }))} className="w-4 h-4 accent-purple-600" />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">Mark as Featured Post</label>
              </div>

              {/* Image upload */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Cover Image</label>
                <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:border-purple-400 transition-colors">
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="mx-auto max-h-32 rounded-lg object-cover" />
                  ) : (
                    <div className="text-gray-400"><div className="text-3xl mb-1">🖼️</div><div className="text-sm">Click to upload cover image</div></div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) { setImageFile(f); setImagePreview(URL.createObjectURL(f)); } }} className="hidden" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 disabled:opacity-60">
                  {saving ? "Saving…" : editPost ? "Update Post" : "Publish Post"}
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

const BField = ({ label, value, onChange, required, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string;
}) => (
  <div>
    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">{label}</label>
    <input value={value} onChange={e => onChange(e.target.value)} required={required} placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm" />
  </div>
);
