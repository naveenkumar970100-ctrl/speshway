import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import MotionSection from "@/components/MotionSection";
import GooeyButton from "@/components/GooeyButton";
import TextReveal from "@/components/TextReveal";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface Project {
  _id: string; title: string; category: string; description: string;
  tech: string[]; liveUrl: string; status: string; client: string; image: string;
}

const stats = [
  { val: "50+", label: "Projects Delivered", color: "primary" },
  { val: "30+", label: "Happy Clients", color: "secondary" },
  { val: "98%", label: "On-Time Delivery", color: "accent" },
  { val: "4.9★", label: "Average Rating", color: "primary" },
];

const statusColors: Record<string, string> = {
  Completed: "bg-green-500/10 text-green-400 border-green-500/20",
  Active: "bg-primary/10 text-primary border-primary/20",
  "In Progress": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

const tagColors = ["primary", "secondary", "accent"];

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then(r => r.json())
      .then(data => { setProjects(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

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

      {/* Projects Grid */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container">
          <div className="text-center mb-20">
            <MotionSection animation="parallax-reveal">
              <span className="text-primary text-sm font-bold uppercase tracking-[0.3em]">Portfolio</span>
              <TextReveal text="Featured Work" className="text-4xl md:text-6xl font-heading font-bold mt-4 justify-center" />
            </MotionSection>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass rounded-3xl overflow-hidden border-border animate-pulse">
                  <div className="h-52 bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              <div className="text-6xl mb-4">🚀</div>
              <p className="text-xl">No projects yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((p, i) => (
                <AnimatedSection key={p._id} delay={i * 80} animation="card-rise">
                  <div className="group glass rounded-3xl overflow-hidden border-border hover:glow-border-strong transition-all duration-500 hover:-translate-y-3 card-3d h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden bg-muted">
                      {p.image ? (
                        <img src={p.image} alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <div className="text-5xl">🖼️</div>
                        </div>
                      )}
                      {/* Status badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${statusColors[p.status] || "bg-muted text-muted-foreground border-border"}`}>
                          {p.status}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-${tagColors[i % 3]}/10 text-${tagColors[i % 3]} text-[10px] font-bold uppercase tracking-widest mb-3 border border-${tagColors[i % 3]}/10 w-fit`}>
                        <span className={`w-1.5 h-1.5 rounded-full bg-${tagColors[i % 3]} animate-pulse`} />
                        {p.category}
                      </div>

                      <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                      {p.client && <p className="text-xs text-muted-foreground mb-2 font-medium">Client: {p.client}</p>}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 line-clamp-3">{p.description}</p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {p.tech.slice(0, 4).map(t => (
                          <span key={t} className="px-2.5 py-1 rounded-lg glass text-[11px] font-bold text-muted-foreground border-border">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-3 mt-auto">
                        {p.liveUrl ? (
                          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                            <GooeyButton color={tagColors[i % 3] as "primary" | "secondary" | "accent"}>
                              <span className="flex items-center gap-2 px-4 py-2 text-sm font-bold">
                                <ExternalLink size={14} /> Live Demo
                              </span>
                            </GooeyButton>
                          </a>
                        ) : (
                          <GooeyButton color={tagColors[i % 3] as "primary" | "secondary" | "accent"}>
                            <span className="flex items-center gap-2 px-4 py-2 text-sm font-bold">
                              View Case Study <ArrowRight size={14} />
                            </span>
                          </GooeyButton>
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
