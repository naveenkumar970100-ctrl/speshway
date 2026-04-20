import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import MotionSection from "@/components/MotionSection";
import GooeyButton from "@/components/GooeyButton";
import TextReveal from "@/components/TextReveal";
import MagneticButton from "@/components/MagneticButton";
import { Linkedin, Github, Twitter, Users, Award, Globe, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ApiMember {
  _id: string; name: string; role: string; bio: string; initials: string;
  gradient: string; linkedin: string; github: string; twitter: string; image: string;
}

const Team = () => {
  const [apiMembers, setApiMembers] = useState<ApiMember[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/team").then(r => r.json()).then(data => { setApiMembers(Array.isArray(data) ? data : []); setLoadingMembers(false); }).catch(() => setLoadingMembers(false));
    fetch("/api/site-content").then(r => r.json()).then(data => setContent(data)).catch(() => {});
  }, []);

  const sc = (key: string, fallback: string) => content[key] || fallback;
  const members = apiMembers.map(m => ({ ...m, icon: Briefcase }));

  return (
  <Layout>
    <PageHeader title="Our Team" subtitle="Meet the talented people behind Speshway Solutions." />

    {/* Culture */}
    <section className="py-12 md:py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      <div className="relative container">
        <div className="text-center mb-10 md:mb-20">
          <MotionSection animation="parallax-reveal">
            <span className="text-primary text-sm font-bold uppercase tracking-[0.3em]">Our Culture</span>
            <TextReveal
              text="What Makes Us Different"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-4 justify-center"
            />
          </MotionSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
          {[
            { icon: Users, color: "primary", titleKey: "culture1_title", descKey: "culture1_desc", defaultTitle: "Collaborative", defaultDesc: "We work as one team, sharing knowledge and lifting each other up." },
            { icon: Award, color: "secondary", titleKey: "culture2_title", descKey: "culture2_desc", defaultTitle: "Excellence", defaultDesc: "We hold ourselves to the highest standards in everything we do." },
            { icon: Globe, color: "accent", titleKey: "culture3_title", descKey: "culture3_desc", defaultTitle: "Inclusive", defaultDesc: "Diverse perspectives make us stronger and more innovative." },
          ].map((c, i) => (
            <MotionSection key={i} delay={i * 0.1} animation="skew-up">
              <div className="glass rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 text-center hover:glow-border-strong transition-all duration-700 group border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-${c.color}/10 flex items-center justify-center mx-auto mb-5 md:mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-${c.color}/10 relative z-10`}>
                  <c.icon className={`text-${c.color}`} size={24} />
                </div>
                <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-3 md:mb-4 relative z-10">{sc(c.titleKey, c.defaultTitle)}</h3>
                <p className="text-muted-foreground leading-relaxed font-light text-sm md:text-base relative z-10">{sc(c.descKey, c.defaultDesc)}</p>
              </div>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>

    {/* Team Grid */}
    <section className="py-12 md:py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="container relative">
        <div className="text-center mb-10 md:mb-20">
          <MotionSection animation="parallax-reveal">
            <span className="text-secondary text-sm font-bold uppercase tracking-[0.3em]">The People</span>
            <TextReveal
              text="Meet the Team"
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-heading font-bold mt-4 justify-center"
            />
          </MotionSection>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {loadingMembers ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl md:rounded-[3rem] glass border-white/5 p-8 animate-pulse">
                <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-white/10 mx-auto mb-6" />
                <div className="h-5 bg-white/10 rounded-full w-3/4 mx-auto mb-3" />
                <div className="h-4 bg-white/10 rounded-full w-1/2 mx-auto" />
              </div>
            ))
          ) : members.length === 0 ? (
            <div className="col-span-3 text-center py-16 text-muted-foreground">
              <div className="text-5xl mb-4">👥</div>
              <p className="text-xl font-semibold">Team members coming soon.</p>
            </div>
          ) : (
            members.map((m, i) => (
              <MotionSection key={m.name} delay={i * 0.1} animation="skew-up">
                <div className="group text-center p-6 md:p-10 rounded-2xl md:rounded-[3rem] glass hover:glow-border-strong transition-all duration-700 hover:-translate-y-2 border-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative inline-block mb-6 md:mb-10">
                    {m.image ? (
                      <img src={m.image} alt={m.name} className="w-32 h-32 md:w-44 md:h-44 mx-auto rounded-full object-cover object-center group-hover:scale-105 group-hover:shadow-[0_0_50px_hsl(var(--primary)/0.5)] transition-all duration-700 relative z-10 border-4 border-primary/30 group-hover:border-primary/70" />
                    ) : (
                      <div className={`w-32 h-32 md:w-44 md:h-44 mx-auto rounded-full bg-gradient-to-br ${m.gradient} flex items-center justify-center text-4xl md:text-5xl font-heading font-black text-primary-foreground group-hover:scale-105 transition-all duration-700 relative z-10 overflow-hidden`}>
                        {m.initials}
                        <div className="absolute -bottom-1 -right-1 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card border border-white/10 flex items-center justify-center shadow-xl">
                          <m.icon size={16} className="text-primary" />
                        </div>
                      </div>
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-1.5 md:mb-2 group-hover:text-primary transition-colors duration-500">{m.name}</h3>
                  <p className="text-xs md:text-sm text-primary font-black uppercase tracking-widest mb-3 md:mb-4 opacity-80">{m.role}</p>
                  <p className="text-muted-foreground font-light leading-relaxed mb-5 md:mb-8 text-sm">{m.bio}</p>

                  <div className="flex justify-center gap-3 md:gap-4 relative z-10">
                    {[
                      { Icon: Linkedin, url: m.linkedin },
                      { Icon: Github, url: m.github },
                      { Icon: Twitter, url: m.twitter },
                    ].map(({ Icon, url }, j) => (
                      <MagneticButton key={j} distance={30} strength={0.4}>
                        <a href={url || "#"} target={url ? "_blank" : undefined} rel="noopener noreferrer"
                          className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 cursor-pointer border border-white/5">
                          <Icon size={16} />
                        </a>
                      </MagneticButton>
                    ))}
                  </div>
                </div>
              </MotionSection>
            ))
          )}
        </div>
      </div>
    </section>

    {/* Join Us CTA */}
    <section className="py-16 md:py-32 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-card/50 to-secondary/20" />
      <MotionSection animation="zoom-out" className="container text-center relative z-10 px-4">
        <TextReveal
          text="Want to Join Our Team?"
          className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-heading font-black mb-6 md:mb-8 justify-center"
        />
        <p className="text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-xl font-light leading-relaxed">
          We're always looking for talented people who are passionate about technology and innovation.
        </p>
        <Link to="/career">
          <GooeyButton color="primary">
            View Open Positions <ArrowRight size={20} className="inline ml-2" />
          </GooeyButton>
        </Link>
      </MotionSection>
    </section>
  </Layout>
  );
};

export default Team;
