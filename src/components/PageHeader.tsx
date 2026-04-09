const PageHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <section className="relative h-64 md:h-80 flex items-center justify-center text-center overflow-hidden">
    {/* Gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
    
    {/* Animated orbs */}
    <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-pulse" />
    <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-secondary/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
    
    {/* Grid pattern overlay */}
    <div className="absolute inset-0 opacity-5" style={{
      backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
      backgroundSize: "60px 60px"
    }} />
    
    <div className="relative z-10 animate-fade-in-up">
      <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-3">
        {title}
      </h1>
      {subtitle && <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base">{subtitle}</p>}
    </div>
  </section>
);

export default PageHeader;
