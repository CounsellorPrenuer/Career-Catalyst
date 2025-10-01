import { useEffect, useRef, useState } from 'react';
import BlogCard from './BlogCard';

export default function BlogSection() {
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
  const blogPosts = [
    {
      title: '5 Signs It\'s Time for a Career Change',
      excerpt:
        'Feeling stuck in your current role? Discover the key indicators that it might be time to explore new opportunities and reignite your professional passion.',
      date: 'Jan 15, 2025',
      category: 'Career Tips',
    },
    {
      title: 'Building High-Performance Teams in SMEs',
      excerpt:
        'Learn the strategic HR practices that transform average teams into exceptional performers, driving business growth and employee satisfaction.',
      date: 'Jan 10, 2025',
      category: 'HR Strategy',
    },
    {
      title: 'The Power of Values Alignment in Your Career',
      excerpt:
        'Discover how aligning your work with your core values can lead to unprecedented fulfillment, productivity, and long-term career success.',
      date: 'Jan 5, 2025',
      category: 'Personal Growth',
    },
  ];

  return (
    <section id="blog" ref={sectionRef} className="py-16 sm:py-20 md:py-24 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(77,182,172,0.05),transparent_70%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-12 sm:mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary">Blog</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-4">
            Insights & Resources
          </h2>
          <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert advice on careers, HR, and personal development
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post, index) => (
            <div 
              key={index}
              className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'} stagger-${index + 1}`}
            >
              <BlogCard {...post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
