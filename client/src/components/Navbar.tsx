import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'For Individuals', id: 'individuals' },
    { label: 'For Businesses', id: 'businesses' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-primary/5'
          : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col group"
            data-testid="button-logo"
          >
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center transition-transform group-hover:scale-110 ${isScrolled ? 'shadow-lg' : ''}`}>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading text-xl md:text-2xl font-bold gradient-text">
                Career Catalyst
              </span>
            </div>
            <span className="font-sans text-xs text-muted-foreground ml-10">
              By Elroy Vaz
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="font-sans text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-lg transition-all relative group"
                data-testid={`link-${link.id}`}
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300"></span>
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('contact')}
              variant="default"
              size="default"
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              data-testid="button-cta"
            >
              Book a Strategy Call
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover-elevate rounded-lg transition-all"
            data-testid="button-menu-toggle"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-t border-border/50 shadow-xl animate-fade-in">
          <div className="px-4 py-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left px-4 py-3 font-sans text-sm font-medium text-foreground hover-elevate rounded-lg transition-all"
                data-testid={`link-mobile-${link.id}`}
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('contact')}
              variant="default"
              size="default"
              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg"
              data-testid="button-mobile-cta"
            >
              Book a Strategy Call
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
