import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating?: number;
}

export default function TestimonialCard({
  name,
  role,
  content,
  rating = 5,
}: TestimonialCardProps) {
  return (
    <Card className="h-full transition-all duration-500 card-hover-lift bg-white/80 backdrop-blur-sm border border-border/50 hover:border-primary/20 group">
      <CardContent className="p-6 sm:p-8 relative">
        {/* Quote icon */}
        <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Quote className="w-16 h-16 text-primary" />
        </div>

        {/* Rating stars */}
        <div className="flex gap-1 mb-4 relative z-10">
          {Array.from({ length: rating }).map((_, i) => (
            <div key={i} className="animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-accent text-accent" />
            </div>
          ))}
        </div>

        {/* Testimonial content */}
        <p className="font-sans text-sm sm:text-base text-foreground leading-relaxed mb-6 italic relative z-10">
          "{content}"
        </p>

        {/* Author info */}
        <div className="relative z-10">
          <p className="font-heading font-bold text-base sm:text-lg text-card-foreground">{name}</p>
          <p className="font-sans text-xs sm:text-sm text-muted-foreground">{role}</p>
        </div>

        {/* Decorative line */}
        <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-primary to-secondary"></div>
      </CardContent>
    </Card>
  );
}
