import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import MotionSection from "@/components/MotionSection";
import GooeyButton from "@/components/GooeyButton";
import PhoneMockup from "@/components/PhoneMockup";
import DashboardScreen from "@/components/phone-screens/DashboardScreen";
import FitnessScreen from "@/components/phone-screens/FitnessScreen";
import TextReveal from "@/components/TextReveal";
import MagneticButton from "@/components/MagneticButton";
import { Target, Eye, Award, Rocket, Heart, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import aboutTeam from "@/assets/about-team.jpg";
import { cn } from "@/lib/utils";

const values = [
  { icon: Target, title: "Our Mission", desc: "To empower businesses with innovative technology solutions that accelerate growth and efficiency.", color: "primary" },
  { icon: Eye, title: "Our Vision", desc: "To be the most trusted technology partner for enterprises worldwide.", color: "secondary" },
  { icon: Award, title: "Our Values", desc: "Integrity, innovation, collaboration, and excellence in every project we deliver.", color: "accent" },
];

const principles = [
  { icon: Rocket, title: "Innovation First", desc: "We stay ahead of the curve with cutting-edge technologies.", color: "primary" },
  { icon: Heart, title: "Client Focused", desc: "Your success is our success. We build lasting partnerships.", color: "secondary" },
  { icon: Globe, title: "Global Reach", desc: "Serving clients across India, USA, UK, and Middle East.", color: "accent" },
];

const milestones = [
  { year: "2020", event: "Speshway Solutions founded in Hyderabad" },
  { year: "2021", event: "First 10 enterprise clients onboarded" },
  { year: "2022", event: "Expanded to cloud & AI services" },
  { year: "2023", event: "Crossed 50+ successful project deliveries" },
  { year: "2024", event: "Opened remote teams across 3 countries" },
  { year: "2025", event: "Launched AI-powered product suite" },
];

const About = () => (
  <Layout>
    <PageHeader title="About Us" subtitle="Learn more about Speshway Solutions and our mission." />

    {/* Who We Are */}
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container grid md:grid-cols-2 gap-20 items-center relative">
        <MotionSection animation="skew-up">
          <span className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4 block">Who We Are</span>
          <TextReveal 
            text="Building Digital Excellence Since 2020" 
            className="text-4xl md:text-6xl font-heading font-bold mb-8 leading-tight"
          />
          <p className="text-muted-foreground text-lg leading-relaxed mb-6 font-light">
            Speshway Solutions is a leading IT services company specializing in custom software development, cloud solutions, and digital transformation. Founded with a passion for technology and innovation, we help businesses of all sizes leverage cutting-edge solutions.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 font-light">
            Our team of experienced engineers, designers, and consultants work closely with clients to deliver solutions that drive measurable results and sustainable growth.
          </p>
          
          <div className="grid grid-cols-3 gap-6 mb-10">
            {[{ val: "50+", label: "Projects" }, { val: "30+", label: "Clients" }, { val: "5+", label: "Years" }].map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 150} animation="scale-up">
                <div className="glass rounded-2xl p-6 text-center hover:glow-border-strong transition-all duration-500 hover:-translate-y-2 border-white/5">
                  <div className="text-3xl font-heading font-bold text-gradient mb-1">{s.val}</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{s.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <Link to="/contact">
            <GooeyButton color="primary">
              Work With Us <ArrowRight size={18} className="inline ml-2" />
            </GooeyButton>
          </Link>
        </MotionSection>

        <MotionSection animation="zoom-out">
          <div className="relative group">
            <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl animate-blur-in">
              <img
                src={aboutTeam}
                alt="Our team"
                className="w-full h-auto object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-1000 ease-out-expo"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            
            {/* Floating badges with enhanced animation */}
            <div className="absolute -bottom-8 -left-8 glass rounded-2xl px-6 py-4 glow-border-strong shadow-2xl border-white/10">
              <div className="text-2xl font-bold text-primary">5+ Years</div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">of Excellence</div>
            </div>
            <div className="absolute -top-8 -right-8 glass rounded-2xl px-6 py-4 glow-border-strong shadow-2xl border-white/10">
              <div className="text-2xl font-bold text-secondary">50+</div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Projects Done</div>
            </div>
          </div>
        </MotionSection>
      </div>
    </section>

    {/* Mission Vision Values with Card-Rise */}
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      <div className="relative container">
        <div className="text-center mb-20">
          <MotionSection animation="parallax-reveal">
            <span className="text-secondary text-sm font-bold uppercase tracking-[0.3em]">What Drives Us</span>
            <TextReveal 
              text="Mission, Vision & Values" 
              className="text-4xl md:text-5xl font-heading font-bold mt-4 justify-center"
            />
          </MotionSection>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((item, i) => (
            <MotionSection key={item.title} delay={i * 0.1} animation="skew-up">
              <div className="group h-full p-10 rounded-3xl glass hover:glow-border-strong hover:shadow-2xl transition-all duration-700 ease-out-expo card-3d border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className={`w-16 h-16 rounded-2xl bg-${item.color}/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_40px_hsl(var(--${item.color})/0.4)] transition-all duration-500 border border-${item.color}/10`}>
                  <item.icon className={`text-${item.color}`} size={32} />
                </div>
                <h3 className="font-heading font-bold text-2xl mb-4 text-foreground group-hover:text-primary transition-colors duration-500">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-light">{item.desc}</p>
              </div>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline with Path Animation */}
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container max-w-4xl">
        <div className="text-center mb-20">
          <MotionSection animation="parallax-reveal">
            <span className="text-accent text-sm font-bold uppercase tracking-[0.3em]">Our Journey</span>
            <TextReveal 
              text="Milestones That Define Us" 
              className="text-4xl md:text-5xl font-heading font-bold mt-4 justify-center"
            />
          </MotionSection>
        </div>

        <div className="relative pl-8 md:pl-0">
          {/* Animated vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-accent animate-line-grow origin-top h-full" />
          </div>

          <div className="flex flex-col gap-12">
            {milestones.map((m, i) => (
              <MotionSection 
                key={m.year} 
                delay={i * 0.1} 
                animation={i % 2 === 0 ? "slide-horizontal" : "skew-up"}
                className={cn(
                  "relative flex flex-col md:flex-row items-center gap-8 w-full",
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                )}
              >
                {/* Year Dot */}
                <div className="absolute left-[-32px] md:left-1/2 md:-translate-x-1/2 w-16 h-16 z-10 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping-slow" />
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-[10px] font-black text-primary-foreground group-hover:scale-125 transition-transform duration-500 shadow-xl">
                    {m.year}
                  </div>
                </div>

                {/* Content Card */}
                <div className={cn(
                  "w-full md:w-[45%] glass rounded-3xl p-8 hover:glow-border-strong transition-all duration-500 hover:-translate-y-2 card-3d border-white/5 group",
                  i % 2 === 0 ? "md:text-right" : "md:text-left"
                )}>
                  <span className="text-primary font-black text-xl mb-2 block group-hover:animate-glitch">{m.year}</span>
                  <p className="text-foreground text-lg font-light leading-relaxed">{m.event}</p>
                </div>
                
                {/* Spacer for desktop */}
                <div className="hidden md:block w-[45%]" />
              </MotionSection>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Approach with phone mockups */}
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="relative container grid md:grid-cols-2 gap-20 items-center">
        {/* Two phones side by side */}
        <MotionSection animation="zoom-out" className="flex justify-center items-end gap-8 relative">
          <div className="absolute -inset-10 bg-primary/10 blur-[100px] rounded-full z-0 animate-pulse" />
          <div className="relative z-10 animate-slide-in-bottom" style={{ animationDelay: "0s" }}>
            <PhoneMockup color="primary" animationClass="animate-float" animationDelay="0s">
              <DashboardScreen />
            </PhoneMockup>
          </div>
          <div className="mb-16 relative z-10 animate-slide-in-bottom" style={{ animationDelay: "0.2s" }}>
            <PhoneMockup color="accent" animationClass="animate-float" animationDelay="0.5s">
              <FitnessScreen />
            </PhoneMockup>
          </div>
        </MotionSection>

        <MotionSection animation="skew-up">
          <span className="text-accent text-sm font-bold uppercase tracking-[0.3em]">Our Approach</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mt-4 mb-10 text-foreground leading-tight">Why Businesses <br /><span className="text-accent">Trust Us</span></h2>
          <div className="grid gap-6">
            {principles.map((p, i) => (
              <AnimatedSection key={i} delay={i * 150} animation="fade-in-up">
                <div className="flex gap-6 p-6 rounded-3xl glass hover:glow-border-strong transition-all duration-500 group hover:-translate-y-2 border-white/5">
                  <div className={`w-14 h-14 rounded-2xl bg-${p.color}/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-[0_0_25px_hsl(var(--${p.color})/0.3)] transition-all duration-500 border border-${p.color}/10`}>
                    <p.icon className={`text-${p.color}`} size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-foreground group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="text-muted-foreground font-light leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
          <div className="mt-12">
            <Link to="/services">
              <GooeyButton color="accent">
                Explore Services
              </GooeyButton>
            </Link>
          </div>
        </MotionSection>
      </div>
    </section>
  </Layout>
);

export default About;
