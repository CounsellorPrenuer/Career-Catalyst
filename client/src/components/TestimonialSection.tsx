import { useEffect, useRef, useState } from 'react';
import TestimonialCard from './TestimonialCard';

export default function TestimonialSection() {
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

  //todo: remove mock functionality
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Professional',
      content:
        'Elroy helped me find clarity when I was completely lost in my career. His personalized roadmap gave me the confidence to make a successful transition into a role I truly love.',
      rating: 5,
    },
    {
      name: 'Ahmed Al-Rashid',
      role: 'CEO, TechStart Solutions',
      content:
        'The HR systems Elroy implemented completely transformed our hiring process. We went from struggling to find talent to building a world-class team. Highly recommend!',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      role: 'Recent Graduate',
      content:
        'As a student, I had no idea what career path to choose. Elroy\'s interest audits and guidance helped me discover my true passion and land my dream internship!',
      rating: 5,
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-muted/30 via-background to-muted/20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-12 sm:mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-accent">Testimonials</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-4">
            Success Stories
          </h2>
          <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from individuals and businesses who've transformed with Career Catalyst
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'} stagger-${index + 1}`}
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
