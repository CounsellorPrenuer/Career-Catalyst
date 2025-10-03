import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import IndividualServices from '@/components/IndividualServices';
import BusinessServices from '@/components/BusinessServices';
import AboutSection from '@/components/AboutSection';
import PricingSection from '@/components/PricingSection';
import TestimonialSection from '@/components/TestimonialSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutSection />
      <IndividualServices />
      <BusinessServices />
      <PricingSection />
      <BlogSection />
      <TestimonialSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
