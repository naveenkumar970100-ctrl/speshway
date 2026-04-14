import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import PageReveal from "@/components/PageReveal";
import { ThemeProvider } from "@/context/ThemeContext";

// Eagerly load only the home page — everything else is lazy
import Index from "./pages/Index";

// Lazy load all other pages — splits into separate chunks
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

// Admin pages — lazy loaded separately
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminCarousel = lazy(() => import("./pages/AdminCarousel"));
const AdminJobs = lazy(() => import("./pages/AdminJobs"));
const AdminTeam = lazy(() => import("./pages/AdminTeam"));
const AdminBlog = lazy(() => import("./pages/AdminBlog"));
const AdminSettings = lazy(() => import("./pages/AdminSettings"));
const AdminSubmissions = lazy(() => import("./pages/AdminSubmissions"));
const AdminTestimonials = lazy(() => import("./pages/AdminTestimonials"));

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

// QueryClient with aggressive caching — data stays fresh for 5 min, cached for 10 min
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

// Minimal spinner for lazy route fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const App = () => {
  useEffect(() => {
    fetch("/api/settings")
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
                  <Route path="/blog/:id" element={<BlogDetail />} />
                  <Route path="/career/:id" element={<JobDetail />} />
                  <Route path="/career/:id/apply" element={<JobApply />} />
                  <Route path="/projects/:id" element={<ProjectDetail />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
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
