import { lazy, Suspense, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import PageReveal from "@/components/PageReveal";
import { ThemeProvider } from "@/context/ThemeContext";
import { apiUrl } from "@/lib/api";

// Eagerly load only the home page
import Index from "./pages/Index";

// Lazy load all other pages
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Projects = lazy(() => import("./pages/Projects"));
const Blog = lazy(() => import("./pages/Blog"));
const Team = lazy(() => import("./pages/Team"));
const Career = lazy(() => import("./pages/Career"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const JobDetail = lazy(() => import("./pages/JobDetail"));
const JobApply = lazy(() => import("./pages/JobApply"));

// Admin pages
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminCarousel = lazy(() => import("./pages/AdminCarousel"));
const AdminJobs = lazy(() => import("./pages/AdminJobs"));
const AdminTeam = lazy(() => import("./pages/AdminTeam"));
const AdminBlog = lazy(() => import("./pages/AdminBlog"));
const AdminSettings = lazy(() => import("./pages/AdminSettings"));
const AdminSubmissions = lazy(() => import("./pages/AdminSubmissions"));
const AdminTestimonials = lazy(() => import("./pages/AdminTestimonials"));
const AdminPhoneShowcase = lazy(() => import("./pages/AdminPhoneShowcase"));

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const App = () => {
  const [maintenance, setMaintenance] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(apiUrl("/api/settings"))
      .then(r => r.json())
      .then((s: Record<string, string>) => {
        const root = document.documentElement;
        if (s.color_primary) root.style.setProperty("--primary", hexToHsl(s.color_primary));
        if (s.color_secondary) root.style.setProperty("--secondary", hexToHsl(s.color_secondary));
        if (s.color_accent) root.style.setProperty("--accent", hexToHsl(s.color_accent));
        setMaintenance(s.maintenance_mode === "true");
      })
      .catch(() => setMaintenance(false));
  }, []);

  // Block public pages while checking — allow admin paths immediately
  const path = window.location.pathname;
  const isAdmin = path.startsWith("/admin");

  // Still loading settings — show spinner only for public pages
  if (maintenance === null && !isAdmin) {
    return (
      <ThemeProvider>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      </ThemeProvider>
    );
  }

  // Maintenance mode active — show maintenance page for public visitors
  if (maintenance === true && !isAdmin) {
    return (
      <ThemeProvider>
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#1e1b2e] text-white text-center px-6">
          <div className="mb-8 text-6xl">🔧</div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">Under Maintenance</h1>
          <p className="text-white/60 text-lg md:text-xl max-w-lg leading-relaxed mb-8">
            We're currently performing scheduled maintenance. We'll be back online shortly. Thank you for your patience!
          </p>
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            Maintenance in progress — check back soon
          </div>
          <p className="mt-8 text-white/30 text-sm">
            For urgent inquiries:{" "}
            <a href="mailto:info@speshway.com" className="text-purple-400 hover:underline">
              info@speshway.com
            </a>
          </p>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <PageReveal />
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:slug" element={<ServiceDetail />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/career" element={<Career />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/admin" element={<AdminLogin />} />
                  <Route path="/admin-dashboard" element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/carousel" element={<AdminCarousel />} />
                  <Route path="/admin/jobs" element={<AdminJobs />} />
                  <Route path="/admin/team" element={<AdminTeam />} />
                  <Route path="/admin/blog" element={<AdminBlog />} />
                  <Route path="/admin/settings" element={<AdminSettings />} />
                  <Route path="/admin/submissions" element={<AdminSubmissions />} />
                  <Route path="/admin/testimonials" element={<AdminTestimonials />} />
                  <Route path="/admin/phone-showcase" element={<AdminPhoneShowcase />} />
                  <Route path="/blog/:id" element={<BlogDetail />} />
                  <Route path="/career/:id" element={<JobDetail />} />
                  <Route path="/career/:id/apply" element={<JobApply />} />
                  <Route path="/projects/:id" element={<ProjectDetail />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
