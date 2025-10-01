import ServiceCard from './ServiceCard';
import { Compass, Target, Heart, FileText } from 'lucide-react';

export default function IndividualServices() {
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
    <section id="individuals" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
            Unlock Your Dream Career
          </h2>
          <p className="font-heading text-2xl sm:text-3xl text-primary">
            Where Passion Meets Purpose!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              variant="individual"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
