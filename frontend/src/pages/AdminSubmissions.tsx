import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";

interface Application {
  _id: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  resumeUrl: string;
  resumeOriginalName: string;
  status: string;
  createdAt: string;
}

const API = "/api";
const getToken = () => localStorage.getItem("speshway_admin_token");

const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  Reviewed: "bg-yellow-100 text-yellow-700",
  Shortlisted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function AdminSubmissions() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selected, setSelected] = useState<Application | null>(null);

  useEffect(() => {
    if (!getToken()) return navigate("/admin", { replace: true });
    fetch(`${API}/jobs/applications/all`, { headers: { Authorization: `Bearer ${getToken()}` } })
      .then(r => r.json())
      .then(data => { setApplications(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [navigate]);

  const updateStatus = async (appId: string, status: string) => {
    await fetch(`${API}/jobs/applications/${appId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ status }),
    });
    setApplications(prev => prev.map(a => a._id === appId ? { ...a, status } : a));
    if (selected?._id === appId) setSelected(prev => prev ? { ...prev, status } : null);
  };

  const filtered = applications.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.jobTitle.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <AdminSidebar active="Submissions" />

      <main className="lg:ml-56 flex-1 p-4 md:p-6 pt-16 lg:pt-6 min-w-0">
        <div className="flex items-center justify-between mb-6 gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-gray-900">Job Submissions</h1>
            <p className="text-gray-400 text-sm mt-1">All job applications with resume and details</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by name, email or position..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm"
          />
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-sm font-medium">
            {["All", "New", "Reviewed", "Shortlisted", "Rejected"].map(s => <option key={s}>{s}</option>)}
          </select>
          <div className="px-4 py-2.5 rounded-xl bg-purple-50 text-purple-700 text-sm font-bold">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-400 border border-gray-100">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-400 border border-gray-100">No submissions found.</div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Applicant", "Position", "Contact", "Date", "Resume", "Status", "Actions"].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(a => (
                  <tr key={a._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-800">{a.name}</div>
                      <div className="text-xs text-gray-400">{a.email}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-600 font-medium">{a.jobTitle}</td>
                    <td className="py-3 px-4 text-gray-500 text-xs">{a.phone || "—"}</td>
                    <td className="py-3 px-4 text-gray-400 text-xs whitespace-nowrap">{fmt(a.createdAt)}</td>
                    <td className="py-3 px-4">
                      {a.resumeUrl ? (
                        <a href={a.resumeUrl} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-bold hover:bg-green-100 transition-colors">
                          📄 Download
                        </a>
                      ) : (
                        <span className="text-gray-300 text-xs">No file</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold ${statusColors[a.status] || "bg-gray-100 text-gray-600"}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button onClick={() => setSelected(a)}
                          className="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-600 text-xs font-bold hover:bg-purple-100 transition-colors">
                          View
                        </button>
                        <select value={a.status} onChange={e => updateStatus(a._id, e.target.value)}
                          className="px-2 py-1 rounded-lg border border-gray-200 text-xs font-medium focus:outline-none focus:border-purple-400">
                          {["New", "Reviewed", "Shortlisted", "Rejected"].map(s => <option key={s}>{s}</option>)}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-[400] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-black text-gray-900">Application Details</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">x</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Detail label="Name" value={selected.name} />
                <Detail label="Email" value={selected.email} />
                <Detail label="Phone" value={selected.phone || "—"} />
                <Detail label="Position" value={selected.jobTitle} />
                <Detail label="Applied On" value={fmt(selected.createdAt)} />
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Status</p>
                  <select value={selected.status} onChange={e => updateStatus(selected._id, e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 text-sm font-bold focus:border-purple-500 focus:outline-none">
                    {["New", "Reviewed", "Shortlisted", "Rejected"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {selected.coverLetter && (
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Cover Letter</p>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-4 leading-relaxed">{selected.coverLetter}</p>
                </div>
              )}

              {selected.resumeUrl ? (
                <a href={selected.resumeUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 transition-colors">
                  📄 Download Resume ({selected.resumeOriginalName || "resume"})
                </a>
              ) : (
                <div className="py-3 rounded-xl bg-gray-100 text-gray-400 text-sm text-center">No resume uploaded</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
    <p className="text-sm text-gray-800 font-medium">{value}</p>
  </div>
);
