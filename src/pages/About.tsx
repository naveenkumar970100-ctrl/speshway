import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import PhoneMockup from "@/components/PhoneMockup";
import DashboardScreen from "@/components/phone-screens/DashboardScreen";
import FitnessScreen from "@/components/phone-screens/FitnessScreen";
import { Target, Eye, Award, Rocket, Heart, Globe } from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";

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
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-secondary/5 blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
      <div className="container grid md:grid-cols-2 gap-12 items-center relative">
        <AnimatedSection animation="slide-in-left">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Who We Are</span>
          <h2 className="text-3xl font-heading font-bold mt-2 mb-4 text-foreground">Building Digital Excellence Since 2020</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Speshway Solutions is a leading IT services company specializing in custom software development, cloud solutions, and digital transformation. Founded with a passion for technology and innovation, we help businesses of all sizes leverage cutting-edge solutions.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Our team of experienced engineers, designers, and consultants work closely with clients to deliver solutions that drive measurable results and sustainable growth.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[{ val: "50+", label: "Projects" }, { val: "30+", label: "Clients" }, { val: "5+", label: "Years" }].map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 100} animation="scale-in">
                <div className="glass rounded-xl p-4 text-center hover:glow-border transition-all duration-300 hover:-translate-y-1">
                  <div className="text-2xl font-heading font-bold text-gradient">{s.val}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection animation="slide-in-right">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img
              src={aboutTeam}
              alt="Our team"
              className="relative rounded-2xl w-full object-cover shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
              width={600}
              height={400}
            />
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 glass rounded-xl px-4 py-3 glow-border animate-bounce-subtle">
              <div className="text-lg font-bold text-primary">5+ Years</div>
              <div className="text-xs text-muted-foreground">of Excellence</div>
            </div>
            <div className="absolute -top-4 -right-4 glass rounded-xl px-4 py-3 glow-border animate-bounce-subtle" style={{ animationDelay: "0.5s" }}>
              <div className="text-lg font-bold text-secondary">50+</div>
              <div className="text-xs text-muted-foreground">Projects Done</div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* Mission Vision Values */}
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-3xl" />
      <div className="relative container">
        <AnimatedSection className="text-center mb-12">
          <span className="text-secondary text-sm font-semibold uppercase tracking-widest">What Drives Us</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2">Mission, Vision & Values</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 150} animation="fade-in-up">
              <div className="glass rounded-xl p-8 h-full hover:glow-border-strong transition-all duration-500 hover:-translate-y-3 group card-3d">
                <div className={`w-14 h-14 rounded-xl bg-${item.color}/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-[0_0_25px_hsl(var(--${item.color})/0.35)] transition-all duration-300 border border-${item.color}/10`}>
                  <item.icon className={`text-${item.color}`} size={26} />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-3 text-foreground group-hover:text-shimmer transition-all">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container max-w-3xl">
        <AnimatedSection className="text-center mb-12">
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Our Journey</span>
          <h2 className="text-3xl font-heading font-bold mt-2 text-foreground">Milestones That Define Us</h2>
        </AnimatedSection>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent" />
          <div className="flex flex-col gap-6">
            {milestones.map((m, i) => (
              <AnimatedSection key={m.year} delay={i * 100} animation={i % 2 === 0 ? "slide-in-left" : "slide-in-right"}>
                <div className="flex items-start gap-6 group">
                  <div className="relative shrink-0 z-10">
                    <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping-slow" style={{ animationDelay: `${i * 0.3}s` }} />
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-primary-foreground group-hover:scale-110 group-hover:shadow-[0_0_25px_hsl(var(--primary)/0.5)] transition-all duration-300 relative">
                      {m.year.slice(2)}
                    </div>
                  </div>
                  <div className="glass rounded-xl p-4 flex-1 hover:glow-border-strong transition-all duration-300 group-hover:-translate-y-1 card-3d">
                    <span className="text-primary font-bold text-sm">{m.year}</span>
                    <p className="text-foreground text-sm mt-1">{m.event}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Approach with phone mockups */}
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-pulse" />
      <div className="relative container grid md:grid-cols-2 gap-12 items-center">
        {/* Two phones side by side */}
        <AnimatedSection animation="slide-in-left" className="flex justify-center items-end gap-6">
          <PhoneMockup color="primary" animationClass="animate-float" animationDelay="0s">
            <DashboardScreen />
          </PhoneMockup>
          <PhoneMockup color="accent" animationClass="animate-float" animationDelay="1s" className="mb-10">
            <FitnessScreen />
          </PhoneMockup>
        </AnimatedSection>

        <AnimatedSection animation="slide-in-right">
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Our Approach</span>
          <h2 className="text-3xl font-heading font-bold mt-2 mb-6 text-foreground">Why Businesses Trust Us</h2>
          <div className="grid gap-4">
            {principles.map((p, i) => (
              <AnimatedSection key={i} delay={i * 120} animation="fade-in-up">
                <div className="flex gap-4 p-4 rounded-xl glass hover:glow-border transition-all duration-300 group hover:-translate-y-1">
                  <div className={`w-10 h-10 rounded-lg bg-${p.color}/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_15px_hsl(var(--${p.color})/0.3)] transition-all duration-300`}>
                    <p.icon className={`text-${p.color}`} size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">{p.title}</h3>
                    <p className="text-sm text-muted-foreground">{p.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  </Layout>
);

export default About;
