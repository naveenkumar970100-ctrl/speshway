import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import PageReveal from "@/components/PageReveal";
import { ThemeProvider } from "@/context/ThemeContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Team from "./pages/Team";
import Career from "./pages/Career";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProjectDetail from "./pages/ProjectDetail";
import AdminCarousel from "./pages/AdminCarousel";
import AdminJobs from "./pages/AdminJobs";
import AdminTeam from "./pages/AdminTeam";
import AdminBlog from "./pages/AdminBlog";
import AdminSettings from "./pages/AdminSettings";
import BlogDetail from "./pages/BlogDetail";
import JobDetail from "./pages/JobDetail";
import JobApply from "./pages/JobApply";

const hexToHsl = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
};

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    fetch("http://localhost:5000/api/settings")
      .then(r => r.json())
      .then((s: Record<string, string>) => {
        const root = document.documentElement;
        if (s.color_primary) root.style.setProperty("--primary", hexToHsl(s.color_primary));
        if (s.color_secondary) root.style.setProperty("--secondary", hexToHsl(s.color_secondary));
        if (s.color_accent) root.style.setProperty("--accent", hexToHsl(s.color_accent));
      })
      .catch(() => {});
  }, []);

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <PageReveal />
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/team" element={<Team />} />
                <Route path="/career" element={<Career />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/carousel" element={<AdminCarousel />} />
                <Route path="/admin/jobs" element={<AdminJobs />} />
                <Route path="/admin/team" element={<AdminTeam />} />
                <Route path="/admin/blog" element={<AdminBlog />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/career/:id" element={<JobDetail />} />
                <Route path="/career/:id/apply" element={<JobApply />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
