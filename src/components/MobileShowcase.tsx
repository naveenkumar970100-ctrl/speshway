import AnimatedSection from "@/components/AnimatedSection";
import mobileShowcase from "@/assets/mobile-showcase.png";
import webShowcase from "@/assets/web-showcase.png";

const MobileShowcase = () => (
  <section className="py-20 overflow-hidden relative">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />

    <div className="relative container">
      <AnimatedSection className="text-center mb-16">
        <span className="text-primary text-sm font-semibold uppercase tracking-widest">Portfolio</span>
        <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-3">Our Latest Work</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          We build stunning mobile apps and web solutions that users love.
        </p>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Mobile Apps */}
        <AnimatedSection animation="slide-in-left" className="text-center">
          <div className="relative group">
            <div className="absolute -inset-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img
              src={mobileShowcase}
              alt="Mobile app development showcase"
              className="relative mx-auto max-h-[400px] object-contain animate-float drop-shadow-2xl"
              loading="lazy"
              width={600}
              height={400}
            />
          </div>
          <h3 className="text-xl font-heading font-bold mt-8 mb-2">Mobile App Development</h3>
          <p className="text-sm text-muted-foreground">
            iOS & Android apps with stunning UI, seamless UX, and high performance.
          </p>
        </AnimatedSection>

        {/* Web Development */}
        <AnimatedSection animation="slide-in-right" className="text-center">
          <div className="relative group">
            <div className="absolute -inset-8 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img
              src={webShowcase}
              alt="Web development showcase"
              className="relative mx-auto max-h-[400px] object-contain animate-tilt drop-shadow-2xl"
              loading="lazy"
              width={600}
              height={400}
            />
          </div>
          <h3 className="text-xl font-heading font-bold mt-8 mb-2">Web Development</h3>
          <p className="text-sm text-muted-foreground">
            Responsive websites and web applications built for performance and scale.
          </p>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default MobileShowcase;
