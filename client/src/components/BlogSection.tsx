import { useEffect, useRef, useState } from 'react';
import BlogCard from './BlogCard';
import { client } from '../sanity/client';
import { postsQuery } from '../sanity/queries';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug?: { current: string }; // Sanity slug object
}

export default function BlogSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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

  useEffect(() => {
    client.fetch(postsQuery)
      .then((data: any[]) => {
        const formattedPosts = data.map(post => ({
          ...post,
          date: post.date ? format(new Date(post.date), 'MMM d, yyyy') : '',
        }));
        setBlogPosts(formattedPosts);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch blog posts:", err);
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to load blog posts.",
          variant: "destructive"
        });
      });
  }, [toast]);

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

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : blogPosts.length > 0 ? (
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
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            No blog posts available at the moment.
          </div>
        )}
      </div>
    </section>
  );
}
