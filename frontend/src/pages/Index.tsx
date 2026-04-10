import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import HeroCarousel from "@/components/HeroCarousel";
import CounterAnimation from "@/components/CounterAnimation";
import MobileShowcase from "@/components/MobileShowcase";
import TextReveal from "@/components/TextReveal";
import GooeyButton from "@/components/GooeyButton";
import MotionSection from "@/components/MotionSection";
import { ArrowRight, Code, Cloud, Shield, Cpu, Users, Zap, CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const stats = [
  { num: 50, suffix: "+", label: "Projects Delivered" },
  { num: 30, suffix: "+", label: "Happy Clients" },
  { num: 15, suffix: "+", label: "Team Members" },
  { num: 5, suffix: "+", label: "Years Experience" },
];

const services = [
  { icon: Code, title: "Web Development", desc: "Full-stack web applications built with modern frameworks." },
  { icon: Cloud, title: "Cloud Solutions", desc: "Scalable cloud infrastructure and migration services." },
  { icon: Shield, title: "Cybersecurity", desc: "Protect your business with enterprise-grade security." },
  { icon: Cpu, title: "AI & Automation", desc: "Intelligent automation to streamline operations." },
  { icon: Users, title: "IT Consulting", desc: "Strategic technology consulting for growth." },
  { icon: Zap, title: "DevOps", desc: "CI/CD pipelines and infrastructure as code." },
];

const whyUs = [
  "Expert team with 5+ years of experience",
  "On-time project delivery guarantee",
  "24/7 support & maintenance",
  "Agile development methodology",
  "Transparent communication",
  "Competitive pricing",
];

const testimonials = [
  { name: "Arjun M.", role: "CEO, TechStartup", text: "Speshway delivered our platform ahead of schedule with exceptional quality.", rating: 5 },
  { name: "Sarah L.", role: "CTO, HealthCo", text: "Their mobile app expertise transformed our patient engagement entirely.", rating: 5 },
  { name: "Ravi K.", role: "Founder, FinEdge", text: "Professional team, transparent process, and outstanding results.", rating: 5 },
];

const Index = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    // Fetch dynamic site content
    fetch("http://localhost:5000/api/site-content")
      .then(r => r.json())
      .then(data => setContent(data))
      .catch(() => {});
  }, []);

  const t = (key: string, fallback: string) => content[key] || fallback;

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (progressRef.current && scrollHeight) {
            progressRef.current.style.width = `${(window.scrollY / scrollHeight) * 100}%`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Layout>
      {/* Scroll Progress Bar — direct DOM mutation, zero re-renders */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-primary via-accent to-secondary z-[100]"
        style={{ width: "0%" }}
      />

      <HeroCarousel />

      {/* Stats */}
      <section className="relative py-24 overflow-hidden bg-background">
        <MotionSection animation="zoom-out" className="relative container grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 100} animation="scale-up">
              <div className="text-center group relative p-8 rounded-3xl hover:bg-primary/5 transition-all duration-500 overflow-hidden border border-border">
                <div className="text-5xl md:text-6xl font-heading font-black text-gradient mb-3">
                  <CounterAnimation target={s.num} suffix={s.suffix} />
                </div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </MotionSection>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <AnimatedSection animation="fade-in-up">
              <span className="text-primary text-sm font-black uppercase tracking-[0.3em]">{t("services_label", "What We Do")}</span>
            </AnimatedSection>
            <TextReveal text={t("services_title", "Innovation & Excellence")} className="text-4xl md:text-6xl font-heading font-black mt-4 mb-6 justify-center leading-tight" />
            <AnimatedSection delay={200}>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light leading-relaxed">
                End-to-end IT solutions tailored to your business needs, powered by innovation and expertise.
              </p>
            </AnimatedSection>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 80} animation="card-rise">
                <div className="group h-full p-8 rounded-3xl glass hover:glow-border hover:shadow-xl transition-all duration-400 border-border relative overflow-hidden">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 border border-primary/20">
                    <s.icon className="text-primary" size={28} />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300">{s.title}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed mb-6">{s.desc}</p>
                  <Link to="/services" className="inline-flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                    Explore <ArrowRight size={16} />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <MobileShowcase />

      {/* Why Choose Us with Rotate-In and Skew */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="container grid md:grid-cols-2 gap-24 items-center">
          <MotionSection animation="skew-up">
            <span className="text-secondary font-black text-sm uppercase tracking-[0.3em] mb-6 block">{t("whyus_label", "Why Choose Us")}</span>
            <TextReveal 
              text={t("whyus_title", "Delivering Excellence In Every Project")} 
              className="text-4xl md:text-6xl font-heading font-black mb-12 leading-tight"
            />
            <div className="grid sm:grid-cols-2 gap-8">
              {whyUs.map((item, i) => (
                <div key={i} className="flex items-start gap-5 group">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border border-secondary/20">
                    <CheckCircle className="text-secondary" size={24} />
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-500 font-medium text-lg leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </MotionSection>
          
          <AnimatedSection animation="rotate-in">
            <div className="relative">
              <div className="absolute -inset-20 bg-gradient-to-tr from-primary/15 via-transparent to-secondary/15 rounded-full blur-[120px]" />
              <div className="relative grid grid-cols-2 gap-8">
                {[
                  { val: "99%", label: "Satisfaction", color: "primary", delay: 0 },
                  { val: "24/7", label: "Support", color: "secondary", delay: 100 },
                  { val: "100+", label: "Tech Stack", color: "accent", delay: 200 },
                  { val: "50+", label: "Partners", color: "primary", delay: 300 },
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "glass rounded-[2.5rem] p-10 hover:glow-border transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl border-border",
                      i % 2 === 1 ? "mt-12" : ""
                    )}
                    style={{ transitionDelay: `${item.delay}ms` }}
                  >
                    <div className={`text-5xl font-heading font-black text-${item.color} mb-4 group-hover:animate-glitch`}>{item.val}</div>
                    <div className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials with Card-Rise */}
      <section className="py-32 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/40 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[200px]" />
        <div className="relative container">
          <div className="text-center mb-24">
            <AnimatedSection animation="reveal-text">
              <span className="text-accent text-sm font-black uppercase tracking-[0.3em]">{t("testimonials_label", "Testimonials")}</span>
            </AnimatedSection>
            <TextReveal 
              text={t("testimonials_title", "What Our Clients Say")} 
              className="text-4xl md:text-5xl font-heading font-black mt-6 justify-center"
            />
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 200} animation="card-rise">
                <div className="glass rounded-[2.5rem] p-10 hover:glow-border-strong transition-all duration-700 hover:-translate-y-6 h-full flex flex-col card-3d border-border group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 text-primary/10 group-hover:text-primary/20 transition-colors">
                    <Zap size={60} fill="currentColor" />
                  </div>
                  
                  <div className="flex gap-2 mb-8 relative z-10">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={22} className="text-primary fill-primary group-hover:scale-125 transition-transform" style={{ transitionDelay: `${j * 50}ms` }} />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-xl flex-1 italic leading-relaxed group-hover:text-foreground transition-colors duration-700 relative z-10 font-light">
                    "{t.text}"
                  </p>
                  <div className="mt-10 pt-8 border-t border-border flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center font-heading font-black text-2xl text-primary group-hover:rotate-12 transition-transform duration-500">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-black text-lg text-foreground group-hover:text-primary transition-colors">{t.name}</div>
                      <div className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">{t.role}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-secondary/20" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px]" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-secondary/10 blur-[150px]" />
        <MotionSection animation="parallax-reveal" className="container text-center relative z-10">
          <TextReveal
            text={t("cta_title", "Ready to Transform Your Business?")}
            className="text-4xl md:text-7xl font-heading font-black mb-8 justify-center leading-tight tracking-tighter"
          />
          <p className="text-muted-foreground mb-12 max-w-3xl mx-auto text-xl font-light leading-relaxed">
            {t("cta_subtitle", "Let's discuss how Speshway Solutions can accelerate your digital journey and bring your vision to life.")}
          </p>
          <div className="flex justify-center">
            <GooeyButton color="primary">
              <Link to="/contact" className="inline-flex items-center gap-3 px-10 py-5 font-black text-lg uppercase tracking-widest">
                Get Started Now <ArrowRight size={22} />
              </Link>
            </GooeyButton>
          </div>
        </MotionSection>
      </section>
    </Layout>
  );
};


export default Index;
