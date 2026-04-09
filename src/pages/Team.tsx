import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import PhoneMockup from "@/components/PhoneMockup";
import SocialScreen from "@/components/phone-screens/SocialScreen";
import { Linkedin, Github, Twitter, Users, Award, Globe, Code, Cloud, Palette, BarChart2, Settings, Briefcase } from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";

const members = [
  { name: "Rajesh Kumar", role: "CEO & Founder", bio: "15+ years in IT leadership and digital strategy.", initials: "RK", gradient: "from-primary to-accent", icon: Briefcase },
  { name: "Priya Sharma", role: "CTO", bio: "Expert in cloud architecture and AI/ML systems.", initials: "PS", gradient: "from-secondary to-primary", icon: Cloud },
  { name: "Vikram Patel", role: "Lead Developer", bio: "Full-stack engineer specializing in React and Node.js.", initials: "VP", gradient: "from-accent to-secondary", icon: Code },
  { name: "Ananya Reddy", role: "UX Designer", bio: "Creating intuitive user experiences for complex systems.", initials: "AR", gradient: "from-primary to-secondary", icon: Palette },
  { name: "Karthik Nair", role: "DevOps Engineer", bio: "Infrastructure automation and CI/CD specialist.", initials: "KN", gradient: "from-secondary to-accent", icon: Settings },
  { name: "Meera Gupta", role: "Project Manager", bio: "Agile practitioner delivering projects on time and budget.", initials: "MG", gradient: "from-accent to-primary", icon: BarChart2 },
];

const culture = [
  { icon: Users, title: "Collaborative", desc: "We work as one team, sharing knowledge and lifting each other up.", color: "primary" },
  { icon: Award, title: "Excellence", desc: "We hold ourselves to the highest standards in everything we do.", color: "secondary" },
  { icon: Globe, title: "Inclusive", desc: "Diverse perspectives make us stronger and more innovative.", color: "accent" },
];

const Team = () => (
  <Layout>
    <PageHeader title="Our Team" subtitle="Meet the talented people behind Speshway Solutions." />

    {/* Culture */}
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl" />
      <div className="relative container">
        <AnimatedSection className="text-center mb-10">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Culture</span>
          <h2 className="text-3xl font-heading font-bold mt-2 text-foreground">What Makes Us Different</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-6">
          {culture.map((c, i) => (
            <AnimatedSection key={c.title} delay={i * 120} animation="fade-in-up">
              <div className="glass rounded-xl p-6 text-center hover:glow-border transition-all duration-500 hover:-translate-y-2 group">
                <div className={`w-12 h-12 rounded-xl bg-${c.color}/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:shadow-[0_0_20px_hsl(var(--${c.color})/0.3)] transition-all duration-300`}>
                  <c.icon className={`text-${c.color}`} size={22} />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Team photo + social phone */}
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-pulse" />
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <AnimatedSection animation="slide-in-left">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img
              src={aboutTeam}
              alt="Speshway team"
              className="relative rounded-2xl w-full object-cover shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
              width={600}
              height={400}
            />
            <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3 glow-border animate-bounce-subtle">
              <div className="text-lg font-bold text-primary">15+</div>
              <div className="text-xs text-muted-foreground">Team Members</div>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection animation="slide-in-right" className="flex flex-col items-center gap-4">
          <div>
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Connected Team</span>
            <h2 className="text-2xl font-heading font-bold mt-2 mb-3 text-foreground">We Build Together</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Our team stays connected across time zones, collaborating on cutting-edge projects and sharing knowledge every day.
            </p>
          </div>
          <PhoneMockup color="secondary" animationClass="animate-float" animationDelay="0s">
            <SocialScreen />
          </PhoneMockup>
        </AnimatedSection>
      </div>
    </section>

    {/* Team Grid */}
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
      <div className="container relative">
        <AnimatedSection className="text-center mb-12">
          <span className="text-secondary text-sm font-semibold uppercase tracking-widest">The People</span>
          <h2 className="text-3xl font-heading font-bold mt-2 text-foreground">Meet the Team</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((m, i) => (
            <AnimatedSection key={m.name} delay={i * 120} animation={i % 3 === 0 ? "slide-in-left" : i % 3 === 1 ? "fade-in-up" : "slide-in-right"}>
              <div className="group text-center p-8 rounded-xl glass hover:glow-border-strong transition-all duration-500 hover:-translate-y-3 card-3d">
                <div className="relative inline-block mb-5">
                  {/* Orbit ring */}
                  <div className={`absolute inset-0 rounded-full border border-primary/20 scale-125 animate-spin-slow`} />
                  <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${m.gradient} flex items-center justify-center text-2xl font-heading font-bold text-primary-foreground group-hover:scale-110 group-hover:shadow-[0_0_35px_hsl(var(--primary)/0.35)] transition-all duration-500 relative z-10`}>
                    {m.initials}
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-card border-2 border-border flex items-center justify-center">
                      <m.icon size={12} className="text-primary" />
                    </div>
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-shimmer transition-all">{m.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">{m.role}</p>
                <p className="text-sm text-muted-foreground mb-5">{m.bio}</p>
                <div className="flex justify-center gap-3">
                  {[Linkedin, Github, Twitter].map((Icon, j) => (
                    <div key={j} className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:scale-125 hover:shadow-[0_0_12px_hsl(var(--primary)/0.3)] transition-all duration-200 cursor-pointer">
                      <Icon size={15} />
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Join Us CTA */}
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-card to-secondary/10" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl animate-pulse" />
      <AnimatedSection animation="scale-in" className="container text-center relative z-10">
        <h2 className="text-3xl font-heading font-bold mb-4 text-foreground">Want to Join Our Team?</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">We're always looking for talented people who are passionate about technology.</p>
        <a href="/career" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-300 hover:scale-105">
          View Open Positions
        </a>
      </AnimatedSection>
    </section>
  </Layout>
);

export default Team;
