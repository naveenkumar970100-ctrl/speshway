import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/logo-speshway.png";

const navItems = [
  { path: "/admin/dashboard", icon: "🚀", label: "Projects" },
  { path: "/admin/dashboard#services", icon: "⚙️", label: "Services" },
  { path: "/admin/carousel", icon: "🎠", label: "Carousel" },
  { path: "/admin/jobs", icon: "💼", label: "Jobs" },
  { path: "/admin/submissions", icon: "📋", label: "Submissions" },
  { path: "/admin/team", icon: "👥", label: "Team" },
  { path: "/admin/blog", icon: "📝", label: "Blog" },
  { path: "/admin/testimonials", icon: "💬", label: "Testimonials" },
  { path: "/admin/settings", icon: "🔧", label: "Settings" },
];

export default function AdminSidebar({ active }: { active: string }) {
  const navigate = useNavigate();

  return (
    <aside className="w-56 bg-[#1e1b2e] text-white flex flex-col fixed top-0 left-0 h-full z-50 py-6 px-4">
      <div className="flex items-center gap-2 mb-8">
        <img src={logo} alt="" className="w-8 h-8 object-contain" />
        <span className="font-bold text-sm">Speshway Admin</span>
      </div>
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(n => (
          <button
            key={n.label}
            onClick={() => navigate(n.path.replace(/#.*/, ""))}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${
              active === n.label
                ? "bg-purple-600/40 text-white"
                : "text-purple-300 hover:bg-purple-600/20 hover:text-white"
            }`}
          >
            {n.icon} {n.label}
          </button>
        ))}
      </nav>
      <button
        onClick={() => { localStorage.removeItem("speshway_admin_token"); navigate("/admin"); }}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-500/15 text-sm font-medium"
      >
        🚪 Logout
      </button>
    </aside>
  );
}
