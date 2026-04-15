import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import MotionSection from "@/components/MotionSection";
import GooeyButton from "@/components/GooeyButton";
import PhoneMockup from "@/components/PhoneMockup";
import DashboardScreen from "@/components/phone-screens/DashboardScreen";
import FitnessScreen from "@/components/phone-screens/FitnessScreen";
import TextReveal from "@/components/TextReveal";
import { Target, Eye, Award, Rocket, Heart, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAssets } from "@/hooks/useAssets";
import { cn } from "@/lib/utils";

const About = () => {
  const { aboutTeam } = useAssets();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    Promise.allSettled([
      fetch("/api/settings").then(r => r.json()),
      fetch("/api/site-content").then(r => r.json()),
    ]).then(([s, c]) => {
      if (s.status === "fulfilled") setSettings(s.value);
      if (c.status === "fulfilled") setContent(c.value);
    });
  }, []);

  const sc = (key: string, fallback: string) => content[key] || fallback;
      .catch(() => {});
  }, []);

  const s = (key: string, fallback: string) => settings[key] || fallback;

  return (
    <Layout>
      <PageHeader title="About Us" subtitle="Learn more about Speshway Solutions and our mission." />

      {/* Who We Are */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="container grid md:grid-cols-2 gap-20 items-center relative">
          <MotionSection animation="skew-up">
            <span className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4 block">Who We Are</span>
            <TextReveal text="Pioneering Digital Transformation Since 2017" className="text-4xl md:text-6xl font-heading font-bold mb-8 leading-tight" />
            <p className="text-muted-foreground text-lg leading-relaxed mb-6 font-light">
              Founded in 2017, Speshway Solutions Private Limited began with a simple yet powerful vision: to bridge the gap between businesses and cutting-edge technology. What started as a small team of passionate developers has grown into a full-service IT solutions provider serving clients across the globe.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 font-light">
              Over the years, we have evolved alongside the rapidly changing technology landscape, continuously expanding our expertise and service offerings. From web development to AI-powered solutions, we have remained committed to delivering innovation that matters.
            </p>
            <div className="grid grid-cols-3 gap-6 mb-10">
              {[
                { val: `${s("stat_projects","300")}${s("stat_projects_suffix","+")}`, label: "Projects" },
                { val: `${s("stat_clients","150")}${s("stat_clients_suffix","+")}`, label: "Clients" },
                { val: `${s("stat_team","200")}${s("stat_team_suffix","+")}`, label: "Team" },
              ].map((stat, i) => (
                <AnimatedSection key={stat.label} delay={i * 150} animation="scale-up">
                  <div className="glass rounded-2xl p-6 text-center hover:glow-border-strong transition-all duration-500 hover:-translate-y-2 border-white/5">
                    <div className="text-3xl font-heading font-bold text-gradient mb-1">{stat.val}</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            <Link to="/contact"><GooeyButton color="primary">Work With Us <ArrowRight size={18} className="inline ml-2" /></GooeyButton></Link>
          </MotionSection>

          <MotionSection animation="zoom-out">
            <div className="relative group">
              <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl">
                <img src={aboutTeam} alt="Our team" className="w-full h-auto object-cover group-hover:scale-110 transition-all duration-1000" loading="lazy" />
              </div>
              <div className="absolute -bottom-8 -left-8 glass rounded-2xl px-6 py-4 glow-border-strong shadow-2xl border-white/10">
                <div className="text-2xl font-bold text-primary">Since 2017</div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">of Excellence</div>
              </div>
              <div className="absolute -top-8 -right-8 glass rounded-2xl px-6 py-4 glow-border-strong shadow-2xl border-white/10">
                <div className="text-2xl font-bold text-secondary">{s("stat_projects","300")}+</div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Projects Done</div>
              </div>
            </div>
          </MotionSection>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
        <div className="relative container">
          <div className="text-center mb-20">
            <MotionSection animation="parallax-reveal">
              <span className="text-secondary text-sm font-bold uppercase tracking-[0.3em]">What Drives Us</span>
              <TextReveal text="Mission, Vision & Values" className="text-4xl md:text-5xl font-heading font-bold mt-4 justify-center" />
            </MotionSection>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, color: "primary", titleKey: "about_mission_title", descKey: "about_mission_desc", defaultTitle: "Our Mission", defaultDesc: "To empower businesses through innovative technology solutions that drive growth, efficiency, and digital transformation." },
              { icon: Eye, color: "secondary", titleKey: "about_vision_title", descKey: "about_vision_desc", defaultTitle: "Our Vision", defaultDesc: "To be the global leader in IT solutions, recognized for excellence, innovation, and lasting client partnerships." },
              { icon: Award, color: "accent", titleKey: "about_values_title", descKey: "about_values_desc", defaultTitle: "Our Values", defaultDesc: "Integrity, innovation, excellence, and customer success guide everything we do at Speshway Solutions." },
            ].map((item, i) => (
              <MotionSection key={i} delay={i * 0.1} animation="skew-up">
                <div className="group h-full p-10 rounded-3xl glass hover:glow-border-strong hover:shadow-2xl transition-all duration-700 card-3d border-white/5 relative overflow-hidden">
                  <div className={`w-16 h-16 rounded-2xl bg-${item.color}/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-${item.color}/10`}>
                    <item.icon className={`text-${item.color}`} size={32} />
                  </div>
                  <h3 className="font-heading font-bold text-2xl mb-4 text-foreground group-hover:text-primary transition-colors duration-500">{sc(item.titleKey, item.defaultTitle)}</h3>
                  <p className="text-muted-foreground leading-relaxed font-light">{sc(item.descKey, item.defaultDesc)}</p>
                </div>
              </MotionSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="container max-w-4xl">
          <div className="text-center mb-20">
            <MotionSection animation="parallax-reveal">
              <span className="text-accent text-sm font-bold uppercase tracking-[0.3em]">Our Journey</span>
              <TextReveal text="Milestones That Define Us" className="text-4xl md:text-5xl font-heading font-bold mt-4 justify-center" />
            </MotionSection>
          </div>
          <div className="relative pl-8 md:pl-0">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-accent animate-line-grow origin-top h-full" />
            </div>
            <div className="flex flex-col gap-12">
              {[
                { year: "2017", key: "milestone_2017", default: "Speshway Solutions founded with a vision to bridge businesses and technology" },
                { year: "2018", key: "milestone_2018", default: "First enterprise clients onboarded, team of passionate developers formed" },
                { year: "2020", key: "milestone_2020", default: "Expanded to mobile development, launched 10+ successful apps" },
                { year: "2022", key: "milestone_2022", default: "Crossed 30+ clients, opened cloud & AI practice" },
                { year: "2024", key: "milestone_2024", default: "50+ projects delivered, recognized as top IT solutions provider" },
              ].map((m, i) => (
                <MotionSection key={m.year} delay={i * 0.1} animation={i % 2 === 0 ? "slide-horizontal" : "skew-up"}
                  className={cn("relative flex flex-col md:flex-row items-center gap-8 w-full", i % 2 === 0 ? "md:flex-row-reverse" : "")}>
                  <div className="absolute left-[-32px] md:left-1/2 md:-translate-x-1/2 w-16 h-16 z-10 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping-slow" />
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-[10px] font-black text-primary-foreground shadow-xl">{m.year}</div>
                  </div>
                  <div className={cn("w-full md:w-[45%] glass rounded-3xl p-8 hover:glow-border-strong transition-all duration-500 hover:-translate-y-2 card-3d border-white/5", i % 2 === 0 ? "md:text-right" : "md:text-left")}>
                    <span className="text-primary font-black text-xl mb-2 block">{m.year}</span>
                    <p className="text-foreground text-lg font-light leading-relaxed">{sc(m.key, m.default)}</p>
                  </div>
                  <div className="hidden md:block w-[45%]" />
                </MotionSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
        <div className="relative container grid md:grid-cols-2 gap-20 items-center">
          <MotionSection animation="zoom-out" className="flex justify-center items-end gap-8 relative">
            <div className="absolute -inset-10 bg-primary/10 blur-[100px] rounded-full z-0 animate-pulse" />
            <div className="relative z-10"><PhoneMockup color="primary" animationClass="animate-float" animationDelay="0s"><DashboardScreen /></PhoneMockup></div>
            <div className="mb-16 relative z-10"><PhoneMockup color="accent" animationClass="animate-float" animationDelay="0.5s"><FitnessScreen /></PhoneMockup></div>
          </MotionSection>
          <MotionSection animation="skew-up">
            <span className="text-accent text-sm font-bold uppercase tracking-[0.3em]">Our Approach</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mt-4 mb-10 text-foreground leading-tight">Why Businesses <br /><span className="text-accent">Trust Us</span></h2>
            <div className="grid gap-6">
              {[
                { icon: Rocket, color: "primary", titleKey: "about_principle1_title", descKey: "about_principle1_desc", defaultTitle: "Innovation First", defaultDesc: "We stay ahead of the curve with cutting-edge technologies." },
                { icon: Heart, color: "secondary", titleKey: "about_principle2_title", descKey: "about_principle2_desc", defaultTitle: "Client Focused", defaultDesc: "Your success is our success. We build lasting partnerships." },
                { icon: Globe, color: "accent", titleKey: "about_principle3_title", descKey: "about_principle3_desc", defaultTitle: "Global Reach", defaultDesc: "Serving clients across India, USA, UK, and Middle East." },
              ].map((p, i) => (
                <AnimatedSection key={i} delay={i * 150} animation="fade-in-up">
                  <div className="flex gap-6 p-6 rounded-3xl glass hover:glow-border-strong transition-all duration-500 group hover:-translate-y-2 border-white/5">
                    <div className={`w-14 h-14 rounded-2xl bg-${p.color}/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border border-${p.color}/10`}>
                      <p.icon className={`text-${p.color}`} size={28} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-foreground group-hover:text-primary transition-colors">{sc(p.titleKey, p.defaultTitle)}</h3>
                      <p className="text-muted-foreground font-light leading-relaxed">{sc(p.descKey, p.defaultDesc)}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            <div className="mt-12"><Link to="/services"><GooeyButton color="accent">Explore Services</GooeyButton></Link></div>
          </MotionSection>
        </div>
      </section>
    </Layout>
  );
};

export default About;
