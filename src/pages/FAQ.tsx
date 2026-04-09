import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, MessageCircle, Search, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const faqs = [
  { q: "What services does Speshway Solutions offer?", a: "We offer web and mobile development, cloud solutions, cybersecurity, AI/ML, data engineering, DevOps, IT consulting, and digital marketing services.", category: "Services" },
  { q: "How do you handle project communication?", a: "We use Agile methodology with regular sprint reviews, daily standups, and dedicated project managers to ensure transparent communication.", category: "Process" },
  { q: "What technologies do you work with?", a: "We work with React, Node.js, Python, Java, AWS, Azure, GCP, MongoDB, PostgreSQL, Docker, Kubernetes, and many more.", category: "Tech" },
  { q: "Do you offer support after project delivery?", a: "Yes, we provide ongoing maintenance, support, and SLA-based services to ensure your applications run smoothly.", category: "Support" },
  { q: "Can you work with existing codebases?", a: "Absolutely. We regularly onboard existing projects, perform code audits, and enhance or refactor codebases to meet modern standards.", category: "Process" },
  { q: "What is your pricing model?", a: "We offer flexible pricing including fixed-price projects, time & materials, and dedicated team models based on your needs.", category: "Pricing" },
  { q: "How do I get started?", a: "Simply reach out through our contact page or email us. We'll schedule a discovery call to understand your requirements.", category: "Process" },
];

const categoryColors: Record<string, string> = {
  Services: "bg-primary/10 text-primary",
  Process: "bg-secondary/10 text-secondary",
  Tech: "bg-accent/10 text-accent",
  Support: "bg-primary/10 text-primary",
  Pricing: "bg-secondary/10 text-secondary",
};

const FAQ = () => {
  const [search, setSearch] = useState("");
  const filtered = faqs.filter(f =>
    f.q.toLowerCase().includes(search.toLowerCase()) ||
    f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <PageHeader title="FAQ" subtitle="Frequently asked questions about our services." />

      <section className="py-16 relative overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />

        {/* Animated orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/8 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-secondary/8 blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-accent/5 blur-3xl" />

        {/* Spinning ring decoration */}
        <div className="absolute top-16 right-16 w-32 h-32 rounded-full border border-primary/10 animate-spin-slow" />
        <div className="absolute bottom-16 left-16 w-20 h-20 rounded-full border border-secondary/10 animate-counter-spin" />

        <div className="relative container max-w-2xl mx-auto px-4">

          {/* Header */}
          <AnimatedSection animation="fade-in-up" className="text-center mb-12">
            <div className="relative inline-flex mb-5">
              {/* Ping rings */}
              <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping-slow" />
              <div className="absolute inset-0 rounded-2xl bg-primary/10 animate-ping-slow" style={{ animationDelay: "0.5s" }} />
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center relative z-10 border border-primary/20">
                <HelpCircle className="text-primary" size={32} />
              </div>
            </div>
            <h2 className="text-3xl font-heading font-bold text-shimmer mb-3">Got Questions?</h2>
            <p className="text-muted-foreground">Find answers to the most common questions below.</p>
            {/* Animated underline */}
            <div className="mt-3 h-px w-24 mx-auto bg-gradient-to-r from-primary to-secondary animate-line-grow origin-left" />
          </AnimatedSection>

          {/* Search */}
          <AnimatedSection animation="fade-in-up" delay={100} className="mb-8">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center">
                <Search className="absolute left-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-300 z-10" size={18} />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl glass-strong focus:outline-none transition-all duration-300 text-sm"
                />
                {search && (
                  <span className="absolute right-4 text-xs text-muted-foreground">
                    {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* Accordion */}
          <AnimatedSection animation="fade-in-up" delay={200}>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {filtered.map((f, i) => (
                <div
                  key={i}
                  className="opacity-0 animate-slide-in-bottom"
                  style={{ animationDelay: `${i * 60 + 300}ms`, animationFillMode: "forwards" }}
                >
                  <AccordionItem
                    value={`item-${i}`}
                    className="glass-strong rounded-xl px-6 border-none hover:glow-border-strong transition-all duration-300 group card-3d"
                  >
                    <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary transition-colors py-5 hover:no-underline">
                      <span className="flex items-start gap-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 mt-0.5 ${categoryColors[f.category] ?? "bg-primary/10 text-primary"}`}>
                          {f.category}
                        </span>
                        {f.q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed text-sm">
                      <div className="pl-1 border-l-2 border-primary/30 ml-1 pl-4">
                        {f.a}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </div>
              ))}
              {filtered.length === 0 && (
                <AnimatedSection animation="scale-in">
                  <div className="text-center py-16 text-muted-foreground glass-strong rounded-xl">
                    <Search className="mx-auto mb-3 opacity-30" size={40} />
                    <p className="font-medium">No results for "{search}"</p>
                    <p className="text-sm mt-1 opacity-60">Try a different keyword</p>
                  </div>
                </AnimatedSection>
              )}
            </Accordion>
          </AnimatedSection>

          {/* Still have questions */}
          <AnimatedSection animation="scale-in" delay={400} className="mt-16">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/10 to-secondary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative glass-strong rounded-2xl p-8 text-center glow-border hover:-translate-y-2 transition-all duration-500">
                {/* Sparkle decoration */}
                <Sparkles className="absolute top-4 right-4 text-primary/30 animate-bounce-subtle" size={18} />
                <Sparkles className="absolute bottom-4 left-4 text-secondary/30 animate-bounce-subtle" size={14} style={{ animationDelay: "0.7s" }} />

                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:shadow-[0_0_25px_hsl(var(--secondary)/0.3)] transition-all duration-500 border border-secondary/20">
                  <MessageCircle className="text-secondary" size={26} />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2 text-foreground">Still Have Questions?</h3>
                <p className="text-muted-foreground text-sm mb-6 max-w-xs mx-auto">Our team is here to help. Reach out and we'll get back to you within 24 hours.</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_25px_hsl(var(--primary)/0.5)] transition-all duration-300 hover:scale-105 hover:gap-3"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
