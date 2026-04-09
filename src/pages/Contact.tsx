import { useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from "lucide-react";
import { toast } from "sonner";

const contactInfo = [
  { icon: Mail, label: "Email", value: "info@speshway.com", color: "primary" },
  { icon: Phone, label: "Phone", value: "+91 98765 43210", color: "secondary" },
  { icon: MapPin, label: "Address", value: "Hyderabad, Telangana, India", color: "accent" },
  { icon: Globe, label: "Website", value: "www.speshway.com", color: "primary" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      <PageHeader title="Contact Us" subtitle="Get in touch with our team." />

      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
        <div className="container grid md:grid-cols-2 gap-12 relative">

          {/* Form */}
          <AnimatedSection animation="slide-in-left">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">Get In Touch</span>
            <h2 className="text-2xl font-heading font-bold mt-2 mb-6 text-foreground">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { placeholder: "Your Name", key: "name", type: "text" },
                { placeholder: "Your Email", key: "email", type: "email" },
                { placeholder: "Subject", key: "subject", type: "text" },
              ].map((field, i) => (
                <AnimatedSection key={field.key} delay={i * 80} animation="fade-in-up">
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg glass focus:glow-border focus:outline-none transition-all duration-300 hover:border-primary/30"
                  />
                </AnimatedSection>
              ))}
              <AnimatedSection delay={240} animation="fade-in-up">
                <textarea
                  placeholder="Your Message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg glass focus:glow-border focus:outline-none transition-all duration-300 resize-none hover:border-primary/30"
                />
              </AnimatedSection>
              <AnimatedSection delay={320} animation="fade-in-up">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_25px_hsl(var(--primary)/0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Send size={16} /> Send Message
                </button>
              </AnimatedSection>
            </form>
          </AnimatedSection>

          {/* Info */}
          <AnimatedSection animation="slide-in-right">
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">Contact Info</span>
            <h2 className="text-2xl font-heading font-bold mt-2 mb-6 text-foreground">How to Reach Us</h2>
            <div className="flex flex-col gap-4">
              {contactInfo.map((c, i) => (
                <AnimatedSection key={c.label} delay={i * 100} animation="slide-in-right">
                  <div className="flex items-start gap-4 p-4 rounded-xl glass hover:glow-border-strong transition-all duration-300 group hover:-translate-y-1 card-3d">
                    <div className={`w-10 h-10 rounded-lg bg-${c.color}/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_18px_hsl(var(--${c.color})/0.35)] transition-all duration-300 border border-${c.color}/10`}>
                      <c.icon className={`text-${c.color}`} size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">{c.label}</h4>
                      <p className="text-muted-foreground text-sm">{c.value}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={400} animation="fade-in-up" className="mt-6">
              <div className="glass rounded-xl p-6 glow-border hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="text-primary" size={20} />
                  <h3 className="font-heading font-semibold text-foreground">Business Hours</h3>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                  <p>Saturday: 10:00 AM - 2:00 PM IST</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={500} animation="fade-in-up" className="mt-4">
              <div className="glass rounded-xl p-6 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="text-secondary" size={20} />
                  <h3 className="font-heading font-semibold text-foreground">Quick Response</h3>
                </div>
                <p className="text-sm text-muted-foreground">We typically respond within 2-4 business hours. For urgent matters, call us directly.</p>
              </div>
            </AnimatedSection>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
