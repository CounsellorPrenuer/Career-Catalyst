import PricingCard from './PricingCard';
import { useToast } from '@/hooks/use-toast';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PricingSection() {
  const { toast } = useToast();

  const handleRazorpayPayment = (amount: number, packageName: string) => {
    //todo: remove mock functionality
    console.log('Razorpay payment initiated for:', packageName, 'Amount:', amount);
    
    const options = {
      key: 'rzp_test_placeholder',
      amount: amount * 100,
      currency: 'INR',
      name: 'Career Catalyst',
      description: packageName,
      handler: function (response: any) {
        toast({
          title: 'Payment Successful!',
          description: `Thank you for booking ${packageName}. We'll contact you shortly.`,
        });
        console.log('Payment successful:', response);
      },
      prefill: {
        name: '',
        email: '',
        contact: '',
      },
      theme: {
        color: '#4DB6AC',
      },
    };

    if (typeof window !== 'undefined' && window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      toast({
        title: 'Payment Gateway Loading',
        description: 'Please wait while we initialize the payment gateway...',
        variant: 'destructive',
      });
    }
  };

  const handleQuoteRequest = (serviceName: string) => {
    //todo: remove mock functionality
    console.log('Quote requested for:', serviceName);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      toast({
        title: 'Let\'s Connect!',
        description: 'Please fill out the contact form below to request a quote.',
      });
    }
  };

  const individualPackages = [
    {
      title: 'Career Clarity Call',
      price: '₹4,999',
      description: 'Single deep-dive session to unlock your career potential',
      features: [
        'One-on-one 60-minute consultation',
        'Comprehensive career assessment',
        'Personalized action plan',
        'Follow-up email with key insights',
      ],
      buttonText: 'Book Now',
      onButtonClick: () => handleRazorpayPayment(4999, 'Career Clarity Call'),
      highlighted: true,
    },
    {
      title: 'Student Success Package',
      price: '₹14,999',
      description: 'Multi-session guidance designed for students',
      features: [
        'Three one-on-one sessions',
        'Interest and ability assessments',
        'College and career profile building',
        'Ongoing email support for 3 months',
      ],
      buttonText: 'Book Now',
      onButtonClick: () => handleRazorpayPayment(14999, 'Student Success Package'),
      highlighted: false,
    },
  ];

  const businessSolutions = [
    {
      title: 'HR Strategy Audit',
      description: 'Comprehensive review of your current HR operations',
      features: [
        'Complete HR systems analysis',
        'Compliance and policy review',
        'Gap identification and prioritization',
        'Detailed recommendations and roadmap',
      ],
      buttonText: 'Request a Quote',
      onButtonClick: () => handleQuoteRequest('HR Strategy Audit'),
    },
    {
      title: 'Recruitment Retainer',
      description: 'Ongoing support for talent acquisition needs',
      features: [
        'Dedicated headhunting services',
        'Customized candidate sourcing',
        'Interview process management',
        'Monthly recruitment reports',
      ],
      buttonText: 'Request a Quote',
      onButtonClick: () => handleQuoteRequest('Recruitment Retainer'),
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-secondary text-center mb-4">
            Packages for Individuals
          </h2>
          <p className="font-sans text-lg text-center text-muted-foreground max-w-2xl mx-auto">
            Invest in your future with our tailored career guidance packages
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {individualPackages.map((pkg, index) => (
            <PricingCard key={index} {...pkg} />
          ))}
        </div>

        <div className="mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-secondary text-center mb-4">
            Solutions for Businesses
          </h2>
          <p className="font-sans text-lg text-center text-muted-foreground max-w-2xl mx-auto">
            Customized HR solutions designed for your SME's unique needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {businessSolutions.map((solution, index) => (
            <PricingCard key={index} {...solution} />
          ))}
        </div>
      </div>
    </section>
  );
}
