import { useEffect, useRef, useState } from 'react';
import ContactForm from './ContactForm';
import { Mail, Phone, Linkedin, Instagram, Clock } from 'lucide-react';

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-16 sm:py-20 md:py-24 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(77,182,172,0.1),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-12 sm:mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary">Let's Connect</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-4">
            Get In Touch
          </h2>
          <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to catalyze your career or empower your business? Let's start the conversation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          {/* Contact Form */}
          <div className={`md:col-span-3 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'} stagger-1`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-border/50">
              <ContactForm />
            </div>
          </div>
          
          {/* Contact Information */}
          <div className={`md:col-span-2 space-y-6 ${isVisible ? 'animate-fade-in-right' : 'opacity-0'} stagger-2`}>
            <div className="bg-gradient-to-br from-primary/10 to-transparent rounded-2xl p-6 sm:p-8 border border-primary/20">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-card-foreground mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <a
                  href="mailto:elroyv@gmail.com"
                  className="flex items-center gap-3 text-foreground hover-elevate p-3 sm:p-4 rounded-xl transition-all group bg-white/50"
                  data-testid="link-email"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-sans text-xs sm:text-sm text-muted-foreground">Email</p>
                    <p className="font-sans font-semibold text-sm sm:text-base">elroyv@gmail.com</p>
                  </div>
                </a>
                
                <a
                  href="tel:+971502404129"
                  className="flex items-center gap-3 text-foreground hover-elevate p-3 sm:p-4 rounded-xl transition-all group bg-white/50"
                  data-testid="link-phone"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-sans text-xs sm:text-sm text-muted-foreground">Phone</p>
                    <p className="font-sans font-semibold text-sm sm:text-base">+971 50 240 4129</p>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-border/50">
              <h3 className="font-heading text-lg sm:text-xl font-bold text-card-foreground mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Office Hours
              </h3>
              <div className="space-y-2 font-sans text-sm sm:text-base text-muted-foreground">
                <p className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-semibold text-foreground">9:00 AM - 6:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-semibold text-foreground">By Appointment</span>
                </p>
                <p className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-semibold text-foreground">Closed</span>
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-secondary/10 to-transparent rounded-2xl p-6 sm:p-8 border border-secondary/20">
              <h3 className="font-heading text-lg sm:text-xl font-bold text-card-foreground mb-4">
                Follow Us
              </h3>
              
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="https://www.linkedin.com/in/elroy-vaz-educator-learninganddevelopmentspecialist/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center hover-elevate transition-all shadow-lg hover:shadow-xl hover:scale-110 group"
                  data-testid="link-linkedin"
                >
                  <Linkedin className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://www.instagram.com/ecv167/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center hover-elevate transition-all shadow-lg hover:shadow-xl hover:scale-110 group"
                  data-testid="link-instagram"
                >
                  <Instagram className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
