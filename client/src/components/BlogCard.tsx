import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export default function BlogCard({ title, excerpt, date, category }: BlogCardProps) {
  return (
    <Card className="hover-elevate transition-all duration-300 hover:shadow-xl cursor-pointer h-full">
      <CardContent className="p-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
            {category}
          </span>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
        </div>
        <h3 className="font-heading text-xl font-bold text-card-foreground mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="font-sans text-muted-foreground leading-relaxed line-clamp-3">
          {excerpt}
        </p>
      </CardContent>
    </Card>
  );
}
