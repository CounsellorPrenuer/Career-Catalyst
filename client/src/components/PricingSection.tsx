import { useEffect, useRef, useState } from 'react';
import { Check, X, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { client } from '../sanity/client';
import { pricingQuery, customPlansQuery } from '../sanity/queries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

// Razorpay Type Definition
declare global {
  interface Window {
    Razorpay: any;
  }
}

type Category =
  | '8-9 Students'
  | '10-12 Students'
  | 'Graduates'
  | 'Working Professionals';

interface Feature {
  text: string;
  included: boolean;
}

interface Package {
  planId: string;
  planName: string;
  price: string;
  features: Feature[];
  category: string;
}

interface CustomPlan {
  planId: string;
  title: string;
  price: string;
  description: string;
  image?: any;
}

interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  isActive: boolean;
}

const WORKER_URL = 'https://mentoria-payments.garyphadale.workers.dev';

export default function PricingSection() {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('8-9 Students');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    planName: string;
    price: string;
    category: string;
    isCustom?: boolean;
    rawPrice: number;
  } | null>(null);

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [finalPrice, setFinalPrice] = useState<number>(0);

  const [isProcessing, setIsProcessing] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [pricingData, setPricingData] = useState<Record<string, Package[]>>({});
  const [customPlans, setCustomPlans] = useState<CustomPlan[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [standard, custom] = await Promise.all([
          client.fetch(pricingQuery),
          client.fetch(customPlansQuery)
        ]);

        const grouped: Record<string, Package[]> = {};
        standard.forEach((pkg: Package) => {
          const cat = pkg.category;
          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push(pkg);
        });

        setPricingData(grouped);
        setCustomPlans(custom);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch pricing for project 'ua6tzmti':", error);
        toast({
          title: "Error",
          description: "Failed to load pricing plans. Please check your Sanity CORS settings.",
          variant: "destructive"
        });
        setLoading(false);
      }
    };
    fetchData();

    // Load Razorpay Script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [toast]);

  // Reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleBuyNowClick = (planName: string, priceStr: string, category: string, isCustom: boolean = false) => {
    const rawPrice = parseInt(priceStr.replace(/[₹,\s]/g, ''), 10) || 0;
    setSelectedPlan({ planName, price: priceStr, category, isCustom, rawPrice });
    setFinalPrice(rawPrice);
    setUserDetails({ name: '', email: '', phone: '' });
    setCouponCode('');
    setAppliedCoupon(null);
    setDialogOpen(true);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setIsProcessing(true);
    try {
      // Verify coupon validation against Sanity directly for now (or via worker if we moved logic there)
      // Since we want "secure", verifying via worker is better but for speed: 
      // fetch query to sanity.
      const query = `*[_type == "coupon" && code == $code && isActive == true][0]`;
      const coupon = await client.fetch(query, { code: couponCode.toUpperCase() });

      if (coupon) {
        setAppliedCoupon(coupon);
        let discounted = selectedPlan?.rawPrice || 0;
        if (coupon.discountType === 'percentage') {
          discounted = discounted - (discounted * (coupon.value / 100));
        } else {
          discounted = discounted - coupon.value;
        }
        setFinalPrice(Math.max(0, discounted));
        toast({ title: "Coupon Applied", description: `Saved with ${coupon.code}` });
      } else {
        setAppliedCoupon(null);
        setFinalPrice(selectedPlan?.rawPrice || 0);
        toast({ title: "Invalid Coupon", description: "Code not found or expired.", variant: "destructive" });
      }

    } catch (e) {
      console.error(e);
      toast({ title: "Error", description: "Failed to apply coupon." });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProceedToPayment = async () => {
    if (!userDetails.name || !userDetails.email || !userDetails.phone) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all your details to proceed.',
        variant: 'destructive',
      });
      return;
    }
    if (!selectedPlan) return;

    setIsProcessing(true);

    try {
      // 1. Create Order via Worker
      const orderRes = await fetch(`${WORKER_URL}/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalPrice,
          currency: "INR",
          receipt: `rcpt_${Date.now()}`,
          notes: {
            plan: selectedPlan.planName,
            coupon: appliedCoupon?.code || '',
            customerName: userDetails.name,
            customerEmail: userDetails.email,
            customerPhone: userDetails.phone,
            category: selectedPlan.isCustom ? 'Custom Plan' : selectedPlan.category,
          }
        })
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.error || 'Order creation failed');
      }

      // 2. Open Razorpay Full-Page Checkout (redirect mode)
      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Mentoria",
        description: `Payment for ${selectedPlan.planName}`,
        order_id: orderData.id,
        callback_url: `${WORKER_URL}/payment-callback`,
        redirect: true,
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone
        },
        theme: {
          color: "#7E22CE"
        },
        notes: {
          plan: selectedPlan.planName,
          customerName: userDetails.name,
          customerEmail: userDetails.email,
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (e: any) {
      console.error("Payment Error:", e);
      toast({ title: "Error", description: e.message || "Something went wrong", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  const triggerMailto = (paymentId: string) => {
    const subject = encodeURIComponent(`Payment Successful: ${selectedPlan?.planName}`);
    const body = encodeURIComponent(
      `Name: ${userDetails.name}
Email: ${userDetails.email}
Phone: ${userDetails.phone}
Plan: ${selectedPlan?.planName}
Amount Paid: ₹${finalPrice}
Payment ID: ${paymentId}
Coupon Used: ${appliedCoupon?.code || 'None'}

Please verify my payment and start the service.
`);

    // Direct href assignment
    window.location.href = `mailto:royjohnson@careerplans.pro?subject=${subject}&body=${body}`;

    setDialogOpen(false);
    toast({
      title: 'Payment Successful!',
      description: `Redirecting to email client...`,
      duration: 5000
    });
  };

  const categories: Category[] = [
    '8-9 Students',
    '10-12 Students',
    'Graduates',
    'Working Professionals',
  ];

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-muted/20 via-background to-muted/30 relative overflow-hidden"
    >
      <div className="absolute top-20 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main Header */}
        <div className={`text-center mb-12 sm:mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary">Invest In Your Future</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
            Choose Your Path
          </h2>
          <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive career mentorship packages designed for every stage of your journey.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-20">
            {/* SECTION 1: Standard Packages */}
            <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <Tabs defaultValue={categories[0]} className="w-full" onValueChange={(val) => setActiveCategory(val)}>
                <div className="flex justify-center mb-8">
                  <TabsList className="bg-white/50 backdrop-blur border h-auto p-1 flex-wrap justify-center">
                    {categories.map(cat => (
                      <TabsTrigger
                        key={cat}
                        value={cat}
                        className="px-4 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-white font-semibold transition-all"
                      >
                        {cat}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {categories.map(cat => (
                  <TabsContent key={cat} value={cat} className="animate-fade-in">
                    <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                      {pricingData[cat]?.map((plan, idx) => (
                        <Card key={plan.planId} className={`h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${idx === 1 ? 'border-primary border-2 relative' : ''}`}>
                          {idx === 1 && (
                            <div className="absolute top-0 right-0">
                              <div className="bg-primary text-white px-3 py-1 text-xs font-bold rounded-bl-lg flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                RECOMMENDED
                              </div>
                            </div>
                          )}
                          <CardHeader className="pb-4">
                            <CardTitle className="text-xl sm:text-2xl font-bold font-heading">{plan.planName}</CardTitle>
                            <CardDescription className="text-lg font-semibold text-primary">{plan.price}</CardDescription>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <ul className="space-y-3">
                              {plan.features.map((feature, fIdx) => (
                                <li key={fIdx} className="flex items-start gap-2 text-sm text-foreground/80">
                                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                  <span>{feature.text}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                          <CardFooter>
                            <Button
                              className={`w-full ${idx === 1 ? 'bg-primary text-white hover:bg-primary/90' : 'bg-secondary text-white hover:bg-secondary/90'}`}
                              onClick={() => handleBuyNowClick(plan.planName, plan.price, plan.category)}
                            >
                              Select Plan
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                      {(!pricingData[cat] || pricingData[cat].length === 0) && (
                        <div className="col-span-2 text-center text-muted-foreground py-10">No plans found for this category.</div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* SECTION 2: Custom Plans */}
            <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'} stagger-1`}>
              <div className="text-center mb-10">
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-secondary mb-3">
                  Want To Customise Your Mentorship Plan?
                </h3>
                <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
                  If you want to subscribe to specific services from Mentoria that resolve your career challenges, you can choose one or more of the following:
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {customPlans.map((plan) => (
                  <Card key={plan.planId} className="h-full flex flex-col hover:shadow-lg transition-shadow bg-white/60 overflow-hidden">
                    {plan.image && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={urlFor(plan.image).url()}
                          alt={plan.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex justify-between items-start gap-2">
                        <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent font-bold text-lg">
                          {plan.title}
                        </CardTitle>
                        <div className="shrink-0 bg-secondary/10 text-secondary px-2 py-1 rounded text-sm font-bold">
                          {plan.price}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {plan.description}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full hover:bg-secondary hover:text-white group border-secondary/20"
                        onClick={() => handleBuyNowClick(plan.title, plan.price, 'Custom Plans', true)}
                      >
                        Choose Custom Plan
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Details & Payment Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading font-bold gradient-text">
              Complete Your Request
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Please provide your contact details to proceed with: <br />
              <span className="font-semibold text-foreground text-lg">
                {selectedPlan?.planName}
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={userDetails.name}
                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={userDetails.email}
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold">
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 99999 99999"
                value={userDetails.phone}
                onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                className="w-full"
              />
            </div>

            {/* Coupon Section */}
            <div className="space-y-2">
              <Label htmlFor="coupon" className="text-sm font-semibold">
                Coupon Code
              </Label>
              <div className="flex gap-2">
                <Input
                  id="coupon"
                  placeholder="Enter code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full"
                />
                <Button variant="outline" onClick={handleApplyCoupon} disabled={isProcessing || !couponCode}>
                  Apply
                </Button>
              </div>
              {appliedCoupon && (
                <p className="text-xs text-green-600 font-semibold">
                  Coupon Applied: {appliedCoupon.discountType === 'percentage' ? `${appliedCoupon.value}% OFF` : `₹${appliedCoupon.value} OFF`}
                </p>
              )}
            </div>

            <div className="bg-muted/50 rounded-lg p-3 flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Total Price:</span>
              <div className="text-right">
                {appliedCoupon && (
                  <span className="block text-xs text-muted-foreground line-through">₹{selectedPlan?.rawPrice}</span>
                )}
                <span className="font-bold text-base text-secondary">₹{finalPrice}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="flex-1"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleProceedToPayment}
              className="flex-1 bg-gradient-to-r from-primary to-primary/90"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Processing</>
              ) : 'Pay Now'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}