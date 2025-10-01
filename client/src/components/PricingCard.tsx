import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

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
      className={`hover-elevate transition-all duration-300 hover:shadow-xl h-full ${
        highlighted ? 'border-primary border-2' : ''
      }`}
    >
      <CardHeader className="p-8 pb-4">
        <h3 className="font-heading text-2xl font-bold text-card-foreground mb-2">
          {title}
        </h3>
        {price && (
          <div className="mb-4">
            <span className="font-heading text-4xl font-bold text-primary">
              {price}
            </span>
          </div>
        )}
        <p className="font-sans text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="p-8 pt-4">
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="font-sans text-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          onClick={onButtonClick}
          className={`w-full ${
            highlighted
              ? 'bg-primary hover:bg-primary/90'
              : 'bg-secondary hover:bg-secondary/90'
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
