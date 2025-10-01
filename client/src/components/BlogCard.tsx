import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export default function BlogCard({ title, excerpt, date, category }: BlogCardProps) {
  return (
    <Card className="group cursor-pointer h-full transition-all duration-500 card-hover-lift bg-white/80 backdrop-blur-sm border border-border/50 hover:border-primary/20 overflow-hidden">
      <CardContent className="p-6 sm:p-8">
        {/* Category and date badge */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span className="px-3 py-1 bg-gradient-to-r from-primary/10 to-primary/5 text-primary text-xs font-semibold rounded-full border border-primary/20 transition-all group-hover:scale-105">
            {category}
          </span>
          <div className="flex items-center gap-1 text-muted-foreground text-xs sm:text-sm">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{date}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-heading text-lg sm:text-xl font-bold text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3 mb-4">
          {excerpt}
        </p>

        {/* Read more link */}
        <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
          <span>Read More</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </CardContent>
    </Card>
  );
}
