import { useEffect, useRef, useState } from 'react';
import profileImage from '@assets/profile_1759315925367.png';
import { Award, Users, Briefcase, Target } from 'lucide-react';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section id="about" ref={sectionRef} className="py-16 sm:py-20 md:py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
          <div className={`md:col-span-2 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="relative group">
              {/* Decorative ring */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
              <img
                src={profileImage}
                alt="Elroy Vaz - Career Catalyst and HR Strategist"
                className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                data-testid="img-profile"
              />
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-xl animate-float">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-xl animate-float" style={{ animationDelay: '0.5s' }}>
                <Target className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </div>
          
          <div className={`md:col-span-3 space-y-6 ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div>
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                <span className="text-sm font-semibold text-primary">About Elroy</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-2">
                Meet Elroy Vaz
              </h2>
              <p className="font-heading text-xl sm:text-2xl gradient-text">
                Your Career Catalyst and HR Strategist
              </p>
            </div>
            
            <div className="space-y-4 font-sans text-base sm:text-lg text-foreground leading-relaxed">
              <p className="pl-4 border-l-4 border-primary">
                Elroy is a versatile expert with a passion for unlocking potential in both
                people and organizations. For individuals, he helps you{' '}
                <span className="font-semibold text-primary">reignite your passion</span>,
                ditch the confusion, and discover a roadmap tailored to YOUR unique interests,
                abilities, and values. Whether you're a student navigating future choices, a
                professional seeking alignment, or a graduate launching your career, Elroy
                provides clarity and confidence every step of the way.
              </p>
              
              <p className="pl-4 border-l-4 border-secondary">
                For SMEs, Elroy transforms HR from a burden into a{' '}
                <span className="font-semibold text-secondary">
                  business-boosting machine
                </span>
                . His expertise spans headhunting mission-critical talent, building performance
                management systems, designing impactful learning and development programs, and
                ensuring compliance with strategic HR operations. From onboarding to exit
                strategies, he creates HR frameworks that drive accountability and results.
              </p>
              
              <p className="pl-4 border-l-4 border-accent/60">
                What sets Elroy apart is his deep understanding of individual career drivers,
                which makes him uniquely effective at building high-performance teams for
                businesses. By connecting the dots between personal fulfillment and
                organizational success, he delivers solutions that truly{' '}
                <span className="font-semibold text-primary">catalyze careers</span> and{' '}
                <span className="font-semibold text-secondary">empower businesses</span>.
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="bg-gradient-to-br from-primary/10 to-transparent rounded-xl p-4 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="font-heading font-bold text-2xl text-primary">500+</span>
                </div>
                <p className="text-sm text-muted-foreground">Individuals Guided</p>
              </div>
              <div className="bg-gradient-to-br from-secondary/10 to-transparent rounded-xl p-4 border border-secondary/20">
                <div className="flex items-center gap-3 mb-2">
                  <Briefcase className="w-5 h-5 text-secondary" />
                  <span className="font-heading font-bold text-2xl text-secondary">50+</span>
                </div>
                <p className="text-sm text-muted-foreground">Businesses Transformed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
