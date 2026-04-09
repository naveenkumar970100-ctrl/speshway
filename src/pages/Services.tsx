import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import PhoneMockup from "@/components/PhoneMockup";
import EcommerceScreen from "@/components/phone-screens/EcommerceScreen";
import DashboardScreen from "@/components/phone-screens/DashboardScreen";
import { Code, Cloud, Shield, Cpu, Smartphone, Database, Globe, Settings, BarChart, ArrowRight, CheckCircle } from "lucide-react";
import webShowcase from "@/assets/web-showcase.png";

const services = [
  { icon: Code, title: "Web Development", desc: "Custom web applications using React, Node.js, and modern frameworks.", color: "primary" },
  { icon: Smartphone, title: "Mobile Development", desc: "Native and cross-platform mobile apps for iOS and Android.", color: "secondary" },
  { icon: Cloud, title: "Cloud Solutions", desc: "AWS, Azure, and GCP cloud architecture, migration, and management.", color: "accent" },
  { icon: Shield, title: "Cybersecurity", desc: "Security audits, penetration testing, and compliance solutions.", color: "primary" },
  { icon: Cpu, title: "AI & Machine Learning", desc: "Intelligent automation, NLP, computer vision, and predictive analytics.", color: "secondary" },
  { icon: Database, title: "Data Engineering", desc: "Data pipelines, warehousing, and real-time analytics platforms.", color: "accent" },
  { icon: Globe, title: "Digital Marketing", desc: "SEO, SEM, social media, and content marketing strategies.", color: "primary" },
  { icon: Settings, title: "DevOps & CI/CD", desc: "Automated deployment pipelines and infrastructure as code.", color: "secondary" },
  { icon: BarChart, title: "IT Consulting", desc: "Strategic technology roadmaps and digital transformation advisory.", color: "accent" },
];

const process = [
  { step: "01", title: "Discovery", desc: "We understand your goals, challenges, and requirements." },
  { step: "02", title: "Planning", desc: "Detailed roadmap, architecture design, and sprint planning." },
  { step: "03", title: "Development", desc: "Agile development with regular demos and feedback loops." },
  { step: "04", title: "Delivery", desc: "Testing, deployment, and post-launch support." },
];

const Services = () => (
  <Layout>
    <PageHeader title="Our Services" subtitle="Comprehensive IT solutions to power your business growth." />

    {/* Services Grid */}
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/5 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="container relative">
        <AnimatedSection className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">What We Offer</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-3">End-to-End IT Solutions</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">From strategy to execution, we cover every aspect of your digital journey.</p>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 80} animation={i % 3 === 0 ? "slide-in-left" : i % 3 === 1 ? "scale-in" : "slide-in-right"}>
              <div className="group h-full p-6 rounded-xl glass hover:glow-border-strong hover:shadow-xl transition-all duration-500 card-3d">
                <div className={`w-14 h-14 rounded-xl bg-${s.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-[0_0_25px_hsl(var(--${s.color})/0.35)] transition-all duration-300 border border-${s.color}/10`}>
                  <s.icon className={`text-${s.color}`} size={28} />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
                <span className={`inline-flex items-center gap-1 text-${s.color} text-sm font-medium opacity-0 group-hover:opacity-100 group-hover:gap-2 transition-all duration-300`}>
                  Learn More <ArrowRight size={14} />
                </span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="relative container">
        <AnimatedSection className="text-center mb-12">
          <span className="text-secondary text-sm font-semibold uppercase tracking-widest">How We Work</span>
          <h2 className="text-3xl font-heading font-bold mt-2 text-foreground">Our Process</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary via-secondary to-accent animate-line-grow origin-left" />
          {process.map((p, i) => (
            <AnimatedSection key={p.step} delay={i * 150} animation="fade-in-up">
              <div className="text-center group">
                <div className="relative w-16 h-16 mx-auto mb-4 z-10">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary opacity-20 animate-ping-slow" style={{ animationDelay: `${i * 0.4}s` }} />
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg group-hover:scale-110 group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-300">
                    {p.step}
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Mobile App Showcase with phone mockups */}
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-background to-secondary/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl" />
      <div className="relative container grid md:grid-cols-2 gap-12 items-center">
        <AnimatedSection animation="slide-in-left">
          <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Mobile Excellence</span>
          <h2 className="text-3xl font-heading font-bold mt-2 mb-4 text-foreground">We Build Apps People Love</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            From concept to launch, we create mobile experiences that engage users and drive business results. Our apps are built for performance, security, and scalability.
          </p>
          <div className="flex flex-col gap-3 mb-6">
            {["Cross-platform iOS & Android", "Offline-first architecture", "Real-time sync & push notifications", "App Store optimization"].map((f, i) => (
              <AnimatedSection key={f} delay={i * 80} animation="slide-in-left">
                <div className="flex items-center gap-3 group">
                  <CheckCircle className="text-secondary shrink-0 group-hover:scale-110 transition-transform" size={16} />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{f}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="flex gap-4">
            {[{ val: "200+", label: "Apps Built", color: "primary" }, { val: "4.8★", label: "Avg Rating", color: "secondary" }, { val: "1M+", label: "Downloads", color: "accent" }].map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 100} animation="scale-in">
                <div className="glass rounded-xl p-4 text-center hover:glow-border transition-all duration-300 hover:-translate-y-1">
                  <div className={`text-2xl font-bold text-${s.color}`}>{s.val}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* Phone mockups */}
        <AnimatedSection animation="slide-in-right" className="flex justify-center items-end gap-4">
          <PhoneMockup color="primary" animationClass="animate-float" animationDelay="0s">
            <EcommerceScreen />
          </PhoneMockup>
          <PhoneMockup color="secondary" animationClass="animate-float" animationDelay="1.2s" className="mb-8">
            <DashboardScreen />
          </PhoneMockup>
        </AnimatedSection>
      </div>
    </section>

    {/* Web showcase */}
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <AnimatedSection animation="slide-in-left" className="order-2 md:order-1">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img
              src={webShowcase}
              alt="Web development showcase"
              className="relative rounded-2xl w-full object-cover shadow-2xl group-hover:scale-[1.02] transition-transform duration-500 animate-tilt"
              loading="lazy"
            />
          </div>
        </AnimatedSection>
        <AnimatedSection animation="slide-in-right" className="order-1 md:order-2">
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Web Development</span>
          <h2 className="text-3xl font-heading font-bold mt-2 mb-4 text-foreground">Powerful Web Experiences</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            We craft responsive, high-performance web applications that look stunning and convert visitors into customers.
          </p>
          {["React, Next.js & TypeScript", "REST & GraphQL APIs", "SEO-optimized & accessible", "CI/CD & cloud deployment"].map((f, i) => (
            <AnimatedSection key={f} delay={i * 80} animation="slide-in-right">
              <div className="flex items-center gap-3 mb-3 group">
                <CheckCircle className="text-accent shrink-0 group-hover:scale-110 transition-transform" size={16} />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{f}</span>
              </div>
            </AnimatedSection>
          ))}
        </AnimatedSection>
      </div>
    </section>
  </Layout>
);

export default Services;
