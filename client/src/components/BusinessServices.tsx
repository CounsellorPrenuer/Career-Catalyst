import ServiceCard from './ServiceCard';
import { Users, TrendingUp, BookOpen, Settings } from 'lucide-react';

export default function BusinessServices() {
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
    <section id="businesses" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
            SME HR Revolution
          </h2>
          <p className="font-heading text-2xl sm:text-3xl text-primary">
            Turn HR Chaos into a Competitive Edge
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              variant="business"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
