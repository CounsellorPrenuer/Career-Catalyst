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

import { useEffect } from 'react';
import { useLocation } from "wouter";

export default function Home() {
  const [location] = useLocation();

  useEffect(() => {
    // Handle hash links or sub-paths
    if (location !== '/') {
      const sectionId = location.substring(1); // remove leading slash
      const element = document.getElementById(sectionId);
      if (element) {
        // slight delay to ensure DOM is ready
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

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
