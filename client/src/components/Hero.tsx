import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Decorative dots */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(77,182,172,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Transform Your Future</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up stagger-1">
          <span className="gradient-text">Catalyzing Careers.</span>
          <br />
          <span className="text-secondary">Empowering Businesses.</span>
        </h1>
        
        <p className="font-sans text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in-up stagger-2">
          Expert career guidance for individuals seeking purpose and strategic HR
          solutions for SMEs driving for growth.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up stagger-3">
          <Button
            onClick={() => scrollToSection('individuals')}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg min-w-[240px] group shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            data-testid="button-advance-career"
          >
            Advance My Career
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            onClick={() => scrollToSection('businesses')}
            size="lg"
            variant="outline"
            className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white px-8 py-6 text-lg min-w-[240px] group shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            data-testid="button-grow-business"
          >
            <TrendingUp className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
            Grow My Business
          </Button>
        </div>

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 animate-fade-in-up stagger-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary/10 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Careers Transformed</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary/10 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">SMEs Empowered</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary/10 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary/10 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
