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
import MagneticButton from "@/components/MagneticButton";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Projects = () => (
  <Layout>
    <PageHeader title="Our Projects" subtitle="Explore some of our successful deliveries across various industries." />

    {/* Stats bar */}
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-card/30 to-secondary/5" />
      <div className="relative container grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <MotionSection key={s.label} delay={i * 0.1} animation="skew-up">
            <div className="text-center glass rounded-2xl p-8 hover:glow-border-strong transition-all duration-500 hover:-translate-y-2 border-white/5 group">
              <div className={`text-4xl font-heading font-black text-${s.color} mb-2 group-hover:animate-glitch`}>{s.val}</div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{s.label}</div>
            </div>
          </MotionSection>
        ))}
      </div>
    </section>

    {/* Projects — alternating layout with phone mockups */}
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

        {projects.map((p, i) => (
          <MotionSection key={p.title} animation={i % 2 === 0 ? "slide-horizontal" : "skew-up"} delay={i * 0.1}>
            <div className={`grid md:grid-cols-2 gap-20 items-center ${i % 2 !== 0 ? "md:[&>*:first-child]:order-2" : ""}`}>
              {/* Phone mockup with entrance + float animations */}
              <div className="flex justify-center relative">
                <div className="relative group">
                  <div className={`absolute inset-0 rounded-full bg-${p.phoneColor}/10 blur-[80px] scale-150 -z-10 group-hover:bg-${p.phoneColor}/25 transition-colors duration-700`} />
                  <div className="animate-slide-in-bottom" style={{ animationDelay: `${i * 0.1}s` }}>
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
                <MotionSection animation="parallax-reveal" delay={0.2}>
                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-${p.tag}/10 text-${p.tag} text-[10px] font-bold uppercase tracking-widest mb-6 border border-${p.tag}/10`}>
                    <span className={`w-1.5 h-1.5 rounded-full bg-${p.tag} animate-pulse`} />
                    {p.category}
                  </div>
                </MotionSection>
                
                <h3 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">{p.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8 font-light">{p.desc}</p>
                
                <div className="flex flex-wrap gap-3 mb-10">
                  {p.tech.map((t) => (
                    <span key={t} className="px-4 py-1.5 rounded-xl glass text-[11px] font-bold text-muted-foreground uppercase tracking-wider border border-white/5 hover:border-primary/30 hover:text-primary transition-all duration-300">
                      {t}
                    </span>
                  ))}
                </div>
                
                <GooeyButton color={p.tag as any}>
                  View Case Study <ArrowRight size={16} className="inline ml-2" />
                </GooeyButton>
              </div>
            </div>
          </MotionSection>
        ))}
      </div>
    </section>

    {/* CTA with high-end feel */}
    <section className="py-32 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-card/50 to-secondary/20" />
      
      <MotionSection animation="zoom-out" className="container text-center relative z-10">
        <TextReveal 
          text="Have a Project in Mind?" 
          className="text-4xl md:text-7xl font-heading font-black mb-8 justify-center leading-tight"
        />
        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto text-xl font-light leading-relaxed">
          Let's build something amazing together. Our team is ready to bring your vision to life with world-class engineering.
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


export default Projects;
