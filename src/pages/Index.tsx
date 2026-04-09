import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import HeroCarousel from "@/components/HeroCarousel";
import CounterAnimation from "@/components/CounterAnimation";
import MobileShowcase from "@/components/MobileShowcase";
import { ArrowRight, Code, Cloud, Shield, Cpu, Users, Zap, CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";

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

const Index = () => (
  <Layout>
    <HeroCarousel />

    {/* Stats */}
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-card to-secondary/5" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-line-grow origin-left" />
      <div className="relative container grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <AnimatedSection key={s.label} delay={i * 120} animation="fade-in-up">
            <div className="text-center group relative">
              <div className="absolute inset-0 rounded-xl bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-xl" />
              <div className="relative text-3xl md:text-4xl font-heading font-bold text-gradient">
                <CounterAnimation target={s.num} suffix={s.suffix} />
              </div>
              <div className="text-sm text-muted-foreground mt-1 group-hover:text-foreground transition-colors">{s.label}</div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>

    {/* Services */}
    <section className="py-20 bg-background relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container">
        <AnimatedSection className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">What We Do</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-3">Our Services</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">End-to-end IT solutions tailored to your business needs.</p>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 100} animation="scale-in">
              <div className="group h-full p-6 rounded-xl glass hover:glow-border-strong hover:shadow-xl transition-all duration-500 card-3d">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 group-hover:shadow-[0_0_25px_hsl(var(--primary)/0.35)] transition-all duration-300 border border-primary/10">
                  <s.icon className="text-primary" size={28} />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
                <Link to="/services" className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 group-hover:gap-2 transition-all duration-300">
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    <MobileShowcase />

    {/* Why Choose Us */}
    <section className="py-20 bg-background relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <AnimatedSection animation="slide-in-left">
          <span className="text-secondary font-semibold text-sm uppercase tracking-widest">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-6 text-foreground">
            We Deliver Excellence in Every Project
          </h2>
          <div className="space-y-4">
            {whyUs.map((item, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 group-hover:scale-110 transition-all">
                  <CheckCircle className="text-secondary" size={14} />
                </div>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">{item}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
        <AnimatedSection animation="slide-in-right">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 rounded-2xl blur-xl" />
            <div className="relative grid grid-cols-2 gap-4">
              {[
                { val: "99%", label: "Client Satisfaction", color: "primary" },
                { val: "24/7", label: "Support Available", color: "secondary" },
                { val: "100+", label: "Technologies Used", color: "accent" },
                { val: "50+", label: "Happy Clients", color: "primary" },
              ].map((item, i) => (
                <div key={i} className={`glass rounded-xl p-6 hover:glow-border transition-all duration-300 hover:-translate-y-1 ${i % 2 === 1 ? "mt-6" : ""}`}>
                  <div className={`text-3xl font-heading font-bold text-${item.color} mb-1`}>{item.val}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl" />
      <div className="relative container">
        <AnimatedSection className="text-center mb-12">
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2">What Our Clients Say</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={i} delay={i * 150} animation="fade-in-up">
              <div className="glass rounded-xl p-6 hover:glow-border-strong transition-all duration-500 hover:-translate-y-3 h-full flex flex-col card-3d">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={16} className="text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm flex-1 italic">"{t.text}"</p>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="font-semibold text-sm text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-secondary/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <AnimatedSection className="container text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-foreground">Ready to Transform Your Business?</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Let's discuss how Speshway Solutions can accelerate your digital journey.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-300 hover:scale-105"
        >
          Contact Us Today <ArrowRight size={16} />
        </Link>
      </AnimatedSection>
    </section>
  </Layout>
);

export default Index;
