import BlogCard from '../BlogCard';

export default function BlogCardExample() {
  return (
    <div className="p-8 grid md:grid-cols-3 gap-8 max-w-6xl">
      <BlogCard
        title="5 Signs It's Time for a Career Change"
        excerpt="Feeling stuck? Here are the key indicators that it might be time to explore new opportunities."
        date="Jan 15, 2025"
        category="Career Tips"
      />
      <BlogCard
        title="Building High-Performance Teams in SMEs"
        excerpt="Learn the strategic HR practices that transform average teams into exceptional performers."
        date="Jan 10, 2025"
        category="HR Strategy"
      />
      <BlogCard
        title="The Power of Values Alignment in Your Career"
        excerpt="Discover how aligning your work with your core values can lead to unprecedented fulfillment."
        date="Jan 5, 2025"
        category="Personal Growth"
      />
    </div>
  );
}
