import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

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
    <Card className="h-full hover-elevate transition-all duration-300">
      <CardContent className="p-8">
        <div className="flex gap-1 mb-4">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-accent text-accent" />
          ))}
        </div>
        <p className="font-sans text-foreground leading-relaxed mb-6 italic">
          "{content}"
        </p>
        <div>
          <p className="font-heading font-bold text-card-foreground">{name}</p>
          <p className="font-sans text-sm text-muted-foreground">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
}
