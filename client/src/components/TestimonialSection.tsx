import TestimonialCard from './TestimonialCard';

export default function TestimonialSection() {
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
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
            Success Stories
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from individuals and businesses who've transformed with Career Catalyst
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
