import { useEffect, useState } from "react";

interface SettingItem {
  _id: string; key: string; label: string; value: string; group: string; type: string;
}

const API = "http://localhost:5000/api";
const getToken = () => localStorage.getItem("speshway_admin_token");

const groupLabels: Record<string, { icon: string; title: string }> = {
  stats: { icon: "📊", title: "Stats / Counters" },
  site: { icon: "🌐", title: "Site Information" },
  contact: { icon: "📞", title: "Contact Details" },
  social: { icon: "📱", title: "Social Media Links" },
  seo: { icon: "🔍", title: "SEO Settings" },
  home: { icon: "🏠", title: "Home Page Text" },
  appearance: { icon: "🎨", title: "Appearance & Misc" },
};

export default function SiteSettingsPanel({ admin }: { admin?: { email?: string; role?: string } | null }) {
  const [items, setItems] = useState<SettingItem[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [activeGroup, setActiveGroup] = useState("stats");

  useEffect(() => {
    fetch(`${API}/settings/all`, { headers: { Authorization: `Bearer ${getToken()}` } })
      .then(r => r.json())
      .then((data: SettingItem[]) => {
        setItems(Array.isArray(data) ? data : []);
        const map: Record<string, string> = {};
        data.forEach(i => { map[i.key] = i.value; });
        setValues(map);
      });
  }, []);

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

  const groups = [...new Set(items.map(i => i.group))].sort((a, b) => {
    const order = ["stats", "site", "contact", "social", "seo", "home", "appearance"];
    return order.indexOf(a) - order.indexOf(b);
  });
  const groupItems = items.filter(i => i.group === activeGroup);

  return (
    <div className="space-y-6">
      {/* Admin info card */}
      {admin && (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex gap-6 items-center">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 font-black text-xl">
            {admin.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">{admin.email}</p>
            <p className="text-xs text-gray-400 mt-0.5">{admin.role} · API: {API}</p>
          </div>
        </div>
      )}

      {/* ── Stats Quick Edit ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            📊 Stats / Counters
            <span className="text-xs text-gray-400 font-normal">— shown on the homepage</span>
          </h2>
          <button
            onClick={() => handleSaveGroup("stats")}
            disabled={saving["stats"]}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition-colors ${saved["stats"] ? "bg-green-500 text-white" : "bg-purple-600 text-white hover:bg-purple-700"} disabled:opacity-60`}
          >
            {saving["stats"] ? "Saving…" : saved["stats"] ? "✓ Saved" : "Save All Stats"}
          </button>
        </div>
        <div className="p-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { numKey: "stat_projects", suffixKey: "stat_projects_suffix", label: "Projects Delivered", icon: "🚀", color: "purple" },
            { numKey: "stat_clients", suffixKey: "stat_clients_suffix", label: "Happy Clients", icon: "😊", color: "blue" },
            { numKey: "stat_team", suffixKey: "stat_team_suffix", label: "Team Members", icon: "👥", color: "green" },
            { numKey: "stat_experience", suffixKey: "stat_experience_suffix", label: "Years Experience", icon: "⭐", color: "orange" },
          ].map(stat => (
            <div key={stat.numKey} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{stat.icon}</span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</span>
              </div>
              {/* Preview */}
              <div className="text-3xl font-black text-purple-600 mb-3">
                {values[stat.numKey] || "0"}{values[stat.suffixKey] || "+"}
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Number</label>
                  <input
                    type="number"
                    value={values[stat.numKey] || ""}
                    onChange={e => setValues(p => ({ ...p, [stat.numKey]: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm font-bold"
                    min="0"
                  />
                </div>
                <div className="w-16">
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Suffix</label>
                  <input
                    type="text"
                    value={values[stat.suffixKey] || ""}
                    onChange={e => setValues(p => ({ ...p, [stat.suffixKey]: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm font-bold text-center"
                    maxLength={3}
                    placeholder="+"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
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

                  {item.type === "color" ? (
                    <div className="flex gap-3 items-center">
                      <div className="relative flex items-center gap-2 flex-1 px-4 py-2.5 rounded-xl border-2 border-gray-200 focus-within:border-purple-500 transition-all bg-white">
                        <input
                          type="color"
                          value={values[item.key] || "#7c3aed"}
                          onChange={e => setValues(p => ({ ...p, [item.key]: e.target.value }))}
                          className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent p-0"
                        />
                        <input
                          type="text"
                          value={values[item.key] || ""}
                          onChange={e => setValues(p => ({ ...p, [item.key]: e.target.value }))}
                          onKeyDown={e => e.key === "Enter" && handleSave(item.key)}
                          placeholder="#000000"
                          className="flex-1 text-sm focus:outline-none font-mono"
                        />
                        <div className="w-6 h-6 rounded-full border border-gray-200 shrink-0" style={{ background: values[item.key] || "#7c3aed" }} />
                      </div>
                      <button onClick={() => handleSave(item.key)} disabled={saving[item.key]}
                        className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${saved[item.key] ? "bg-green-500 text-white" : "bg-purple-600 text-white hover:bg-purple-700"} disabled:opacity-60`}>
                        {saving[item.key] ? "…" : saved[item.key] ? "✓" : "Save"}
                      </button>
                    </div>
                  ) : item.type === "toggle" ? (
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
                  <p className="text-[10px] text-gray-400 mt-1 font-mono hidden">{item.key}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
