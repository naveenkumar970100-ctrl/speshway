import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import PhoneMockup from "@/components/PhoneMockup";
import EcommerceScreen from "@/components/phone-screens/EcommerceScreen";
import HealthScreen from "@/components/phone-screens/HealthScreen";
import FoodScreen from "@/components/phone-screens/FoodScreen";
import FitnessScreen from "@/components/phone-screens/FitnessScreen";
import FintechScreen from "@/components/phone-screens/FintechScreen";
import SocialScreen from "@/components/phone-screens/SocialScreen";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web & Mobile",
    desc: "A full-featured online store with payment integration, inventory management, and real-time order tracking.",
    screen: <EcommerceScreen />,
    phoneColor: "primary" as const,
    gradient: "from-primary/20 to-accent/10",
    tag: "primary",
    tech: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "HealthCare App",
    category: "Mobile Development",
    desc: "Telemedicine platform connecting patients with doctors in real-time with vitals tracking and appointment booking.",
    screen: <HealthScreen />,
    phoneColor: "secondary" as const,
    gradient: "from-secondary/20 to-primary/10",
    tag: "secondary",
    tech: ["React Native", "Firebase", "WebRTC"],
  },
  {
    title: "Food Delivery App",
    category: "Mobile Development",
    desc: "Fast food ordering & delivery platform with real-time GPS tracking and restaurant management dashboard.",
    screen: <FoodScreen />,
    phoneColor: "accent" as const,
    gradient: "from-accent/20 to-secondary/10",
    tag: "accent",
    tech: ["Flutter", "Node.js", "Redis"],
  },
  {
    title: "Fitness Tracker",
    category: "Mobile App",
    desc: "Personal fitness tracking with AI-powered workout plans, progress analytics, and wearable integration.",
    screen: <FitnessScreen />,
    phoneColor: "primary" as const,
    gradient: "from-primary/20 to-secondary/10",
    tag: "primary",
    tech: ["React Native", "Python", "TensorFlow"],
  },
  {
    title: "FinTech Dashboard",
    category: "Web & Mobile",
    desc: "Banking and investment app with real-time portfolio management, analytics, and secure transactions.",
    screen: <FintechScreen />,
    phoneColor: "secondary" as const,
    gradient: "from-secondary/20 to-accent/10",
    tag: "secondary",
    tech: ["React", "Django", "PostgreSQL"],
  },
  {
    title: "Social Network",
    category: "Mobile Development",
    desc: "Community-driven social platform with feeds, stories, messaging, and content monetization.",
    screen: <SocialScreen />,
    phoneColor: "accent" as const,
    gradient: "from-accent/20 to-primary/10",
    tag: "accent",
    tech: ["React Native", "GraphQL", "AWS"],
  },
];

const stats = [
  { val: "50+", label: "Projects Delivered", color: "primary" },
  { val: "30+", label: "Happy Clients", color: "secondary" },
  { val: "98%", label: "On-Time Delivery", color: "accent" },
  { val: "4.9★", label: "Average Rating", color: "primary" },
];

const Projects = () => (
  <Layout>
    <PageHeader title="Our Projects" subtitle="Explore some of our successful deliveries." />

    {/* Stats bar */}
    <section className="py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-card to-secondary/5" />
      <div className="relative container grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <AnimatedSection key={s.label} delay={i * 100} animation="fade-in-up">
            <div className="text-center glass rounded-xl p-5 hover:glow-border transition-all duration-300 hover:-translate-y-1">
              <div className={`text-3xl font-heading font-bold text-${s.color}`}>{s.val}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>

    {/* Projects — alternating layout with phone mockups */}
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="container relative space-y-24">
        <AnimatedSection className="text-center mb-4">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2">Featured Work</h2>
        </AnimatedSection>

        {projects.map((p, i) => (
          <AnimatedSection key={p.title} animation={i % 2 === 0 ? "slide-in-left" : "slide-in-right"}>
            <div className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "md:[&>*:first-child]:order-2" : ""}`}>
              {/* Phone mockup */}
              <div className="flex justify-center">
                <div className="relative">
                  {/* Decorative rings */}
                  <div className={`absolute inset-0 rounded-full bg-${p.phoneColor}/10 blur-3xl scale-150 -z-10`} />
                  <div className={`absolute -inset-8 rounded-full border border-${p.phoneColor}/15 animate-spin-slow`} style={{ borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%" }} />
                  <div className={`absolute -inset-16 rounded-full border border-${p.phoneColor}/8 animate-counter-spin`} style={{ borderRadius: "40% 60% 30% 70% / 60% 40% 60% 40%" }} />
                  <PhoneMockup
                    color={p.phoneColor}
                    animationClass={i % 2 === 0 ? "animate-float" : "animate-tilt"}
                    animationDelay={`${i * 0.3}s`}
                  >
                    {p.screen}
                  </PhoneMockup>
                </div>
              </div>

              {/* Content */}
              <div>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-${p.tag}/10 text-${p.tag} text-xs font-semibold mb-4`}>
                  {p.category}
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tech.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full glass text-xs text-muted-foreground border border-border/50 hover:border-primary/40 hover:text-foreground transition-all duration-200">
                      {t}
                    </span>
                  ))}
                </div>
                <button className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-${p.tag}/10 text-${p.tag} text-sm font-semibold hover:bg-${p.tag} hover:text-primary-foreground transition-all duration-300 hover:shadow-[0_0_25px_hsl(var(--${p.tag})/0.4)] hover:gap-3`}>
                  View Case Study <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-card to-secondary/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl animate-pulse" />
      <AnimatedSection animation="scale-in" className="container text-center relative z-10">
        <h2 className="text-3xl font-heading font-bold mb-4 text-foreground">Have a Project in Mind?</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Let's build something amazing together. Reach out and we'll get started.</p>
        <a href="/contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-300 hover:scale-105">
          Start a Project <ExternalLink size={16} />
        </a>
      </AnimatedSection>
    </section>
  </Layout>
);

export default Projects;
