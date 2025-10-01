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
    <Card className="group h-full overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-500 card-hover-lift bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6 sm:p-8 flex flex-col items-start h-full relative">
        {/* Decorative gradient background on hover */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          variant === 'individual'
            ? 'bg-gradient-to-br from-primary/5 to-transparent'
            : 'bg-gradient-to-br from-secondary/5 to-transparent'
        }`}></div>
        
        <div className="relative z-10 w-full">
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
              variant === 'individual'
                ? 'bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/30'
                : 'bg-gradient-to-br from-secondary to-secondary/80 shadow-lg shadow-secondary/30'
            }`}
          >
            <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          
          <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>

          {/* Decorative line that appears on hover */}
          <div className={`h-1 w-0 group-hover:w-16 transition-all duration-500 mt-4 rounded-full ${
            variant === 'individual' ? 'bg-primary' : 'bg-secondary'
          }`}></div>
        </div>
      </CardContent>
    </Card>
  );
}
