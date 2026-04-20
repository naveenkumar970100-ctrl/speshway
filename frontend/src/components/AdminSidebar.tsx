import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAssets } from "@/hooks/useAssets";

const navItems = [
  { path: "/admin/dashboard", icon: "🚀", label: "Projects" },
  { path: "/admin/dashboard", icon: "⚙️", label: "Services" },
  { path: "/admin/carousel", icon: "🎠", label: "Carousel" },
  { path: "/admin/jobs", icon: "💼", label: "Jobs" },
  { path: "/admin/submissions", icon: "📋", label: "Submissions" },
  { path: "/admin/team", icon: "👥", label: "Team" },
  { path: "/admin/blog", icon: "📝", label: "Blog" },
  { path: "/admin/testimonials", icon: "💬", label: "Testimonials" },
  { path: "/admin/phone-showcase", icon: "📱", label: "Phone Showcase" },
  { path: "/admin/settings", icon: "🔧", label: "Settings" },
];

export default function AdminSidebar({ active }: { active: string }) {
  const navigate = useNavigate();
  const { logo } = useAssets();
  const [open, setOpen] = useState(false);

  const handleNav = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("speshway_admin_token");
    localStorage.removeItem("speshway_admin_user");
    navigate("/admin");
    setOpen(false);
  };

  return (
    <>
      {/* Hamburger — visible only on mobile/tablet (below lg) */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-3 left-3 z-[300] lg:hidden w-10 h-10 bg-[#2d1b69] rounded-xl flex items-center justify-center shadow-lg"
        aria-label="Open menu"
      >
        <span className="flex flex-col gap-[5px]">
          <span className="block w-5 h-0.5 bg-white rounded" />
          <span className="block w-5 h-0.5 bg-white rounded" />
          <span className="block w-5 h-0.5 bg-white rounded" />
        </span>
      </button>

      {/* Overlay — mobile/tablet only */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-[250] lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-[260] w-56 bg-[#1e1b2e] text-white flex flex-col py-5 px-3
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Close — mobile only */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 lg:hidden text-purple-300 hover:text-white text-xl leading-none"
          aria-label="Close menu"
        >
          ✕
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-6 pr-6">
          <img src={logo} alt="" className="w-8 h-8 object-contain shrink-0" />
          <span className="font-bold text-sm leading-tight">Speshway Admin</span>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 flex-1 overflow-y-auto">
          {navItems.map(n => (
            <button
              key={n.label}
              onClick={() => handleNav(n.path)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${
                active === n.label
                  ? "bg-purple-600/40 text-white"
                  : "text-purple-300 hover:bg-purple-600/20 hover:text-white"
              }`}
            >
              <span className="text-base">{n.icon}</span>
              <span>{n.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/15 text-sm font-medium mt-3"
        >
          🚪 Logout
        </button>
      </aside>
    </>
  );
}
