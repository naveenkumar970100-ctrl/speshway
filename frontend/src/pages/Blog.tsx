import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import PhoneMockup from "@/components/PhoneMockup";
import SocialScreen from "@/components/phone-screens/SocialScreen";
import { Calendar, ArrowRight, Clock, User } from "lucide-react";
import webShowcase from "@/assets/web-showcase.png";

const posts = [
  { title: "The Future of AI in Enterprise Software", date: "Mar 25, 2026", excerpt: "How artificial intelligence is reshaping enterprise operations and decision-making processes at scale.", tag: "AI", readTime: "5 min", author: "Rajesh K." },
  { title: "Why Cloud-Native Architecture Matters", date: "Mar 18, 2026", excerpt: "Benefits of building cloud-native applications for scalability and resilience in modern businesses.", tag: "Cloud", readTime: "4 min", author: "Priya S." },
  { title: "Best Practices for Secure Web Development", date: "Mar 10, 2026", excerpt: "Essential security practices every development team should follow to protect users and data.", tag: "Security", readTime: "6 min", author: "Vikram P." },
  { title: "Scaling Your Startup with the Right Tech Stack", date: "Feb 28, 2026", excerpt: "Choosing technologies that grow with your business without creating technical debt.", tag: "Strategy", readTime: "3 min", author: "Ananya R." },
  { title: "Introduction to DevOps Culture", date: "Feb 15, 2026", excerpt: "How DevOps practices accelerate delivery and improve reliability across engineering teams.", tag: "DevOps", readTime: "5 min", author: "Karthik N." },
  { title: "Data-Driven Decision Making", date: "Feb 5, 2026", excerpt: "Leveraging analytics and real-time dashboards to make smarter business decisions.", tag: "Data", readTime: "4 min", author: "Meera G." },
];

const tagColors: Record<string, string> = {
  AI: "bg-primary/10 text-primary",
  Cloud: "bg-secondary/10 text-secondary",
  Security: "bg-accent/10 text-accent",
  Strategy: "bg-primary/10 text-primary",
  DevOps: "bg-secondary/10 text-secondary",
  Data: "bg-accent/10 text-accent",
};

const tagText: Record<string, string> = {
  AI: "primary", Cloud: "secondary", Security: "accent",
  Strategy: "primary", DevOps: "secondary", Data: "accent",
};

const Blog = () => (
  <Layout>
    <PageHeader title="Blog" subtitle="Insights, tutorials, and industry updates from our team." />

    {/* Featured post */}
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-primary/5 blur-3xl" />
      <div className="relative container grid md:grid-cols-2 gap-12 items-center">
        <AnimatedSection animation="slide-in-left">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">Featured</span>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tagColors[posts[0].tag]}`}>{posts[0].tag}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3 hover:text-primary transition-colors cursor-pointer">{posts[0].title}</h2>
          <p className="text-muted-foreground mb-5 leading-relaxed">{posts[0].excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
            <span className="flex items-center gap-1"><User size={12} /> {posts[0].author}</span>
            <span className="flex items-center gap-1"><Calendar size={12} /> {posts[0].date}</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {posts[0].readTime}</span>
          </div>
          <a href="#" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all duration-300 hover:scale-105">
            Read Article <ArrowRight size={14} />
          </a>
        </AnimatedSection>

        {/* Web showcase image */}
        <AnimatedSection animation="slide-in-right">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img
              src={webShowcase}
              alt="Blog featured"
              className="relative rounded-2xl w-full object-cover shadow-2xl animate-blur-in group-hover:scale-[1.02] group-hover:drop-shadow-[0_0_30px_hsl(var(--primary)/0.3)] transition-all duration-500"
              loading="lazy"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* All Posts */}
    <section className="py-12 pb-20 bg-background relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-secondary/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />
      <div className="container relative">
        <AnimatedSection className="mb-10">
          <span className="text-secondary text-sm font-semibold uppercase tracking-widest">All Articles</span>
          <h2 className="text-2xl font-heading font-bold mt-1 text-foreground">Latest Posts</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(1).map((p, i) => (
            <AnimatedSection key={p.title} delay={i * 100} animation={i % 3 === 0 ? "slide-in-left" : i % 3 === 1 ? "fade-in-up" : "slide-in-right"}>
              <div className="group h-full flex flex-col p-6 rounded-xl glass hover:glow-border-strong transition-all duration-500 hover:-translate-y-3 cursor-pointer card-3d">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full w-fit ${tagColors[p.tag]}`}>{p.tag}</span>
                <h3 className="font-heading font-semibold text-lg mt-3 mb-2 text-foreground group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground flex-1 leading-relaxed">{p.excerpt}</p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/50 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><User size={12} /> {p.author}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} /> {p.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {p.readTime}</span>
                </div>
                <span className={`inline-flex items-center gap-1 text-sm text-${tagText[p.tag]} font-medium mt-3 group-hover:gap-2 transition-all`}>
                  Read More <ArrowRight size={14} />
                </span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Newsletter + phone */}
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-card to-secondary/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
      <div className="relative container grid md:grid-cols-2 gap-12 items-center">
        <AnimatedSection animation="slide-in-left" className="text-center md:text-left">
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Stay Updated</span>
          <h2 className="text-3xl font-heading font-bold mt-2 mb-4 text-foreground">Subscribe to Our Newsletter</h2>
          <p className="text-muted-foreground mb-6">Get the latest insights, tutorials, and industry news delivered to your inbox.</p>
          <div className="flex gap-3 max-w-md">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-xl glass focus:glow-border focus:outline-none transition-all text-sm"
            />
            <button className="px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all duration-300 hover:scale-105 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </AnimatedSection>
        <AnimatedSection animation="slide-in-right" className="flex justify-center">
          <div className="animate-slide-in-bottom" style={{ animationDelay: "0.1s" }}>
            <PhoneMockup color="accent" animationClass="animate-float" animationDelay="0.3s">
              <SocialScreen />
            </PhoneMockup>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </Layout>
);

export default Blog;
