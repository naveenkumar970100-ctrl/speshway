import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import MotionSection from "@/components/MotionSection";
import GooeyButton from "@/components/GooeyButton";
import PhoneMockup from "@/components/PhoneMockup";
import FitnessScreen from "@/components/phone-screens/FitnessScreen";
import DashboardScreen from "@/components/phone-screens/DashboardScreen";
import TextReveal from "@/components/TextReveal";
import MagneticButton from "@/components/MagneticButton";
import { MapPin, Clock, ArrowRight, DollarSign, Zap, Heart, Coffee, BookOpen, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { useAssets } from "@/hooks/useAssets";
import { cn } from "@/lib/utils";

interface ApiJob {
  _id: string; title: string; location: string; type: string; salary: string;
  department: string; experience: string; desc: string; requirements: string[]; status: string;
}

const defaultJobs: ApiJob[] = []; // No dummy data — show only real jobs from DB

const Career = () => {
  const { aboutTeam } = useAssets();
  const [apiJobs, setApiJobs] = useState<ApiJob[]>([]);
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/jobs").then(r => r.json()).then(data => setApiJobs(Array.isArray(data) ? data : [])).catch(() => {});
    fetch("/api/site-content").then(r => r.json()).then(data => setContent(data)).catch(() => {});
  }, []);

  const sc = (key: string, fallback: string) => content[key] || fallback;

  const perks = [
    { icon: Zap, label: sc("perk1_label", "Flexible work hours"), color: "primary" },
    { icon: Heart, label: sc("perk2_label", "Health insurance"), color: "accent" },
    { icon: Coffee, label: sc("perk3_label", "Remote-friendly"), color: "secondary" },
    { icon: BookOpen, label: sc("perk4_label", "Learning budget"), color: "primary" },
  ];

  const jobs = apiJobs;

  return (
  <Layout>
    <PageHeader title="Careers" subtitle="Join our team and shape the future of technology." />

    {/* Culture Section */}
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      <div className="relative container grid md:grid-cols-2 gap-20 items-center">
        <MotionSection animation="skew-up">
          <span className="text-accent text-sm font-bold uppercase tracking-[0.3em] mb-4 block">Life at Speshway</span>
          <TextReveal 
            text="Build Your Career With Us" 
            className="text-4xl md:text-6xl font-heading font-bold mb-8 leading-tight"
          />
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 font-light max-w-lg">
            We believe in creating an environment where talent thrives. Join a team that values innovation, collaboration, and continuous growth.
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            {perks.map((perk, i) => (
              <AnimatedSection key={perk.label} delay={i * 100} animation="scale-up">
                <div className="flex items-center gap-4 p-6 rounded-2xl glass hover:glow-border-strong transition-all duration-500 group hover:-translate-y-2 border-white/5">
                  <div className={`w-12 h-12 rounded-xl bg-${perk.color}/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-[0_0_30px_hsl(var(--${perk.color})/0.3)] transition-all duration-500 border border-${perk.color}/10`}>
                    <perk.icon className={`text-${perk.color}`} size={22} />
                  </div>
                  <span className="text-base font-medium text-muted-foreground group-hover:text-foreground transition-colors">{perk.label}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </MotionSection>

        {/* Phone mockup with enhanced glow */}
        <MotionSection animation="zoom-out" className="flex justify-center relative">
          <div className="relative group">
            <div className="absolute -inset-20 bg-accent/10 blur-[100px] rounded-full z-0 animate-pulse" />
            <div className="relative z-10 animate-slide-in-bottom">
              <PhoneMockup color="accent" animationClass="animate-float" animationDelay="0s" className="shadow-2xl">
                <FitnessScreen />
              </PhoneMockup>
            </div>
          </div>
        </MotionSection>
      </div>
    </section>

    {/* Team photo */}
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container grid md:grid-cols-2 gap-24 items-center">
        <MotionSection animation="slide-horizontal">
          <div className="relative group">
            <div className="absolute -inset-10 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[3rem] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl animate-blur-in">
              <img
                src={aboutTeam}
                alt="Speshway team culture"
                className="w-full h-auto object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-1000 ease-out-expo"
                loading="lazy"
              />
            </div>
            
            <div className="absolute -bottom-8 -left-8 glass rounded-2xl px-8 py-6 glow-border-strong shadow-2xl border-white/10">
              <div className="text-4xl font-black text-accent">100%</div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Remote Friendly</div>
            </div>
          </div>
        </MotionSection>
        
        <MotionSection animation="skew-up">
          <span className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4 block">Our Workspace</span>
          <TextReveal 
            text="Where Great Work Happens" 
            className="text-4xl md:text-5xl font-heading font-bold mb-8"
          />
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 font-light">
            Whether you're in our Hyderabad office or working remotely, you'll have everything you need to do your best work — fast machines, great tools, and an amazing team.
          </p>
          <div className="grid grid-cols-2 gap-6">
            {[
              { val: `${apiJobs.length || "0"}+`, label: "Open Positions", color: "primary" },
              { val: "200+", label: "Team Members", color: "secondary" },
              { val: "100%", label: "Remote OK", color: "accent" },
              { val: "2017", label: "Founded", color: "primary" },
            ].map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 120} animation="scale-up">
                <div className="glass rounded-2xl p-8 text-center hover:glow-border-strong transition-all duration-700 hover:-translate-y-2 border-white/5 group">
                  <div className={`text-4xl font-heading font-black text-${s.color} mb-2 group-hover:animate-glitch`}>{s.val}</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{s.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </MotionSection>
      </div>
    </section>

    {/* Open Positions */}
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      <div className="container max-w-4xl relative">
        <div className="text-center mb-20">
          <MotionSection animation="parallax-reveal">
            <span className="text-primary text-sm font-bold uppercase tracking-[0.3em]">Opportunities</span>
            <TextReveal 
              text="Open Positions" 
              className="text-4xl md:text-6xl font-heading font-bold mt-4 justify-center"
            />
            <p className="text-muted-foreground mt-6 text-lg font-light">We're always looking for talented people. Check out our current openings.</p>
          </MotionSection>
        </div>

        <div className="flex flex-col gap-6">
          {jobs.length === 0 ? (
            <div className="glass rounded-3xl p-16 text-center border-white/5">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">No Open Positions Right Now</h3>
              <p className="text-muted-foreground font-light mb-8">We don't have any open roles at the moment, but we're always looking for great talent.</p>
              <Link to="/contact"><GooeyButton color="primary">Send Your Resume <ArrowRight size={16} className="inline ml-1" /></GooeyButton></Link>
            </div>
          ) : (
          jobs.map((j, i) => (
            <MotionSection key={j.title} delay={i * 0.1} animation="skew-up">
              <div className="group p-8 rounded-[2.5rem] glass hover:glow-border-strong transition-all duration-700 ease-out-expo flex flex-col sm:flex-row sm:items-center justify-between gap-8 hover:-translate-y-2 card-3d border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="font-heading font-bold text-2xl text-foreground group-hover:text-primary transition-colors duration-500">{j.title}</h3>
                  <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-muted-foreground mt-4">
                    {j.location && <span className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> {j.location}</span>}
                    {j.type && <span className="flex items-center gap-2"><Clock size={16} className="text-secondary" /> {j.type}</span>}
                    {j.salary && <span className="flex items-center gap-2"><DollarSign size={16} className="text-accent" /> {j.salary}</span>}
                    {(j as ApiJob).department && <span className="flex items-center gap-2"><Briefcase size={16} className="text-primary" /> {(j as ApiJob).department}</span>}
                  </div>
                  <p className="text-muted-foreground mt-4 font-light leading-relaxed max-w-xl">{j.desc}</p>
                </div>
                <div className="relative z-10 shrink-0 flex flex-col gap-3">
                  <Link to={`/career/${(j as ApiJob)._id || ""}`}>
                    <GooeyButton color="secondary">
                      View Details <ArrowRight size={16} className="inline ml-1" />
                    </GooeyButton>
                  </Link>
                  <Link to={`/career/${(j as ApiJob)._id || ""}/apply`}>
                    <GooeyButton color="primary" className="!px-10 !py-4 text-[13px]">
                      Apply Now <ArrowRight size={18} className="inline ml-2" />
                    </GooeyButton>
                  </Link>
                </div>
              </div>
            </MotionSection>
          ))
          )}
        </div>
      </div>
    </section>

    {/* Dashboard phone + CTA */}
    <section className="py-32 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-card/50 to-primary/10" />
      
      <div className="relative container grid md:grid-cols-2 gap-24 items-center">
        <MotionSection animation="skew-up" className="text-center md:text-left">
          <TextReveal 
            text="Don't See a Fit?" 
            className="text-4xl md:text-7xl font-heading font-black mb-8 leading-tight"
          />
          <p className="text-muted-foreground text-xl font-light leading-relaxed mb-12 max-w-lg">
            Send us your resume anyway. We're always open to meeting great talent and finding a place for exceptional people.
          </p>
          <Link to="/contact">
            <GooeyButton color="primary">
              Get In Touch <ArrowRight size={22} className="inline ml-2" />
            </GooeyButton>
          </Link>
        </MotionSection>
        
        <MotionSection animation="zoom-out" className="flex justify-center relative">
          <div className="relative group">
            <div className="absolute -inset-20 bg-primary/10 blur-[100px] rounded-full z-0 animate-pulse" />
            <div className="relative z-10 animate-slide-in-bottom" style={{ animationDelay: "0.1s" }}>
              <PhoneMockup color="primary" animationClass="animate-float" animationDelay="0.4s" className="shadow-2xl">
                <DashboardScreen />
              </PhoneMockup>
            </div>
          </div>
        </MotionSection>
      </div>
    </section>
  </Layout>
  );
};

export default Career;
