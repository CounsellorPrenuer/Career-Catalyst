import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price?: string;
  description: string;
  features: string[];
  buttonText: string;
  onButtonClick: () => void;
  highlighted?: boolean;
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  onButtonClick,
  highlighted = false,
}: PricingCardProps) {
  return (
    <Card
      className={`group h-full transition-all duration-500 card-hover-lift relative overflow-hidden bg-white/80 backdrop-blur-sm ${
        highlighted ? 'border-2 border-primary shadow-xl shadow-primary/20' : 'border border-border'
      }`}
    >
      {highlighted && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-br from-accent to-accent/80 text-white px-4 py-1 text-xs font-bold rounded-bl-lg flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            POPULAR
          </div>
        </div>
      )}

      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        highlighted 
          ? 'bg-gradient-to-br from-primary/5 to-transparent' 
          : 'bg-gradient-to-br from-secondary/5 to-transparent'
      }`}></div>

      <CardHeader className="p-6 sm:p-8 pb-4 relative z-10">
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        {price && (
          <div className="mb-4">
            <span className="font-heading text-4xl sm:text-5xl font-bold gradient-text">
              {price}
            </span>
          </div>
        )}
        <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">{description}</p>
      </CardHeader>
      
      <CardContent className="p-6 sm:p-8 pt-4 relative z-10">
        <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 group/item">
              <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 transition-all duration-300 ${
                highlighted 
                  ? 'bg-primary/10 group-hover/item:bg-primary' 
                  : 'bg-secondary/10 group-hover/item:bg-secondary'
              }`}>
                <Check className={`w-3 h-3 transition-colors ${
                  highlighted ? 'text-primary group-hover/item:text-white' : 'text-secondary group-hover/item:text-white'
                }`} />
              </div>
              <span className="font-sans text-sm sm:text-base text-foreground leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button
          onClick={onButtonClick}
          className={`w-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${
            highlighted
              ? 'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white'
              : 'bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary text-white'
          }`}
          size="lg"
          data-testid={`button-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
