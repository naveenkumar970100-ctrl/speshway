import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import PhoneMockup from "@/components/PhoneMockup";
import FitnessScreen from "@/components/phone-screens/FitnessScreen";
import DashboardScreen from "@/components/phone-screens/DashboardScreen";
import { MapPin, Clock, ArrowRight, DollarSign, Zap, Heart, Coffee, BookOpen } from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";

const jobs = [
  { title: "Senior React Developer", location: "Hyderabad", type: "Full-time", salary: "₹12-18 LPA", desc: "Build modern web applications with React, TypeScript, and Node.js." },
  { title: "Cloud Engineer", location: "Remote", type: "Full-time", salary: "₹15-22 LPA", desc: "Design and manage cloud infrastructure on AWS and Azure." },
  { title: "UI/UX Designer", location: "Hyderabad", type: "Full-time", salary: "₹8-14 LPA", desc: "Create beautiful, user-centered designs for web and mobile." },
  { title: "Data Scientist", location: "Remote", type: "Contract", salary: "₹18-25 LPA", desc: "Develop ML models and analytics solutions for enterprise clients." },
  { title: "DevOps Engineer", location: "Hyderabad", type: "Full-time", salary: "₹14-20 LPA", desc: "Implement CI/CD pipelines and infrastructure automation." },
];

const perks = [
  { icon: Zap, label: "Flexible work hours", color: "primary" },
  { icon: Heart, label: "Health insurance", color: "accent" },
  { icon: Coffee, label: "Remote-friendly", color: "secondary" },
  { icon: BookOpen, label: "Learning budget", color: "primary" },
];

const Career = () => (
  <Layout>
    <PageHeader title="Careers" subtitle="Join our team and shape the future of technology." />

    {/* Culture Section */}
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-pulse" />
      <div className="relative container grid md:grid-cols-2 gap-12 items-center">
        <AnimatedSection animation="slide-in-left">
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Life at Speshway</span>
          <h2 className="text-3xl font-heading font-bold mt-2 mb-4 text-foreground">Build Your Career With Us</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            We believe in creating an environment where talent thrives. Join a team that values innovation, collaboration, and continuous growth.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {perks.map((perk, i) => (
              <AnimatedSection key={perk.label} delay={i * 100} animation="scale-in">
                <div className="flex items-center gap-3 p-4 rounded-xl glass hover:glow-border transition-all duration-300 group hover:-translate-y-1">
                  <div className={`w-9 h-9 rounded-lg bg-${perk.color}/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <perk.icon className={`text-${perk.color}`} size={18} />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{perk.label}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* Phone mockup */}
        <AnimatedSection animation="slide-in-right" className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/10 blur-3xl rounded-full scale-150 -z-10" />
            <PhoneMockup color="accent" animationClass="animate-tilt" animationDelay="0s">
              <FitnessScreen />
            </PhoneMockup>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* Team photo */}
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <AnimatedSection animation="slide-in-left">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img
              src={aboutTeam}
              alt="Speshway team culture"
              className="relative rounded-2xl w-full object-cover shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
              width={600}
              height={400}
            />
            <div className="absolute -bottom-4 -left-4 glass rounded-xl px-4 py-3 glow-border animate-bounce-subtle">
              <div className="text-lg font-bold text-accent">100%</div>
              <div className="text-xs text-muted-foreground">Remote Friendly</div>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection animation="slide-in-right">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Workspace</span>
          <h2 className="text-2xl font-heading font-bold mt-2 mb-4 text-foreground">Where Great Work Happens</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Whether you're in our Hyderabad office or working remotely, you'll have everything you need to do your best work — fast machines, great tools, and an amazing team.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { val: "15+", label: "Team Members", color: "primary" },
              { val: "3", label: "Countries", color: "secondary" },
              { val: "100%", label: "Remote OK", color: "accent" },
              { val: "5★", label: "Glassdoor", color: "primary" },
            ].map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 80} animation="scale-in">
                <div className="glass rounded-xl p-4 text-center hover:glow-border transition-all duration-300 hover:-translate-y-1">
                  <div className={`text-2xl font-bold text-${s.color}`}>{s.val}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* Open Positions */}
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-pulse" />
      <div className="container max-w-3xl relative">
        <AnimatedSection className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Opportunities</span>
          <h2 className="text-2xl font-heading font-bold mt-2 mb-3 text-foreground">Open Positions</h2>
          <p className="text-muted-foreground">We're always looking for talented people. Check out our current openings.</p>
        </AnimatedSection>
        <div className="flex flex-col gap-4">
          {jobs.map((j, i) => (
            <AnimatedSection key={j.title} delay={i * 100} animation={i % 2 === 0 ? "slide-in-left" : "slide-in-right"}>
              <div className="group p-6 rounded-xl glass hover:glow-border-strong transition-all duration-500 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:-translate-y-1 card-3d">
                <div>
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{j.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-2">
                    <span className="flex items-center gap-1"><MapPin size={14} className="text-primary" /> {j.location}</span>
                    <span className="flex items-center gap-1"><Clock size={14} className="text-secondary" /> {j.type}</span>
                    <span className="flex items-center gap-1"><DollarSign size={14} className="text-accent" /> {j.salary}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{j.desc}</p>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1 px-5 py-2.5 rounded-full bg-primary/10 text-sm text-primary font-semibold group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_25px_hsl(var(--primary)/0.4)] group-hover:gap-2 transition-all duration-300 cursor-pointer">
                  Apply <ArrowRight size={14} />
                </span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Dashboard phone + CTA */}
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-card to-primary/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl animate-pulse" />
      <div className="relative container grid md:grid-cols-2 gap-12 items-center">
        <AnimatedSection animation="fade-in-up" className="text-center md:text-left">
          <h2 className="text-3xl font-heading font-bold mb-4 text-foreground">Don't See a Fit?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg">Send us your resume anyway. We're always open to meeting great talent.</p>
          <a href="/contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-300 hover:scale-105">
            Get In Touch <ArrowRight size={16} />
          </a>
        </AnimatedSection>
        <AnimatedSection animation="slide-in-right" className="flex justify-center">
          <PhoneMockup color="primary" animationClass="animate-float" animationDelay="0.5s">
            <DashboardScreen />
          </PhoneMockup>
        </AnimatedSection>
      </div>
    </section>
  </Layout>
);

export default Career;
