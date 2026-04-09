import AnimatedSection from "@/components/AnimatedSection";
import MotionSection from "@/components/MotionSection";
import TextReveal from "@/components/TextReveal";
import mobileShowcase from "@/assets/mobile-showcase.png";
import webShowcase from "@/assets/web-showcase.png";

const MobileShowcase = () => (
  <section className="py-32 overflow-hidden relative bg-background">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
    
    <div className="relative container">
      <MotionSection className="text-center mb-24" animation="parallax-reveal">
        <span className="text-primary text-sm font-black uppercase tracking-[0.3em] mb-4 block">Portfolio</span>
        <TextReveal 
          text="Our Latest Masterpieces" 
          className="text-4xl md:text-6xl font-heading font-black justify-center mb-6"
        />
        <p className="text-muted-foreground max-w-2xl mx-auto text-xl font-light leading-relaxed">
          We build stunning mobile apps and web solutions that redefine user experience.
        </p>
      </MotionSection>

      <div className="grid md:grid-cols-2 gap-24 items-center">
        {/* Mobile Apps */}
        <MotionSection animation="zoom-out" className="text-center group">
          <div className="relative">
            <div className="absolute -inset-12 bg-primary/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative animate-float-y" style={{ animationDuration: "4s" }}>
              <img
                src={mobileShowcase}
                alt="Mobile app development showcase"
                className="relative mx-auto max-h-[500px] object-contain drop-shadow-[0_0_40px_rgba(0,0,0,0.3)] group-hover:drop-shadow-[0_0_60px_hsl(var(--primary)/0.4)] group-hover:scale-105 transition-all duration-700 will-change-transform"
                loading="lazy"
              />
            </div>
          </div>
          <h3 className="text-3xl font-heading font-bold mt-12 mb-4 group-hover:text-primary transition-colors duration-500">Mobile App Development</h3>
          <p className="text-lg text-muted-foreground font-light leading-relaxed">
            iOS & Android apps with stunning UI, seamless UX, and world-class performance.
          </p>
        </MotionSection>

        {/* Web Development */}
        <MotionSection animation="zoom-out" delay={0.2} className="text-center group">
          <div className="relative">
            <div className="absolute -inset-12 bg-secondary/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative animate-float-y" style={{ animationDuration: "5s", animationDelay: "0.5s" }}>
              <img
                src={webShowcase}
                alt="Web development showcase"
                className="relative mx-auto max-h-[500px] object-contain drop-shadow-[0_0_40px_rgba(0,0,0,0.3)] group-hover:drop-shadow-[0_0_60px_hsl(var(--secondary)/0.4)] group-hover:scale-105 transition-all duration-700 will-change-transform"
                loading="lazy"
              />
            </div>
          </div>
          <h3 className="text-3xl font-heading font-bold mt-12 mb-4 group-hover:text-secondary transition-colors duration-500">Web Development</h3>
          <p className="text-lg text-muted-foreground font-light leading-relaxed">
            Responsive websites and web applications built for extreme performance and scale.
          </p>
        </MotionSection>
      </div>
    </div>
  </section>
);

export default MobileShowcase;
