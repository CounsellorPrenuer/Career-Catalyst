import { useEffect, useRef, useState } from 'react';
import ServiceCard from './ServiceCard';
import { Users, TrendingUp, BookOpen, Settings } from 'lucide-react';

export default function BusinessServices() {
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
      icon: Users,
      title: 'Talent Acquisition',
      description:
        'Headhunting top-tier talent for mission-critical roles. Find the perfect fit for your team with our strategic recruitment expertise.',
    },
    {
      icon: TrendingUp,
      title: 'Performance Management',
      description:
        'Build systems for accountability and results. Implement frameworks that drive productivity and align your team with business objectives.',
    },
    {
      icon: BookOpen,
      title: 'Learning & Development',
      description:
        'Upskill your team with training modules that transform performance. Develop capabilities that give your business a competitive edge.',
    },
    {
      icon: Settings,
      title: 'Strategic HR Operations',
      description:
        'Onboarding, exit strategies, compliance, and HR dashboards. Streamline your HR processes for maximum efficiency and legal compliance.',
    },
  ];

  return (
    <section id="businesses" ref={sectionRef} className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-muted/30 to-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,125,139,0.1),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-12 sm:mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-secondary">For Businesses</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-4">
            SME HR Revolution
          </h2>
          <p className="font-heading text-xl sm:text-2xl md:text-3xl gradient-text">
            Turn HR Chaos into a Competitive Edge
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
                variant="business"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
