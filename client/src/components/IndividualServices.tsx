import { useEffect, useRef, useState } from 'react';
import ServiceCard from './ServiceCard';
import { Compass, Target, Heart, FileText } from 'lucide-react';

export default function IndividualServices() {
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

  const services = [
    {
      icon: Compass,
      title: 'Career Roadmapping',
      description:
        'For Professionals, Students (8-12), and Graduates. Get a clear, personalized path to your ideal career with actionable steps tailored to your unique journey.',
    },
    {
      icon: Target,
      title: 'Interest & Ability Audits',
      description:
        'Pinpoint careers that match your unique strengths and joy. Discover what you love doing and turn it into a fulfilling career path.',
    },
    {
      icon: Heart,
      title: 'Values Alignment',
      description:
        'Find work that feels right and aligns with your core values. Build a career that brings meaning and satisfaction to your life.',
    },
    {
      icon: FileText,
      title: 'Profile Building',
      description:
        'Create standout profiles for college and early career success. Position yourself effectively to achieve your academic and professional goals.',
    },
  ];

  return (
    <section id="individuals" ref={sectionRef} className="py-16 sm:py-20 md:py-24 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(77,182,172,0.1),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-12 sm:mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary">For Individuals</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-4">
            Unlock Your Dream Career
          </h2>
          <p className="font-heading text-xl sm:text-2xl md:text-3xl gradient-text">
            Where Passion Meets Purpose!
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'} stagger-${index + 1}`}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                variant="individual"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
