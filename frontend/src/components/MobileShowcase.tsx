import { lazy, Suspense } from "react";
import MotionSection from "@/components/MotionSection";
import TextReveal from "@/components/TextReveal";
import PhoneMockup from "@/components/PhoneMockup";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Lazy load heavy phone screen components
const EcommerceScreen = lazy(() => import("@/components/phone-screens/EcommerceScreen"));
const FitnessScreen = lazy(() => import("@/components/phone-screens/FitnessScreen"));
const DashboardScreen = lazy(() => import("@/components/phone-screens/DashboardScreen"));
const FoodScreen = lazy(() => import("@/components/phone-screens/FoodScreen"));
const SocialScreen = lazy(() => import("@/components/phone-screens/SocialScreen"));
const FintechScreen = lazy(() => import("@/components/phone-screens/FintechScreen"));

const PhoneFallback = () => <div className="w-full h-full bg-slate-800 rounded-2xl" />;

const phones: { color: "primary" | "secondary" | "accent"; Screen: React.LazyExoticComponent<() => JSX.Element>; delay: string }[] = [
  { color: "primary", Screen: EcommerceScreen, delay: "0s" },
  { color: "secondary", Screen: FitnessScreen, delay: "0.3s" },
  { color: "accent", Screen: DashboardScreen, delay: "0.6s" },
  { color: "primary", Screen: FoodScreen, delay: "0.9s" },
  { color: "secondary", Screen: SocialScreen, delay: "1.2s" },
  { color: "accent", Screen: FintechScreen, delay: "1.5s" },
];

const MobileShowcase = () => (
  <section className="py-16 md:py-32 overflow-hidden relative bg-background">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

    <div className="relative container">
      <MotionSection className="text-center mb-10 md:mb-20" animation="parallax-reveal">
<<<<<<< HEAD
        <span className="text-primary text-sm font-black uppercase tracking-[0.3em] mb-3 md:mb-4 block">Portfolio</span>
        <TextReveal
          text="Our Latest Masterpieces"
          className="text-2xl md:text-6xl font-heading font-black justify-center mb-3 md:mb-6"
        />
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-xl font-light leading-relaxed px-4 md:px-0">
=======
        <span className="text-primary text-sm font-black uppercase tracking-[0.3em] mb-4 block">Portfolio</span>
        <TextReveal
          text="Our Latest Masterpieces"
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-heading font-black justify-center mb-4 md:mb-6"
        />
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-xl font-light leading-relaxed px-2">
>>>>>>> d490115cbc132716e44405339c3955a4b5ef5bc3
          We build stunning mobile apps and web solutions that redefine user experience.
        </p>
      </MotionSection>

      <MotionSection animation="zoom-out" className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 blur-[80px] rounded-full -z-10" />
<<<<<<< HEAD
        <div className="flex items-end justify-center gap-2 md:gap-6 overflow-x-auto pb-4 px-2 md:px-4 scrollbar-hide">
          {phones.map(({ color, Screen, delay }, i) => (
            <AnimatedSection key={i} delay={i * 100} animation="fade-in-up">
              <div className={i % 2 === 1 ? "mb-6 md:mb-10" : ""}>
=======
        {/* Scrollable phone row — 3 visible on mobile, all 6 on desktop */}
        <div className="flex items-end justify-start md:justify-center gap-3 md:gap-6 overflow-x-auto pb-4 px-2 md:px-4 scrollbar-hide">
          {phones.map(({ color, Screen, delay }, i) => (
            <AnimatedSection key={i} delay={i * 100} animation="fade-in-up">
              <div className={`shrink-0 ${i % 2 === 1 ? "mb-8 md:mb-10" : ""} ${i >= 3 ? "hidden md:block" : ""}`}>
>>>>>>> d490115cbc132716e44405339c3955a4b5ef5bc3
                <PhoneMockup color={color} animationClass="animate-float" animationDelay={delay}>
                  <Suspense fallback={<PhoneFallback />}>
                    <Screen />
                  </Suspense>
                </PhoneMockup>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </MotionSection>

<<<<<<< HEAD
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mt-10 md:mt-20 items-stretch">
=======
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-10 md:mt-20">
>>>>>>> d490115cbc132716e44405339c3955a4b5ef5bc3
        {[
          { title: "Mobile App Development", desc: "iOS & Android apps with stunning UI, seamless UX, and world-class performance.", color: "primary" },
          { title: "Web Development", desc: "Responsive websites and web applications built for extreme performance and scale.", color: "secondary" },
          { title: "Full-Stack Solutions", desc: "End-to-end digital products from concept to deployment with modern tech stacks.", color: "accent" },
        ].map((item, i) => (
<<<<<<< HEAD
          <AnimatedSection key={i} delay={i * 150} animation="fade-in-up" className="h-full">
            <div className="h-full text-center group p-5 md:p-8 rounded-2xl md:rounded-3xl glass border-border hover:glow-border transition-all duration-500 flex flex-col items-center">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-${item.color}/10 border border-${item.color}/20 flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 group-hover:bg-${item.color}/20 transition-all duration-300 shrink-0`}>
                <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-${item.color} animate-pulse`} />
              </div>
              <h3 className={`text-sm md:text-xl font-heading font-bold mb-2 md:mb-3 group-hover:text-${item.color} transition-colors duration-300 leading-tight`}>{item.title}</h3>
              <p className="text-muted-foreground font-light leading-relaxed text-xs md:text-sm flex-1">{item.desc}</p>
=======
          <AnimatedSection key={i} delay={i * 150} animation="fade-in-up">
            <div className="text-center group p-5 md:p-8 rounded-2xl md:rounded-3xl glass border-border hover:glow-border transition-all duration-500 hover:-translate-y-1">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-${item.color}/10 border border-${item.color}/20 flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 group-hover:bg-${item.color}/20 transition-all duration-300`}>
                <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-${item.color} animate-pulse`} />
              </div>
              <h3 className={`text-base md:text-xl font-heading font-bold mb-2 md:mb-3 group-hover:text-${item.color} transition-colors duration-300`}>{item.title}</h3>
              <p className="text-muted-foreground font-light leading-relaxed text-xs md:text-sm">{item.desc}</p>
>>>>>>> d490115cbc132716e44405339c3955a4b5ef5bc3
            </div>
          </AnimatedSection>
        ))}
      </div>

      <div className="text-center mt-8 md:mt-16">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] hover:scale-105 transition-all duration-300"
        >
          View All Projects <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

export default MobileShowcase;
