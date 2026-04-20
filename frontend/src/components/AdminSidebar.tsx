import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAssets } from "@/hooks/useAssets";
import { Menu, X } from "lucide-react";

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
  const { logo } = useAssets();
  const [open, setOpen] = useState(false);

  const handleNav = (path: string) => {
    navigate(path.replace(/#.*/, ""));
    setOpen(false); // close on mobile after navigation
  };

  const handleLogout = () => {
    localStorage.removeItem("speshway_admin_token");
    navigate("/admin");
  };

  return (
    <>
      {/* ── Hamburger button — mobile only ── */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-[200] flex md:hidden flex-col justify-center items-center gap-[5px] w-10 h-10 bg-purple-700 rounded-xl shadow-lg"
        aria-label="Open menu"
      >
        <Menu size={20} color="white" />
      </button>

      {/* ── Overlay — mobile only ── */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-[150] md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
          w-56 bg-[#1e1b2e] text-white flex flex-col fixed top-0 left-0 h-full z-[160] py-6 px-4
          transition-transform duration-300 ease-in-out
          md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Close button — mobile only */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 md:hidden text-purple-300 hover:text-white"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-8">
          <img src={logo} alt="" className="w-8 h-8 object-contain" />
          <span className="font-bold text-sm">Speshway Admin</span>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(n => (
            <button
              key={n.label}
              onClick={() => handleNav(n.path)}
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
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-500/15 text-sm font-medium"
        >
          🚪 Logout
        </button>
      </aside>
    </>
  );
}
