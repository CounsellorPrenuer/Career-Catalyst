import BlogCard from './BlogCard';

export default function BlogSection() {
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
    <section id="blog" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
            Insights & Resources
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert advice on careers, HR, and personal development
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
}
