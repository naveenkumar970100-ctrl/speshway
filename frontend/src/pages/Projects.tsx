import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import MotionSection from "@/components/MotionSection";
import GooeyButton from "@/components/GooeyButton";
import PhoneMockup from "@/components/PhoneMockup";
import EcommerceScreen from "@/components/phone-screens/EcommerceScreen";
import HealthScreen from "@/components/phone-screens/HealthScreen";
import FoodScreen from "@/components/phone-screens/FoodScreen";
import FitnessScreen from "@/components/phone-screens/FitnessScreen";
import FintechScreen from "@/components/phone-screens/FintechScreen";
import SocialScreen from "@/components/phone-screens/SocialScreen";
import TextReveal from "@/components/TextReveal";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ApiProject {
  _id: string; title: string; category: string; description: string;
  tech: string[]; liveUrl: string; status: string; client: string; image: string;
}

const stats = [
  { val: "50+", label: "Projects Delivered", color: "primary" },
  { val: "30+", label: "Happy Clients", color: "secondary" },
  { val: "98%", label: "On-Time Delivery", color: "accent" },
  { val: "4.9★", label: "Average Rating", color: "primary" },
];

const builtInProjects = [
  {
    title: "E-Commerce Platform",
    category: "Web & Mobile",
    desc: "A full-featured online store with payment integration, inventory management, and real-time order tracking.",
    screen: <EcommerceScreen />,
    phoneColor: "primary" as const,
    tag: "primary",
    tech: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "HealthCare App",
    category: "Mobile Development",
    desc: "Telemedicine platform connecting patients with doctors in real-time with vitals tracking and appointment booking.",
    screen: <HealthScreen />,
    phoneColor: "secondary" as const,
    tag: "secondary",
    tech: ["React Native", "Firebase", "WebRTC"],
  },
  {
    title: "Food Delivery App",
    category: "Mobile Development",
    desc: "Fast food ordering & delivery platform with real-time GPS tracking and restaurant management dashboard.",
    screen: <FoodScreen />,
    phoneColor: "accent" as const,
    tag: "accent",
    tech: ["Flutter", "Node.js", "Redis"],
  },
  {
    title: "Fitness Tracker",
    category: "Mobile App",
    desc: "Personal fitness tracking with AI-powered workout plans, progress analytics, and wearable integration.",
    screen: <FitnessScreen />,
    phoneColor: "primary" as const,
    tag: "primary",
    tech: ["React Native", "Python", "TensorFlow"],
  },
  {
    title: "FinTech Dashboard",
    category: "Web & Mobile",
    desc: "Banking and investment app with real-time portfolio management, analytics, and secure transactions.",
    screen: <FintechScreen />,
    phoneColor: "secondary" as const,
    tag: "secondary",
    tech: ["React", "Django", "PostgreSQL"],
  },
  {
    title: "Social Network",
    category: "Mobile Development",
    desc: "Community-driven social platform with feeds, stories, messaging, and content monetization.",
    screen: <SocialScreen />,
    phoneColor: "accent" as const,
    tag: "accent",
    tech: ["React Native", "GraphQL", "AWS"],
  },
];

const statusColors: Record<string, string> = {
  Completed: "bg-green-500/10 text-green-400 border-green-500/20",
  Active: "bg-primary/10 text-primary border-primary/20",
  "In Progress": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

const tagColors = ["primary", "secondary", "accent"];

const Projects = () => {
  const [apiProjects, setApiProjects] = useState<ApiProject[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then(r => r.json())
      .then(data => setApiProjects(Array.isArray(data) ? data : []))
      .catch(() => {});
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

      {/* Built-in Projects — alternating phone mockup layout */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container relative space-y-32">
          <div className="text-center mb-20">
            <MotionSection animation="parallax-reveal">
              <span className="text-primary text-sm font-bold uppercase tracking-[0.3em]">Portfolio</span>
              <TextReveal
                text="Featured Work"
                className="text-4xl md:text-6xl font-heading font-bold mt-4 justify-center"
              />
            </MotionSection>
          </div>

          {builtInProjects.map((p, i) => (
            <MotionSection key={p.title} animation={i % 2 === 0 ? "slide-horizontal" : "skew-up"} delay={i * 0.05}>
              <div className={`grid md:grid-cols-2 gap-20 items-center ${i % 2 !== 0 ? "md:[&>*:first-child]:order-2" : ""}`}>
                {/* Phone mockup */}
                <div className="flex justify-center relative">
                  <div className="relative group">
                    <div className={`absolute inset-0 rounded-full bg-${p.phoneColor}/10 blur-[80px] scale-150 -z-10 group-hover:bg-${p.phoneColor}/25 transition-colors duration-700`} />
                    <div className="animate-slide-in-bottom">
                      <PhoneMockup
                        color={p.phoneColor}
                        animationClass="animate-float"
                        animationDelay={`${i * 0.25}s`}
                      >
                        {p.screen}
                      </PhoneMockup>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <MotionSection animation="parallax-reveal" delay={0.15}>
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-${p.tag}/10 text-${p.tag} text-[10px] font-bold uppercase tracking-widest mb-6 border border-${p.tag}/10`}>
                      <span className={`w-1.5 h-1.5 rounded-full bg-${p.tag} animate-pulse`} />
                      {p.category}
                    </div>
                  </MotionSection>
                  <h3 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">{p.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8 font-light">{p.desc}</p>
                  <div className="flex flex-wrap gap-3 mb-10">
                    {p.tech.map(t => (
                      <span key={t} className="px-4 py-1.5 rounded-xl glass text-[11px] font-bold text-muted-foreground uppercase tracking-wider border border-border hover:border-primary/30 hover:text-primary transition-all duration-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  <GooeyButton color={p.tag as "primary" | "secondary" | "accent"}>
                    View Case Study <ArrowRight size={16} className="inline ml-2" />
                  </GooeyButton>
                </div>
              </div>
            </MotionSection>
          ))}
        </div>
      </section>

      {/* API Projects from admin — same alternating layout style */}
      {apiProjects.length > 0 && (
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="container relative space-y-32">
            <div className="text-center mb-20">
              <MotionSection animation="parallax-reveal">
                <span className="text-secondary text-sm font-bold uppercase tracking-[0.3em]">Latest Work</span>
                <TextReveal text="Recent Projects" className="text-4xl md:text-5xl font-heading font-bold mt-4 justify-center" />
              </MotionSection>
            </div>

            {apiProjects.map((p, i) => (
              <MotionSection key={p._id} animation={i % 2 === 0 ? "slide-horizontal" : "skew-up"} delay={i * 0.05}>
                <div className={`grid md:grid-cols-2 gap-20 items-center ${i % 2 !== 0 ? "md:[&>*:first-child]:order-2" : ""}`}>

                  {/* Project image — styled like phone mockup side */}
                  <div className="flex justify-center relative">
                    <div className="relative group">
                      <div className={`absolute inset-0 rounded-full bg-${tagColors[i % 3]}/10 blur-[80px] scale-150 -z-10 group-hover:bg-${tagColors[i % 3]}/25 transition-colors duration-700`} />
                      <div className="animate-float relative">
                        {/* Status badge */}
                        <div className="absolute top-3 left-3 z-10">
                          <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${statusColors[p.status] || "bg-muted text-muted-foreground border-border"}`}>
                            {p.status}
                          </span>
                        </div>
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-[320px] rounded-[2rem] shadow-[0_0_60px_hsl(var(--primary)/0.2)] group-hover:shadow-[0_0_80px_hsl(var(--primary)/0.4)] group-hover:scale-[1.03] transition-all duration-700 object-cover aspect-[4/3]"
                          />
                        ) : (
                          <div className="w-[320px] aspect-[4/3] rounded-[2rem] glass border-border flex items-center justify-center text-6xl">
                            🖼️
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content — same style as built-in */}
                  <div className="relative">
                    <MotionSection animation="parallax-reveal" delay={0.15}>
                      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-${tagColors[i % 3]}/10 text-${tagColors[i % 3]} text-[10px] font-bold uppercase tracking-widest mb-6 border border-${tagColors[i % 3]}/10`}>
                        <span className={`w-1.5 h-1.5 rounded-full bg-${tagColors[i % 3]} animate-pulse`} />
                        {p.category}
                      </div>
                    </MotionSection>
                    <h3 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">{p.title}</h3>
                    {p.client && <p className="text-muted-foreground text-sm mb-4 font-medium">Client: {p.client}</p>}
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8 font-light">{p.description}</p>
                    <div className="flex flex-wrap gap-3 mb-10">
                      {p.tech.map(t => (
                        <span key={t} className="px-4 py-1.5 rounded-xl glass text-[11px] font-bold text-muted-foreground uppercase tracking-wider border border-border hover:border-primary/30 hover:text-primary transition-all duration-300">
                          {t}
                        </span>
                      ))}
                    </div>
                    {p.liveUrl ? (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                        <GooeyButton color={tagColors[i % 3] as "primary" | "secondary" | "accent"}>
                          <span className="flex items-center gap-2 px-2">
                            <ExternalLink size={16} /> Live Demo
                          </span>
                        </GooeyButton>
                      </a>
                    ) : (
                      <GooeyButton color={tagColors[i % 3] as "primary" | "secondary" | "accent"}>
                        View Case Study <ArrowRight size={16} className="inline ml-2" />
                      </GooeyButton>
                    )}
                  </div>
                </div>
              </MotionSection>
            ))}
          </div>
        </section>
      )}

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
