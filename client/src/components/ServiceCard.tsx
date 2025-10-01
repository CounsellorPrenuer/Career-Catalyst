import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: 'individual' | 'business';
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  variant = 'individual',
}: ServiceCardProps) {
  return (
    <Card className="hover-elevate transition-all duration-300 hover:shadow-xl h-full">
      <CardContent className="p-8 flex flex-col items-start h-full">
        <div
          className={`w-14 h-14 rounded-lg flex items-center justify-center mb-6 ${
            variant === 'individual'
              ? 'bg-primary/10 text-primary'
              : 'bg-secondary/10 text-secondary'
          }`}
        >
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="font-heading text-xl font-bold text-card-foreground mb-3">
          {title}
        </h3>
        <p className="font-sans text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
