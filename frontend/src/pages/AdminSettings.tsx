import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo-speshway.png";

interface SettingItem {
  _id: string; key: string; label: string; value: string; group: string; type: string;
}

const API = "http://localhost:5000/api";
const getToken = () => localStorage.getItem("speshway_admin_token");

const groupLabels: Record<string, { icon: string; title: string }> = {
  site: { icon: "🌐", title: "Site Information" },
  contact: { icon: "📞", title: "Contact Details" },
  social: { icon: "📱", title: "Social Media Links" },
  seo: { icon: "🔍", title: "SEO Settings" },
  home: { icon: "🏠", title: "Home Page Text" },
  appearance: { icon: "🎨", title: "Appearance & Misc" },
};

export default function AdminSettings() {
  const navigate = useNavigate();
  const [items, setItems] = useState<SettingItem[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [activeGroup, setActiveGroup] = useState("site");

  useEffect(() => {
    if (!getToken()) return navigate("/admin", { replace: true });
    fetch(`${API}/settings/all`, { headers: { Authorization: `Bearer ${getToken()}` } })
      .then(r => r.json())
      .then((data: SettingItem[]) => {
        setItems(Array.isArray(data) ? data : []);
        const map: Record<string, string> = {};
        data.forEach(i => { map[i.key] = i.value; });
        setValues(map);
      });
  }, [navigate]);

  const handleSave = async (key: string) => {
    setSaving(p => ({ ...p, [key]: true }));
    try {
      await fetch(`${API}/settings/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ value: values[key] }),
      });
      setSaved(p => ({ ...p, [key]: true }));
      setTimeout(() => setSaved(p => ({ ...p, [key]: false })), 2000);
    } catch {}
    setSaving(p => ({ ...p, [key]: false }));
  };

  const handleSaveGroup = async (group: string) => {
    const groupItems = items.filter(i => i.group === group);
    const updates: Record<string, string> = {};
    groupItems.forEach(i => { updates[i.key] = values[i.key] || ""; });
    setSaving(p => ({ ...p, [group]: true }));
    try {
      await fetch(`${API}/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify(updates),
      });
      setSaved(p => ({ ...p, [group]: true }));
      setTimeout(() => setSaved(p => ({ ...p, [group]: false })), 2000);
    } catch {}
    setSaving(p => ({ ...p, [group]: false }));
  };

  const groups = [...new Set(items.map(i => i.group))];
  const groupItems = items.filter(i => i.group === activeGroup);

  const navItems = [
    { path: "/admin/dashboard", icon: "🚀", label: "Projects" },
    { path: "/admin/dashboard", icon: "⚙️", label: "Services" },
    { path: "/admin/carousel", icon: "🎠", label: "Carousel" },
    { path: "/admin/jobs", icon: "💼", label: "Jobs" },
    { path: "/admin/team", icon: "👥", label: "Team" },
    { path: "/admin/blog", icon: "📝", label: "Blog" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <aside className="w-56 bg-[#1e1b2e] text-white flex flex-col fixed top-0 left-0 h-full z-50 py-6 px-4">
        <div className="flex items-center gap-2 mb-8">
          <img src={logo} alt="" className="w-8 h-8 object-contain" />
          <span className="font-bold text-sm">Speshway Admin</span>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(n => (
            <button key={n.label} onClick={() => navigate(n.path)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-purple-300 hover:bg-purple-600/20 hover:text-white text-sm font-medium text-left">{n.icon} {n.label}</button>
          ))}
          <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-purple-600/40 text-white text-sm font-medium text-left">🔧 Settings</button>
        </nav>
        <button onClick={() => { localStorage.removeItem("speshway_admin_token"); navigate("/admin"); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-500/15 text-sm font-medium">🚪 Logout</button>
      </aside>

      <main className="ml-56 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-gray-900">Settings</h1>
          <p className="text-gray-400 text-sm mt-1">Manage all site settings — changes apply in real time</p>
        </div>

        <div className="flex gap-6">
          {/* Group tabs */}
          <div className="w-48 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {groups.map(g => {
                const meta = groupLabels[g] || { icon: "⚙️", title: g };
                return (
                  <button key={g} onClick={() => setActiveGroup(g)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-left border-b border-gray-50 last:border-0 transition-colors ${activeGroup === g ? "bg-purple-50 text-purple-700 font-bold" : "text-gray-600 hover:bg-gray-50"}`}>
                    <span>{meta.icon}</span>
                    <span>{meta.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Settings form */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-800">
                  {groupLabels[activeGroup]?.icon} {groupLabels[activeGroup]?.title || activeGroup}
                </h2>
                <button onClick={() => handleSaveGroup(activeGroup)} disabled={saving[activeGroup]}
                  className={`px-5 py-2 rounded-xl text-sm font-bold transition-colors ${saved[activeGroup] ? "bg-green-500 text-white" : "bg-purple-600 text-white hover:bg-purple-700"} disabled:opacity-60`}>
                  {saving[activeGroup] ? "Saving…" : saved[activeGroup] ? "✓ All Saved" : "Save All"}
                </button>
              </div>

              <div className="p-6 space-y-6">
                {groupItems.map(item => (
                  <div key={item.key}>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">{item.label}</label>

                    {item.type === "toggle" ? (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            const newVal = values[item.key] === "true" ? "false" : "true";
                            setValues(p => ({ ...p, [item.key]: newVal }));
                            setTimeout(() => handleSave(item.key), 100);
                          }}
                          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${values[item.key] === "true" ? "bg-purple-600" : "bg-gray-300"}`}>
                          <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${values[item.key] === "true" ? "translate-x-6" : "translate-x-0"}`} />
                        </button>
                        <span className="text-sm text-gray-600">{values[item.key] === "true" ? "Enabled" : "Disabled"}</span>
                      </div>
                    ) : item.type === "textarea" ? (
                      <div className="flex gap-3">
                        <textarea
                          value={values[item.key] || ""}
                          onChange={e => setValues(p => ({ ...p, [item.key]: e.target.value }))}
                          rows={3}
                          className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm resize-none transition-all"
                        />
                        <button onClick={() => handleSave(item.key)} disabled={saving[item.key]}
                          className={`px-4 py-2 rounded-xl text-sm font-bold self-start transition-colors ${saved[item.key] ? "bg-green-500 text-white" : "bg-purple-600 text-white hover:bg-purple-700"} disabled:opacity-60`}>
                          {saving[item.key] ? "…" : saved[item.key] ? "✓" : "Save"}
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <input
                          type={item.type === "url" ? "url" : "text"}
                          value={values[item.key] || ""}
                          onChange={e => setValues(p => ({ ...p, [item.key]: e.target.value }))}
                          onKeyDown={e => e.key === "Enter" && handleSave(item.key)}
                          placeholder={item.type === "url" ? "https://..." : ""}
                          className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm transition-all"
                        />
                        <button onClick={() => handleSave(item.key)} disabled={saving[item.key]}
                          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${saved[item.key] ? "bg-green-500 text-white" : "bg-purple-600 text-white hover:bg-purple-700"} disabled:opacity-60`}>
                          {saving[item.key] ? "…" : saved[item.key] ? "✓" : "Save"}
                        </button>
                      </div>
                    )}
                    <p className="text-[10px] text-gray-400 mt-1 font-mono">{item.key}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
