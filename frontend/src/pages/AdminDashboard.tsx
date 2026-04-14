import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/logo-speshway.png";
import SiteSettingsPanel from "@/components/SiteSettingsPanel";

interface Admin { name: string; email: string; role: string; }
interface Project {
  _id: string; title: string; category: string; description: string;
  tech: string[]; liveUrl: string; features: string[]; status: string;
  client: string; image: string; order: number;
}
interface Service {
  _id: string; title: string; description: string; icon: string;
  color: string; features: string[]; order: number; isActive: boolean;
}

const API = "/api";
const getToken = () => localStorage.getItem("speshway_admin_token");

const statusColors: Record<string, string> = {
  Completed: "bg-green-100 text-green-700",
  Active: "bg-purple-100 text-purple-700",
  "In Progress": "bg-yellow-100 text-yellow-700",
};

const emptyProjectForm = { title: "", category: "", description: "", tech: "", liveUrl: "", features: "", status: "In Progress", client: "", order: "0" };
const emptyServiceForm = { title: "", description: "", icon: "Code", color: "primary", features: "", order: "0" };

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [section, setSection] = useState((location.state as { section?: string })?.section || "projects");

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyProjectForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Services state
  const [services, setServices] = useState<Service[]>([]);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editService, setEditService] = useState<Service | null>(null);
  const [serviceForm, setServiceForm] = useState(emptyServiceForm);
  const [serviceSaving, setServiceSaving] = useState(false);
  const [serviceError, setServiceError] = useState("");

  useEffect(() => {
    const t = getToken();
    if (!t) return navigate("/admin", { replace: true });
    const u = localStorage.getItem("speshway_admin_user");
    if (u) setAdmin(JSON.parse(u));
    fetchProjects();
    fetchServices();
  }, [navigate]);

  const apiFetch = async (path: string, opts: RequestInit = {}) => {
    const res = await fetch(`${API}${path}`, {
      ...opts,
      headers: { Authorization: `Bearer ${getToken()}`, ...((opts.headers as Record<string,string>) || {}) },
    });
    if (res.status === 401) { logout(); throw new Error("Unauthorized"); }
    return res;
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/projects`);
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch { setProjects([]); }
    setLoading(false);
  };

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API}/services`);
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch { setServices([]); }
  };

  const logout = () => {
    localStorage.removeItem("speshway_admin_token");
    localStorage.removeItem("speshway_admin_user");
    navigate("/admin", { replace: true });
  };

  const openAdd = () => {
    setEditProject(null);
    setForm(emptyProjectForm);
    setImageFile(null);
    setImagePreview("");
    setError("");
    setShowModal(true);
  };

  const openEdit = (p: Project) => {
    setEditProject(p);
    setForm({
      title: p.title, category: p.category, description: p.description,
      tech: p.tech.join(", "), liveUrl: p.liveUrl, features: p.features.join("\n"),
      status: p.status, client: p.client, order: String(p.order),
    });
    setImageFile(null);
    setImagePreview(p.image || "");
    setError("");
    setShowModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("category", form.category);
      fd.append("description", form.description);
      fd.append("tech", JSON.stringify(form.tech.split(",").map(t => t.trim()).filter(Boolean)));
      fd.append("features", JSON.stringify(form.features.split("\n").map(f => f.trim()).filter(Boolean)));
      fd.append("liveUrl", form.liveUrl);
      fd.append("status", form.status);
      fd.append("client", form.client);
      fd.append("order", form.order);
      if (imageFile) fd.append("image", imageFile);

      const res = await apiFetch(
        editProject ? `/projects/${editProject._id}` : "/projects",
        { method: editProject ? "PUT" : "POST", body: fd }
      );
      if (!res.ok) { const d = await res.json(); throw new Error(d.message); }
      setShowModal(false);
      fetchProjects();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await apiFetch(`/projects/${id}`, { method: "DELETE" });
      fetchProjects();
    } catch {}
  };

  // Service handlers
  const openAddService = () => {
    setEditService(null);
    setServiceForm(emptyServiceForm);
    setServiceError("");
    setShowServiceModal(true);
  };

  const openEditService = (s: Service) => {
    setEditService(s);
    setServiceForm({
      title: s.title, description: s.description, icon: s.icon,
      color: s.color, features: s.features.join("\n"), order: String(s.order),
    });
    setServiceError("");
    setShowServiceModal(true);
  };

  const handleServiceSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setServiceSaving(true);
    setServiceError("");
    try {
      const body = {
        title: serviceForm.title,
        description: serviceForm.description,
        icon: serviceForm.icon,
        color: serviceForm.color,
        features: serviceForm.features,
        order: serviceForm.order,
      };
      const res = await apiFetch(
        editService ? `/services/${editService._id}` : "/services",
        { method: editService ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
      );
      if (!res.ok) { const d = await res.json(); throw new Error(d.message); }
      setShowServiceModal(false);
      fetchServices();
    } catch (err: unknown) {
      setServiceError(err instanceof Error ? err.message : "Failed to save");
    }
    setServiceSaving(false);
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    try {
      await apiFetch(`/services/${id}`, { method: "DELETE" });
      fetchServices();
    } catch {}
  };

  const navItems = [
    { key: "projects", icon: "🚀", label: "Projects" },
    { key: "services", icon: "⚙️", label: "Services" },
  ];

  const extraNav = [
    { path: "/admin/carousel", icon: "🎠", label: "Carousel" },
    { path: "/admin/jobs", icon: "💼", label: "Jobs" },
    { path: "/admin/submissions", icon: "📋", label: "Submissions" },
    { path: "/admin/team", icon: "👥", label: "Team" },
    { path: "/admin/blog", icon: "📝", label: "Blog" },
    { path: "/admin/testimonials", icon: "💬", label: "Testimonials" },
  ];

  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-56 bg-[#1e1b2e] text-white flex flex-col fixed top-0 left-0 h-full z-50 py-6 px-4">
        <div className="flex items-center gap-2 mb-8">
          <img src={logo} alt="" className="w-8 h-8 object-contain" />
          <span className="font-bold text-sm">Speshway Admin</span>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(n => (
            <button key={n.key} onClick={() => setSection(n.key)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-left transition-all ${section === n.key ? "bg-purple-600/40 text-white" : "text-purple-300 hover:bg-purple-600/20 hover:text-white"}`}>
              {n.icon} {n.label}
            </button>
          ))}
          {extraNav.map(n => (
            <button key={n.path} onClick={() => navigate(n.path)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-purple-300 hover:bg-purple-600/20 hover:text-white text-sm font-medium text-left transition-all">
              {n.icon} {n.label}
            </button>
          ))}
          <button onClick={() => setSection("settings")}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-left transition-all ${section === "settings" ? "bg-purple-600/40 text-white" : "text-purple-300 hover:bg-purple-600/20 hover:text-white"}`}>
            🔧 Settings
          </button>
        </nav>
        <button onClick={logout} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-500/15 text-sm font-medium">
          🚪 Logout
        </button>
      </aside>

      {/* Main */}
      <main className="ml-56 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900 capitalize">{section}</h1>
            <p className="text-sm text-gray-400 mt-0.5">{greet}, {admin?.name} 👋</p>
          </div>
          <span className="bg-purple-100 text-purple-700 text-xs font-bold px-4 py-1.5 rounded-full">{admin?.role}</span>
        </div>

        {/* Projects Section */}
        {section === "projects" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-lg">All Projects ({projects.length})</h3>
              <button onClick={openAdd}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-bold hover:bg-purple-700 transition-colors">
                + Add New Project
              </button>
            </div>
            {loading ? (
              <div className="p-12 text-center text-gray-400">Loading…</div>
            ) : projects.length === 0 ? (
              <div className="p-12 text-center text-gray-400">No projects yet. Add your first one!</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {["Image", "Title", "Category", "Client", "Tech", "Status", "Actions"].map(h => (
                        <th key={h} className="text-left py-3 px-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map(p => (
                      <tr key={p._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4">
                          {p.image ? (
                            <img src={p.image} alt={p.title} className="w-14 h-10 object-cover rounded-lg" />
                          ) : (
                            <div className="w-14 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-xs">No img</div>
                          )}
                        </td>
                        <td className="py-3 px-4 font-semibold text-gray-800 max-w-[160px] truncate">{p.title}</td>
                        <td className="py-3 px-4 text-gray-500 text-xs">{p.category}</td>
                        <td className="py-3 px-4 text-gray-500 text-xs">{p.client}</td>
                        <td className="py-3 px-4 text-gray-400 text-xs max-w-[120px] truncate">{p.tech.join(", ")}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${statusColors[p.status] || "bg-gray-100 text-gray-600"}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button onClick={() => openEdit(p)}
                              className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-100 transition-colors">
                              Edit
                            </button>
                            <button onClick={() => handleDelete(p._id)}
                              className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 transition-colors">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Services Section */}
        {section === "services" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-lg">All Services ({services.length})</h3>
              <button onClick={openAddService}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-bold hover:bg-purple-700 transition-colors">
                + Add New Service
              </button>
            </div>
            {services.length === 0 ? (
              <div className="p-12 text-center text-gray-400">No services yet. Add your first one!</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                {services.map(s => (
                  <div key={s._id} className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${s.color === "primary" ? "bg-purple-100 text-purple-600" : s.color === "secondary" ? "bg-emerald-100 text-emerald-600" : "bg-pink-100 text-pink-600"}`}>
                        {s.icon?.charAt(0) || "S"}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openEditService(s)}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-100 transition-colors">
                          Edit
                        </button>
                        <button onClick={() => handleDeleteService(s._id)}
                          className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-1">{s.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{s.description}</p>
                    {s.features.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {s.features.slice(0, 3).map((f, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{f}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings */}
        {section === "settings" && (
          <SiteSettingsPanel admin={admin} />
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-black text-gray-900">{editProject ? "Edit Project" : "Add New Project"}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
            </div>
            <form onSubmit={handleSave} className="p-6 flex flex-col gap-4">
              {error && <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>}

              <div className="grid grid-cols-2 gap-4">
                <Field label="Title *" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} required />
                <Field label="Category *" value={form.category} onChange={v => setForm(f => ({ ...f, category: v }))} required placeholder="Web & Mobile" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Client" value={form.client} onChange={v => setForm(f => ({ ...f, client: v }))} />
                <Field label="Live URL" value={form.liveUrl} onChange={v => setForm(f => ({ ...f, liveUrl: v }))} placeholder="https://..." />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Description *</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm resize-none" />
              </div>
              <Field label="Technologies (comma separated)" value={form.tech} onChange={v => setForm(f => ({ ...f, tech: v }))} placeholder="React, Node.js, MongoDB" />
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Key Features (one per line)</label>
                <textarea value={form.features} onChange={e => setForm(f => ({ ...f, features: e.target.value }))} rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm">
                    <option>In Progress</option>
                    <option>Active</option>
                    <option>Completed</option>
                  </select>
                </div>
                <Field label="Order (display)" value={form.order} onChange={v => setForm(f => ({ ...f, order: v }))} type="number" />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Project Image</label>
                <div onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-purple-400 transition-colors">
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="mx-auto max-h-40 rounded-lg object-cover" />
                  ) : (
                    <div className="text-gray-400">
                      <div className="text-3xl mb-2">📁</div>
                      <div className="text-sm font-medium">Click to upload image</div>
                      <div className="text-xs mt-1">JPG, PNG, WEBP — max 10MB</div>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving}
                  className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 transition-colors disabled:opacity-60">
                  {saving ? "Saving…" : editProject ? "Update Project" : "Create Project"}
                </button>
                <button type="button" onClick={() => setShowModal(false)}
                  className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-black text-gray-900">{editService ? "Edit Service" : "Add New Service"}</h2>
              <button onClick={() => setShowServiceModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
            </div>
            <form onSubmit={handleServiceSave} className="p-6 flex flex-col gap-4">
              {serviceError && <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{serviceError}</div>}

              <SField label="Title *" value={serviceForm.title} onChange={v => setServiceForm(f => ({ ...f, title: v }))} required />
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Description *</label>
                <textarea value={serviceForm.description} onChange={e => setServiceForm(f => ({ ...f, description: e.target.value }))} required rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm resize-none" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Features (one per line)</label>
                <textarea value={serviceForm.features} onChange={e => setServiceForm(f => ({ ...f, features: e.target.value }))} rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm resize-none"
                  placeholder={"Feature 1\nFeature 2\nFeature 3"} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <SField label="Icon Name" value={serviceForm.icon} onChange={v => setServiceForm(f => ({ ...f, icon: v }))} placeholder="Code" />
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Color</label>
                  <select value={serviceForm.color} onChange={e => setServiceForm(f => ({ ...f, color: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm">
                    <option value="primary">Primary (Purple)</option>
                    <option value="secondary">Secondary (Green)</option>
                    <option value="accent">Accent (Pink)</option>
                  </select>
                </div>
              </div>
              <SField label="Order" value={serviceForm.order} onChange={v => setServiceForm(f => ({ ...f, order: v }))} type="number" />

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={serviceSaving}
                  className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 transition-colors disabled:opacity-60">
                  {serviceSaving ? "Saving…" : editService ? "Update Service" : "Create Service"}
                </button>
                <button type="button" onClick={() => setShowServiceModal(false)}
                  className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const Field = ({ label, value, onChange, required, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void;
  required?: boolean; placeholder?: string; type?: string;
}) => (
  <div>
    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">{label}</label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} required={required} placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm transition-all" />
  </div>
);

const SField = Field;
