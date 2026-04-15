import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import { Calendar, ArrowRight, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";

interface Post {
  _id: string; title: string; excerpt: string; tag: string; author: string;
  readTime: string; image: string; status: string; featured: boolean; createdAt: string;
}

const defaultPosts = [
  { _id: "1", title: "The Future of AI in Enterprise Software", createdAt: new Date().toISOString(), excerpt: "How artificial intelligence is reshaping enterprise operations and decision-making processes at scale.", tag: "AI", readTime: "5 min", author: "Rajesh K.", image: "", status: "Published", featured: true },
  { _id: "2", title: "Why Cloud-Native Architecture Matters", createdAt: new Date().toISOString(), excerpt: "Benefits of building cloud-native applications for scalability and resilience in modern businesses.", tag: "Cloud", readTime: "4 min", author: "Priya S.", image: "", status: "Published", featured: false },
  { _id: "3", title: "Best Practices for Secure Web Development", createdAt: new Date().toISOString(), excerpt: "Essential security practices every development team should follow to protect users and data.", tag: "Security", readTime: "6 min", author: "Vikram P.", image: "", status: "Published", featured: false },
  { _id: "4", title: "Scaling Your Startup with the Right Tech Stack", createdAt: new Date().toISOString(), excerpt: "Choosing technologies that grow with your business without creating technical debt.", tag: "Strategy", readTime: "3 min", author: "Ananya R.", image: "", status: "Published", featured: false },
  { _id: "5", title: "Introduction to DevOps Culture", createdAt: new Date().toISOString(), excerpt: "How DevOps practices accelerate delivery and improve reliability across engineering teams.", tag: "DevOps", readTime: "5 min", author: "Karthik N.", image: "", status: "Published", featured: false },
  { _id: "6", title: "Data-Driven Decision Making", createdAt: new Date().toISOString(), excerpt: "Leveraging analytics and real-time dashboards to make smarter business decisions.", tag: "Data", readTime: "4 min", author: "Meera G.", image: "", status: "Published", featured: false },
];

const tagColorMap: Record<string, string> = {
  AI: "bg-primary/10 text-primary", Cloud: "bg-secondary/10 text-secondary",
  Security: "bg-accent/10 text-accent", Strategy: "bg-primary/10 text-primary",
  DevOps: "bg-secondary/10 text-secondary", Data: "bg-accent/10 text-accent",
  Technology: "bg-primary/10 text-primary", Mobile: "bg-secondary/10 text-secondary",
  General: "bg-muted text-muted-foreground",
};

const tagTextMap: Record<string, string> = {
  AI: "primary", Cloud: "secondary", Security: "accent", Strategy: "primary",
  DevOps: "secondary", Data: "accent", Technology: "primary", Mobile: "secondary", General: "muted-foreground",
};

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then(r => r.json())
      .then(data => setPosts(Array.isArray(data) && data.length > 0 ? data : defaultPosts))
      .catch(() => setPosts(defaultPosts));
  }, []);

  const featured = posts.find(p => p.featured) || posts[0];
  const rest = posts.filter(p => p._id !== featured?._id);

  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <Layout>
      <PageHeader title="Blog" subtitle="Insights, tutorials, and industry updates from our team." />

      {/* Featured post */}
      {featured && (
        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-primary/5 blur-3xl" />
          <div className="relative container grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="slide-in-left">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">Featured</span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tagColorMap[featured.tag] || "bg-muted text-muted-foreground"}`}>{featured.tag}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3 hover:text-primary transition-colors cursor-pointer">{featured.title}</h2>
              <p className="text-muted-foreground mb-5 leading-relaxed">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
                <span className="flex items-center gap-1"><User size={12} /> {featured.author}</span>
                <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(featured.createdAt)}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {featured.readTime}</span>
              </div>
              <Link to={`/blog/${featured._id}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all duration-300 hover:scale-105">
                Read Article <ArrowRight size={14} />
              </Link>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-right">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                {featured.image ? (
                  <img src={featured.image} alt={featured.title}
                    className="relative rounded-2xl w-full object-cover shadow-2xl animate-blur-in group-hover:scale-[1.02] transition-all duration-500 max-h-64" />
                ) : (
                  <div className="relative rounded-2xl w-full h-48 glass border border-border flex items-center justify-center text-6xl">📝</div>
                )}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

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
            {rest.map((p, i) => (
              <AnimatedSection key={p._id} delay={i * 100} animation={i % 3 === 0 ? "slide-in-left" : i % 3 === 1 ? "fade-in-up" : "slide-in-right"}>
                <Link to={`/blog/${p._id}`} className="group h-full flex flex-col rounded-xl glass hover:glow-border-strong transition-all duration-500 hover:-translate-y-3 cursor-pointer card-3d overflow-hidden">
                  {p.image && <img src={p.image} alt={p.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />}
                  <div className="p-6 flex flex-col flex-1">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full w-fit ${tagColorMap[p.tag] || "bg-muted text-muted-foreground"}`}>{p.tag}</span>
                    <h3 className="font-heading font-semibold text-lg mt-3 mb-2 text-foreground group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="text-sm text-muted-foreground flex-1 leading-relaxed line-clamp-3">{p.excerpt}</p>
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/50 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><User size={12} /> {p.author}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(p.createdAt)}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {p.readTime}</span>
                    </div>
                    <span className={`inline-flex items-center gap-1 text-sm text-${tagTextMap[p.tag] || "primary"} font-medium mt-3 group-hover:gap-2 transition-all`}>
                      Read More <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Blog;
