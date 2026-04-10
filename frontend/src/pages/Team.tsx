import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import MotionSection from "@/components/MotionSection";
import GooeyButton from "@/components/GooeyButton";
import PhoneMockup from "@/components/PhoneMockup";
import SocialScreen from "@/components/phone-screens/SocialScreen";
import TextReveal from "@/components/TextReveal";
import MagneticButton from "@/components/MagneticButton";
import { Linkedin, Github, Twitter, Users, Award, Globe, Code, Cloud, Palette, BarChart2, Settings, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import aboutTeam from "@/assets/about-team.jpg";
import { cn } from "@/lib/utils";

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
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      <div className="relative container">
        <div className="text-center mb-20">
          <MotionSection animation="parallax-reveal">
            <span className="text-primary text-sm font-bold uppercase tracking-[0.3em]">Our Culture</span>
            <TextReveal 
              text="What Makes Us Different" 
              className="text-4xl md:text-5xl font-heading font-bold mt-4 justify-center"
            />
          </MotionSection>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {culture.map((c, i) => (
            <MotionSection key={c.title} delay={i * 0.1} animation="skew-up">
              <div className="glass rounded-[2.5rem] p-10 text-center hover:glow-border-strong transition-all duration-700 hover:-translate-y-2 group card-3d border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className={`w-16 h-16 rounded-2xl bg-${c.color}/10 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_40px_hsl(var(--${c.color})/0.4)] transition-all duration-500 border border-${c.color}/10 relative z-10`}>
                  <c.icon className={`text-${c.color}`} size={28} />
                </div>
                <h3 className="font-heading font-bold text-2xl text-foreground mb-4 relative z-10">{c.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-light relative z-10">{c.desc}</p>
              </div>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>

    {/* Team photo + social phone */}
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container grid md:grid-cols-2 gap-24 items-center">
        <MotionSection animation="zoom-out">
          <div className="relative group">
            <div className="absolute -inset-10 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[3rem] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl">
              <img
                src={aboutTeam}
                alt="Speshway team"
                className="w-full h-auto object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-1000 ease-out-expo"
                loading="lazy"
              />
            </div>
            
            <div className="absolute -bottom-8 -right-8 glass rounded-2xl px-8 py-6 glow-border-strong shadow-2xl border-white/10">
              <div className="text-4xl font-black text-primary">15+</div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Global Experts</div>
            </div>
          </div>
        </MotionSection>
        
        <MotionSection animation="skew-up" className="flex flex-col items-center md:items-start gap-10">
          <div>
            <span className="text-secondary text-sm font-bold uppercase tracking-[0.3em] mb-4 block">Connected Team</span>
            <TextReveal 
              text="We Build Together" 
              className="text-4xl md:text-6xl font-heading font-bold mb-6"
            />
            <p className="text-muted-foreground text-lg leading-relaxed font-light max-w-lg">
              Our team stays connected across time zones, collaborating on cutting-edge projects and sharing knowledge every day to deliver exceptional digital products.
            </p>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-10 bg-secondary/10 blur-[80px] rounded-full z-0" />
            <PhoneMockup color="secondary" animationClass="" animationDelay="0s" className="relative z-10 hover:scale-105 transition-transform duration-500 shadow-2xl">
              <SocialScreen />
            </PhoneMockup>
          </div>
        </MotionSection>
      </div>
    </section>

    {/* Team Grid */}
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container relative">
        <div className="text-center mb-20">
          <MotionSection animation="parallax-reveal">
            <span className="text-secondary text-sm font-bold uppercase tracking-[0.3em]">The People</span>
            <TextReveal 
              text="Meet the Team" 
              className="text-4xl md:text-6xl font-heading font-bold mt-4 justify-center"
            />
          </MotionSection>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {members.map((m, i) => (
            <MotionSection key={m.name} delay={i * 0.1} animation="skew-up">
              <div className="group text-center p-10 rounded-[3rem] glass hover:glow-border-strong transition-all duration-700 hover:-translate-y-4 card-3d border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative inline-block mb-10">
                  <div className={`absolute -inset-4 rounded-full border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className={`absolute -inset-8 rounded-full border border-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className={`w-28 h-24 mx-auto rounded-full bg-gradient-to-br ${m.gradient} flex items-center justify-center text-3xl font-heading font-black text-primary-foreground group-hover:scale-110 group-hover:shadow-[0_0_50px_hsl(var(--primary)/0.5)] transition-all duration-700 relative z-10 overflow-hidden`}>
                    <span className="group-hover:animate-glitch">{m.initials}</span>
                    <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-card border border-white/10 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                      <m.icon size={16} className="text-primary" />
                    </div>
                  </div>
                </div>
                
                <h3 className="font-heading font-bold text-2xl text-foreground mb-2 group-hover:text-primary transition-colors duration-500">{m.name}</h3>
                <p className="text-sm text-primary font-black uppercase tracking-widest mb-4 opacity-80">{m.role}</p>
                <p className="text-muted-foreground font-light leading-relaxed mb-8">{m.bio}</p>
                
                <div className="flex justify-center gap-4 relative z-10">
                  {[Linkedin, Github, Twitter].map((Icon, j) => (
                    <MagneticButton key={j} distance={30} strength={0.4}>
                      <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 cursor-pointer border border-white/5">
                        <Icon size={18} />
                      </div>
                    </MagneticButton>
                  ))}
                </div>
              </div>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>

    {/* Join Us CTA */}
    <section className="py-32 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-card/50 to-secondary/20" />
      
      <MotionSection animation="zoom-out" className="container text-center relative z-10">
        <TextReveal 
          text="Want to Join Our Team?" 
          className="text-4xl md:text-7xl font-heading font-black mb-8 justify-center"
        />
        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto text-xl font-light leading-relaxed">
          We're always looking for talented people who are passionate about technology and innovation.
        </p>
        <Link to="/career">
          <GooeyButton color="primary">
            View Open Positions <ArrowRight size={22} className="inline ml-2" />
          </GooeyButton>
        </Link>
      </MotionSection>
    </section>
  </Layout>
);

export default Team;
