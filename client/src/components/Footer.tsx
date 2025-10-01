import { Linkedin, Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <h3 className="font-heading text-2xl font-bold mb-2">Career Catalyst</h3>
            <p className="font-sans text-sm text-white/80 mb-4">By Elroy Vaz</p>
            <p className="font-sans text-sm text-white/70 leading-relaxed">
              Catalyzing careers and empowering businesses through expert guidance and
              strategic HR solutions.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 font-sans text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-white/80 hover:text-white transition-colors"
                  data-testid="footer-link-about"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('individuals')}
                  className="text-white/80 hover:text-white transition-colors"
                  data-testid="footer-link-individuals"
                >
                  For Individuals
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('businesses')}
                  className="text-white/80 hover:text-white transition-colors"
                  data-testid="footer-link-businesses"
                >
                  For Businesses
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-white/80 hover:text-white transition-colors"
                  data-testid="footer-link-pricing"
                >
                  Pricing
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-bold mb-4">Services</h4>
            <ul className="space-y-2 font-sans text-sm text-white/80">
              <li>Career Roadmapping</li>
              <li>Interest & Ability Audits</li>
              <li>Talent Acquisition</li>
              <li>Performance Management</li>
              <li>Learning & Development</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-bold mb-4">Contact</h4>
            <ul className="space-y-3 font-sans text-sm">
              <li>
                <a
                  href="mailto:elroyv@gmail.com"
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                  data-testid="footer-link-email"
                >
                  <Mail className="w-4 h-4" />
                  elroyv@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+971502404129"
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                  data-testid="footer-link-phone"
                >
                  <Phone className="w-4 h-4" />
                  +971 50 240 4129
                </a>
              </li>
              <li className="flex gap-3 mt-4">
                <a
                  href="https://www.linkedin.com/in/elroy-vaz-educator-learninganddevelopmentspecialist/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                  data-testid="footer-link-linkedin"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/ecv167/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                  data-testid="footer-link-instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8">
          <p className="font-sans text-sm text-white/70 text-center">
            © {new Date().getFullYear()} Career Catalyst by Elroy Vaz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
