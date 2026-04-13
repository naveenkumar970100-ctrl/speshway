import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import MotionSection from "@/components/MotionSection";
import GooeyButton from "@/components/GooeyButton";
import TextReveal from "@/components/TextReveal";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface ApiProject {
  _id: string; title: string; category: string; description: string;
  tech: string[]; liveUrl: string; features: string[]; status: string; client: string; image: string;
}

const statusColors: Record<string, string> = {
  Completed: "bg-green-500/10 text-green-400 border-green-500/20",
  Active: "bg-primary/10 text-primary border-primary/20",
  "In Progress": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

const tagColors = ["primary", "secondary", "accent"] as const;

const Projects = () => {
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then(r => r.json())
      .then(data => { setProjects(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <PageHeader title="Our Projects" subtitle="Explore our successful deliveries across various industries." />

      {/* Projects Grid */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container relative">
          <div className="text-center mb-20">
            <MotionSection animation="parallax-reveal">
              <span className="text-primary text-sm font-bold uppercase tracking-[0.3em]">Portfolio</span>
              <TextReveal text="Our Work" className="text-4xl md:text-6xl font-heading font-bold mt-4 justify-center" />
              <p className="text-muted-foreground mt-6 text-lg font-light max-w-2xl mx-auto">
                Click any project to see full details, tech stack, and features.
              </p>
            </MotionSection>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <div className="text-5xl mb-4">🚀</div>
              <p className="text-xl font-semibold">No projects yet.</p>
              <p className="text-sm mt-2">Add projects from the admin dashboard.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((p, i) => (
                <AnimatedSection key={p._id} delay={i * 80} animation="card-rise">
                  <div
                    onClick={() => navigate(`/projects/${p._id}`)}
                    className="group cursor-pointer h-full bg-card rounded-3xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-[0_20px_60px_hsl(var(--primary)/0.15)] transition-all duration-500 hover:-translate-y-2 flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl">🚀</div>
                      )}
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <span className="bg-white text-primary font-bold text-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <ExternalLink size={14} /> View Details
                        </span>
                      </div>
                      {/* Status badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${statusColors[p.status] || "bg-muted text-muted-foreground border-border"}`}>
                          {p.status}
                        </span>
                      </div>
                      {/* Category badge */}
                      <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold bg-${tagColors[i % 3]}/20 text-${tagColors[i % 3]} border border-${tagColors[i % 3]}/20`}>
                          {p.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-heading font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
                        {p.title}
                      </h3>
                      {p.client && (
                        <p className="text-xs text-muted-foreground mb-3 font-medium">Client: {p.client}</p>
                      )}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                        {p.description}
                      </p>
                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {p.tech.slice(0, 4).map(t => (
                          <span key={t} className="px-3 py-1 rounded-lg glass text-[10px] font-bold text-muted-foreground uppercase tracking-wider border border-border">
                            {t}
                          </span>
                        ))}
                        {p.tech.length > 4 && (
                          <span className="px-3 py-1 rounded-lg text-[10px] font-bold text-muted-foreground">
                            +{p.tech.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-card/50 to-secondary/20" />
        <MotionSection animation="zoom-out" className="container text-center relative z-10">
          <TextReveal text="Have a Project in Mind?" className="text-4xl md:text-7xl font-heading font-black mb-8 justify-center leading-tight" />
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto text-xl font-light leading-relaxed">
            Let's build something amazing together. Our team is ready to bring your vision to life.
          </p>
          <Link to="/contact">
            <GooeyButton color="primary" className="!px-12 !py-5 text-lg">
              Start a Project <ArrowRight size={22} className="inline ml-2" />
            </GooeyButton>
          </Link>
        </MotionSection>
      </section>
    </Layout>
  );
};

export default Projects;

interface ApiProject {
  _id: string; title: string; category: string; description: string;
  tech: string[]; liveUrl: string; features: string[]; status: string; client: string; image: string;
}
interface RenderProject {
  id: string;
  title: string;
  category: string;
  desc: string;
  client?: string;
  tech: string[];
  tag: "primary" | "secondary" | "accent";
  phoneColor: "primary" | "secondary" | "accent";
  screen: React.ReactNode;
  isApi?: boolean;
  apiData?: ApiProject;
}

const stats = [
  { val: "50+", label: "Projects Delivered", color: "primary" },
  { val: "30+", label: "Happy Clients", color: "secondary" },
  { val: "98%", label: "On-Time Delivery", color: "accent" },
  { val: "4.9★", label: "Average Rating", color: "primary" },
];

const tagColors: Array<"primary" | "secondary" | "accent"> = ["primary", "secondary", "accent"];

const builtIn: RenderProject[] = [
  { id: "1", title: "E-Commerce Platform", category: "Web & Mobile", desc: "A full-featured online store with payment integration, inventory management, and real-time order tracking.", tech: ["React", "Node.js", "MongoDB"], tag: "primary", phoneColor: "primary", screen: <EcommerceScreen /> },
  { id: "2", title: "HealthCare App", category: "Mobile Development", desc: "Telemedicine platform connecting patients with doctors in real-time with vitals tracking and appointment booking.", tech: ["React Native", "Firebase", "WebRTC"], tag: "secondary", phoneColor: "secondary", screen: <HealthScreen /> },
  { id: "3", title: "Food Delivery App", category: "Mobile Development", desc: "Fast food ordering & delivery platform with real-time GPS tracking and restaurant management dashboard.", tech: ["Flutter", "Node.js", "Redis"], tag: "accent", phoneColor: "accent", screen: <FoodScreen /> },
  { id: "4", title: "Fitness Tracker", category: "Mobile App", desc: "Personal fitness tracking with AI-powered workout plans, progress analytics, and wearable integration.", tech: ["React Native", "Python", "TensorFlow"], tag: "primary", phoneColor: "primary", screen: <FitnessScreen /> },
  { id: "5", title: "FinTech Dashboard", category: "Web & Mobile", desc: "Banking and investment app with real-time portfolio management, analytics, and secure transactions.", tech: ["React", "Django", "PostgreSQL"], tag: "secondary", phoneColor: "secondary", screen: <FintechScreen /> },
  { id: "6", title: "Social Network", category: "Mobile Development", desc: "Community-driven social platform with feeds, stories, messaging, and content monetization.", tech: ["React Native", "GraphQL", "AWS"], tag: "accent", phoneColor: "accent", screen: <SocialScreen /> },
];

const statusColors: Record<string, string> = {
  Completed: "bg-green-500/10 text-green-400 border-green-500/20",
  Active: "bg-primary/10 text-primary border-primary/20",
  "In Progress": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

const Projects = () => {
  const [apiProjects, setApiProjects] = useState<ApiProject[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then(r => r.json())
      .then(data => setApiProjects(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  // Merge built-in + api into one unified list
  const apiAsRender: RenderProject[] = apiProjects.map((p, i) => ({
    id: p._id,
    title: p.title,
    category: p.category,
    desc: p.description,
    client: p.client,
    tech: p.tech,
    tag: tagColors[i % 3],
    phoneColor: tagColors[i % 3],
    isApi: true,
    apiData: p,
    screen: (
      <div className="w-full h-full overflow-hidden">
        {p.image ? (
          <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            <span className="text-4xl">🚀</span>
          </div>
        )}
      </div>
    ),
  }));

  const allProjects = [...builtIn, ...apiAsRender];

  return (
    <Layout>
      <PageHeader title="Our Projects" subtitle="Explore some of our successful deliveries across various industries." />

      {/* Stats */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-card/30 to-secondary/5" />
        <div className="relative container grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <MotionSection key={s.label} delay={i * 0.1} animation="skew-up">
              <div className="text-center glass rounded-2xl p-8 hover:glow-border-strong transition-all duration-500 hover:-translate-y-2 border-border group">
                <div className={`text-4xl font-heading font-black text-${s.color} mb-2`}>{s.val}</div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{s.label}</div>
              </div>
            </MotionSection>
          ))}
        </div>
      </section>

      {/* All Projects — single unified alternating layout */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container relative space-y-32">
          <div className="text-center mb-20">
            <MotionSection animation="parallax-reveal">
              <span className="text-primary text-sm font-bold uppercase tracking-[0.3em]">Portfolio</span>
              <TextReveal text="Featured Work" className="text-4xl md:text-6xl font-heading font-bold mt-4 justify-center" />
            </MotionSection>
          </div>

          {allProjects.map((p, i) => (
            <MotionSection key={p.id} animation={i % 2 === 0 ? "slide-horizontal" : "skew-up"} delay={i * 0.05}>
              <div className={`grid md:grid-cols-2 gap-20 items-center ${i % 2 !== 0 ? "md:[&>*:first-child]:order-2" : ""}`}>

                {/* Phone mockup — identical structure for all */}
                <div className="flex justify-center relative">
                  <div className="relative group">
                    <div className={`absolute inset-0 rounded-full bg-${p.phoneColor}/10 blur-[80px] scale-150 -z-10 group-hover:bg-${p.phoneColor}/25 transition-colors duration-700`} />
                    <PhoneMockup
                      color={p.phoneColor}
                      animationClass="animate-float"
                      animationDelay={`${(i % 6) * 0.25}s`}
                    >
                      {p.screen}
                    </PhoneMockup>
                  </div>
                </div>

                {/* Content — identical structure for all */}
                <div className="relative">
                  <MotionSection animation="parallax-reveal" delay={0.15}>
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-${p.tag}/10 text-${p.tag} text-[10px] font-bold uppercase tracking-widest mb-6 border border-${p.tag}/10`}>
                      <span className={`w-1.5 h-1.5 rounded-full bg-${p.tag} animate-pulse`} />
                      {p.category}
                    </div>
                  </MotionSection>
                  <h3 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">{p.title}</h3>
                  {p.client && <p className="text-muted-foreground text-sm mb-4 font-medium">Client: {p.client}</p>}
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8 font-light">{p.desc}</p>
                  <div className="flex flex-wrap gap-3 mb-10">
                    {p.tech.map(t => (
                      <span key={t} className="px-4 py-1.5 rounded-xl glass text-[11px] font-bold text-muted-foreground uppercase tracking-wider border border-border hover:border-primary/30 hover:text-primary transition-all duration-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  {p.isApi ? (
                    <button onClick={() => navigate(`/projects/${p.apiData!._id}`)}>
                      <GooeyButton color={p.tag}>
                        View Details <ArrowRight size={16} className="inline ml-2" />
                      </GooeyButton>
                    </button>
                  ) : (
                    <GooeyButton color={p.tag}>
                      View Case Study <ArrowRight size={16} className="inline ml-2" />
                    </GooeyButton>
                  )}
                </div>
              </div>
            </MotionSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-card/50 to-secondary/20" />
        <MotionSection animation="zoom-out" className="container text-center relative z-10">
          <TextReveal text="Have a Project in Mind?" className="text-4xl md:text-7xl font-heading font-black mb-8 justify-center leading-tight" />
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto text-xl font-light leading-relaxed">
            Let's build something amazing together. Our team is ready to bring your vision to life.
          </p>
          <Link to="/contact">
            <GooeyButton color="primary" className="!px-12 !py-5 text-lg">
              Start a Project <ArrowRight size={22} className="inline ml-2" />
            </GooeyButton>
          </Link>
        </MotionSection>
      </section>
    </Layout>
  );
};

export default Projects;
