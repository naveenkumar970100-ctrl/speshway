import MotionSection from "@/components/MotionSection";
import TextReveal from "@/components/TextReveal";
import PhoneMockup from "@/components/PhoneMockup";
import AnimatedSection from "@/components/AnimatedSection";
import EcommerceScreen from "@/components/phone-screens/EcommerceScreen";
import FitnessScreen from "@/components/phone-screens/FitnessScreen";
import DashboardScreen from "@/components/phone-screens/DashboardScreen";
import FoodScreen from "@/components/phone-screens/FoodScreen";
import SocialScreen from "@/components/phone-screens/SocialScreen";
import FintechScreen from "@/components/phone-screens/FintechScreen";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const phones = [
  { color: "primary" as const, screen: <EcommerceScreen />, delay: "0s" },
  { color: "secondary" as const, screen: <FitnessScreen />, delay: "0.3s" },
  { color: "accent" as const, screen: <DashboardScreen />, delay: "0.6s" },
  { color: "primary" as const, screen: <FoodScreen />, delay: "0.9s" },
  { color: "secondary" as const, screen: <SocialScreen />, delay: "1.2s" },
  { color: "accent" as const, screen: <FintechScreen />, delay: "1.5s" },
];

const MobileShowcase = () => (
  <section className="py-32 overflow-hidden relative bg-background">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

    <div className="relative container">
      <MotionSection className="text-center mb-20" animation="parallax-reveal">
        <span className="text-primary text-sm font-black uppercase tracking-[0.3em] mb-4 block">Portfolio</span>
        <TextReveal
          text="Our Latest Masterpieces"
          className="text-4xl md:text-6xl font-heading font-black justify-center mb-6"
        />
        <p className="text-muted-foreground max-w-2xl mx-auto text-xl font-light leading-relaxed">
          We build stunning mobile apps and web solutions that redefine user experience.
        </p>
      </MotionSection>

      {/* Phone mockup row */}
      <MotionSection animation="zoom-out" className="relative">
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 blur-[80px] rounded-full -z-10" />

        {/* Scrollable phone row */}
        <div className="flex items-end justify-center gap-4 md:gap-6 overflow-x-auto pb-4 px-4 scrollbar-hide">
          {phones.map((p, i) => (
            <AnimatedSection key={i} delay={i * 100} animation="fade-in-up">
              <div className={i % 2 === 1 ? "mb-10" : ""}>
                <PhoneMockup
                  color={p.color}
                  animationClass="animate-float"
                  animationDelay={p.delay}
                >
                  {p.screen}
                </PhoneMockup>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </MotionSection>

      {/* Labels */}
      <div className="grid md:grid-cols-3 gap-8 mt-20">
        {[
          { title: "Mobile App Development", desc: "iOS & Android apps with stunning UI, seamless UX, and world-class performance.", color: "primary" },
          { title: "Web Development", desc: "Responsive websites and web applications built for extreme performance and scale.", color: "secondary" },
          { title: "Full-Stack Solutions", desc: "End-to-end digital products from concept to deployment with modern tech stacks.", color: "accent" },
        ].map((item, i) => (
          <AnimatedSection key={i} delay={i * 150} animation="fade-in-up">
            <div className="text-center group p-8 rounded-3xl glass border-border hover:glow-border transition-all duration-500 hover:-translate-y-2">
              <div className={`w-12 h-12 rounded-2xl bg-${item.color}/10 border border-${item.color}/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-${item.color}/20 transition-all duration-300`}>
                <div className={`w-3 h-3 rounded-full bg-${item.color} animate-pulse`} />
              </div>
              <h3 className={`text-xl font-heading font-bold mb-3 group-hover:text-${item.color} transition-colors duration-300`}>{item.title}</h3>
              <p className="text-muted-foreground font-light leading-relaxed text-sm">{item.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <Link
          to="/projects"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-widest hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] hover:scale-105 transition-all duration-300"
        >
          View All Projects <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  </section>
);

export default MobileShowcase;
