import { useEffect, useRef, useState } from 'react';
import { Check, X, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

declare global {
  interface Window {
    Razorpay: any;
  }
}

type Category = '8-9 STUDENTS' | '10-12 STUDENTS' | 'COLLEGE GRADUATES' | 'WORKING PROFESSIONALS';

interface Feature {
  text: string;
  included: boolean;
}

interface Package {
  planName: string;
  price: string;
  features: Feature[];
  isPremium?: boolean;
}

const pricingData: Record<Category, { standard: Package; premium: Package }> = {
  '8-9 STUDENTS': {
    standard: {
      planName: 'Discover',
      price: '₹5,500',
      features: [
        { text: 'Psychometric assessment to measure your interests', included: true },
        { text: "1 career counselling session with Mentoria's expert career coaches", included: true },
        { text: 'Lifetime access to Knowledge Gateway', included: true },
        { text: 'Invites to live webinars by industry experts', included: true },
        { text: 'Customized reports after each session with education pathways', included: false },
        { text: 'Guidance on studying abroad', included: false },
        { text: 'CV building during internship/graduation', included: false },
      ],
    },
    premium: {
      planName: 'Discover plus+',
      price: '₹15,000',
      isPremium: true,
      features: [
        { text: 'Psychometric assessments to measure your interests, personality and abilities', included: true },
        { text: "8 career counselling sessions (1 every year) with Mentoria's expert career coaches until graduation", included: true },
        { text: 'Lifetime access to Knowledge Gateway', included: true },
        { text: 'Invites to live webinars by industry experts', included: true },
        { text: 'Customized reports after each session with education pathways', included: true },
        { text: 'Guidance on studying abroad', included: true },
        { text: 'CV building during internship/graduation', included: true },
      ],
    },
  },
  '10-12 STUDENTS': {
    standard: {
      planName: 'Achieve Online',
      price: '₹5,999',
      features: [
        { text: 'Psychometric assessment to measure your interests, personality and abilities', included: true },
        { text: '1 career counselling session', included: true },
        { text: 'Lifetime access to Knowledge Gateway', included: true },
        { text: 'Pre-recorded webinars by industry experts', included: true },
        { text: 'Customized reports after each session with education pathways', included: false },
        { text: 'Guidance on studying abroad', included: false },
        { text: 'CV reviews during internship/graduation', included: false },
      ],
    },
    premium: {
      planName: 'Achieve Plus+',
      price: '₹10,599',
      isPremium: true,
      features: [
        { text: 'Psychometric assessment to measure your interests, personality and abilities', included: true },
        { text: '4 career counselling sessions', included: true },
        { text: 'Lifetime access to Knowledge Gateway', included: true },
        { text: 'Attend live webinars by industry experts', included: true },
        { text: 'Customized reports after each session with education pathways', included: true },
        { text: 'Guidance on studying abroad', included: true },
        { text: 'CV reviews during internship/graduation', included: true },
      ],
    },
  },
  'COLLEGE GRADUATES': {
    standard: {
      planName: 'Ascend Online',
      price: '₹6,499',
      features: [
        { text: 'Psychometric assessment to measure your interests, personality and abilities', included: true },
        { text: '1 career counselling session', included: true },
        { text: 'Lifetime access to Knowledge Gateway', included: true },
        { text: 'Pre-recorded webinars by industry experts', included: true },
        { text: 'Customized reports after each session with information on certificate/online courses', included: false },
        { text: 'Guidance on studying abroad', included: false },
        { text: 'CV reviews for job application', included: false },
      ],
    },
    premium: {
      planName: 'Ascend Plus+',
      price: '₹10,599',
      isPremium: true,
      features: [
        { text: 'Psychometric assessment to measure your interests, personality and abilities', included: true },
        { text: '3 career counselling sessions', included: true },
        { text: 'Lifetime access to Knowledge Gateway', included: true },
        { text: 'Attend live webinars by industry experts', included: true },
        { text: 'Customized reports after each session with information on certificate/online courses', included: true },
        { text: 'Guidance on studying abroad', included: true },
        { text: 'CV reviews for job application', included: true },
      ],
    },
  },
  'WORKING PROFESSIONALS': {
    standard: {
      planName: 'Ascend Online',
      price: '₹6,499',
      features: [
        { text: 'Psychometric assessment to measure your interests, personality and abilities', included: true },
        { text: '1 career counselling session', included: true },
        { text: 'Lifetime access to Knowledge Gateway', included: true },
        { text: 'Pre-recorded webinars by industry experts', included: true },
        { text: 'Customized reports after each session with information on certificate/online courses', included: false },
        { text: 'Guidance on studying abroad', included: false },
        { text: 'CV reviews for job application', included: false },
      ],
    },
    premium: {
      planName: 'Ascend Plus+',
      price: '₹10,599',
      isPremium: true,
      features: [
        { text: 'Psychometric assessment to measure your interests, personality and abilities', included: true },
        { text: '2 career counselling sessions', included: true },
        { text: 'Lifetime access to Knowledge Gateway', included: true },
        { text: 'Attend live webinars by industry experts', included: true },
        { text: 'Customized reports after each session with information on certificate/online courses', included: true },
        { text: 'Guidance on studying abroad', included: true },
        { text: 'CV reviews for job application', included: true },
      ],
    },
  },
};

export default function PricingSection() {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('8-9 STUDENTS');
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const handlePurchase = async (planName: string, price: string) => {
    const numericPrice = parseInt(price.replace(/[₹,]/g, ''));
    
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    
    if (!razorpayKey) {
      toast({
        title: 'Configuration Error',
        description: 'Payment gateway is not configured. Please contact support.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const paymentResponse = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planName,
          category: activeCategory,
          amount: numericPrice,
          status: 'initiated'
        }),
      });

      const { payment } = await paymentResponse.json();
    
      const options = {
        key: razorpayKey,
        amount: numericPrice * 100,
        currency: 'INR',
        name: 'Career Catalyst',
        description: planName,
        handler: async function (response: any) {
          await fetch(`/api/payments/${payment.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              status: 'completed',
              name: response.name || '',
              email: response.email || '',
              phone: response.contact || ''
            }),
          });

          toast({
            title: 'Payment Successful!',
            description: `Thank you for purchasing ${planName}. We'll contact you shortly at elroyv@gmail.com.`,
          });
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#2D9D8E',
        },
        modal: {
          ondismiss: async function() {
            await fetch(`/api/payments/${payment.id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ status: 'cancelled' }),
            });
          }
        }
      };

      if (typeof window !== 'undefined' && window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          const rzp = new window.Razorpay(options);
          rzp.open();
        };
        script.onerror = () => {
          toast({
            title: 'Payment Gateway Error',
            description: 'Failed to load payment gateway. Please check your connection and try again.',
            variant: 'destructive',
          });
        };
        document.body.appendChild(script);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to initiate payment. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const categories: Category[] = ['8-9 STUDENTS', '10-12 STUDENTS', 'COLLEGE GRADUATES', 'WORKING PROFESSIONALS'];
  const currentPackages = pricingData[activeCategory];

  return (
    <section id="pricing" ref={sectionRef} className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-muted/20 via-background to-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-12 sm:mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary">Pricing Plans</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
            Choose Your Path
          </h2>
          <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your category and find the perfect package for your career journey
          </p>
        </div>

        {/* Category Tabs */}
        <div className={`mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'} stagger-1`}>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 sm:px-6 py-3 rounded-xl font-sans font-semibold text-sm sm:text-base transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/30 scale-105'
                    : 'bg-white/80 backdrop-blur-sm text-foreground hover-elevate border border-border/50'
                }`}
                data-testid={`tab-${category.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className={`grid sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto ${isVisible ? 'animate-fade-in-up' : 'opacity-0'} stagger-2`}>
          {/* Standard Package */}
          <Card className="h-full transition-all duration-500 card-hover-lift bg-white/80 backdrop-blur-sm border border-border/50">
            <CardHeader className="p-6 sm:p-8 pb-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-card-foreground">
                  {currentPackages.standard.planName}
                </h3>
                <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded-full">
                  STANDARD
                </span>
              </div>
              <div className="mb-4">
                <span className="font-heading text-4xl sm:text-5xl font-bold gradient-text">
                  {currentPackages.standard.price}
                </span>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 sm:p-8 pt-4">
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {currentPackages.standard.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                      feature.included ? 'bg-primary/10' : 'bg-muted'
                    }`}>
                      {feature.included ? (
                        <Check className="w-3 h-3 text-primary" />
                      ) : (
                        <X className="w-3 h-3 text-muted-foreground" />
                      )}
                    </div>
                    <span className={`font-sans text-sm sm:text-base leading-relaxed ${
                      feature.included ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Button
                onClick={() => handlePurchase(currentPackages.standard.planName, currentPackages.standard.price)}
                className="w-full bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                size="lg"
                data-testid={`button-buy-${currentPackages.standard.planName.toLowerCase().replace(/\s+/g, '-')}`}
              >
                BUY NOW
              </Button>
            </CardContent>
          </Card>

          {/* Premium Package */}
          <Card className="h-full transition-all duration-500 card-hover-lift bg-white/80 backdrop-blur-sm border-2 border-primary shadow-xl shadow-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0">
              <div className="bg-gradient-to-br from-accent to-accent/80 text-white px-4 py-1 text-xs font-bold rounded-bl-lg flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                POPULAR
              </div>
            </div>

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-transparent"></div>

            <CardHeader className="p-6 sm:p-8 pb-4 relative z-10">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-card-foreground">
                  {currentPackages.premium.planName}
                </h3>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                  PREMIUM
                </span>
              </div>
              <div className="mb-4">
                <span className="font-heading text-4xl sm:text-5xl font-bold gradient-text">
                  {currentPackages.premium.price}
                </span>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 sm:p-8 pt-4 relative z-10">
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {currentPackages.premium.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 group/item">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 transition-all duration-300 ${
                      feature.included ? 'bg-primary/10 group-hover/item:bg-primary' : 'bg-muted'
                    }`}>
                      {feature.included ? (
                        <Check className="w-3 h-3 text-primary group-hover/item:text-white transition-colors" />
                      ) : (
                        <X className="w-3 h-3 text-muted-foreground" />
                      )}
                    </div>
                    <span className={`font-sans text-sm sm:text-base leading-relaxed ${
                      feature.included ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Button
                onClick={() => handlePurchase(currentPackages.premium.planName, currentPackages.premium.price)}
                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                size="lg"
                data-testid={`button-buy-${currentPackages.premium.planName.toLowerCase().replace(/\s+/g, '-')}`}
              >
                BUY NOW
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
