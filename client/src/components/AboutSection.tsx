import profileImage from '@assets/profile_1759315925367.png';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2">
            <img
              src={profileImage}
              alt="Elroy Vaz - Career Catalyst and HR Strategist"
              className="w-full max-w-md mx-auto rounded-2xl shadow-xl"
              data-testid="img-profile"
            />
          </div>
          
          <div className="md:col-span-3 space-y-6">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-2">
                Meet Elroy Vaz
              </h2>
              <p className="font-heading text-xl sm:text-2xl text-primary">
                Your Career Catalyst and HR Strategist
              </p>
            </div>
            
            <div className="space-y-4 font-sans text-lg text-foreground leading-relaxed">
              <p>
                Elroy is a versatile expert with a passion for unlocking potential in both
                people and organizations. For individuals, he helps you{' '}
                <span className="font-semibold text-primary">reignite your passion</span>,
                ditch the confusion, and discover a roadmap tailored to YOUR unique interests,
                abilities, and values. Whether you're a student navigating future choices, a
                professional seeking alignment, or a graduate launching your career, Elroy
                provides clarity and confidence every step of the way.
              </p>
              
              <p>
                For SMEs, Elroy transforms HR from a burden into a{' '}
                <span className="font-semibold text-secondary">
                  business-boosting machine
                </span>
                . His expertise spans headhunting mission-critical talent, building performance
                management systems, designing impactful learning and development programs, and
                ensuring compliance with strategic HR operations. From onboarding to exit
                strategies, he creates HR frameworks that drive accountability and results.
              </p>
              
              <p>
                What sets Elroy apart is his deep understanding of individual career drivers,
                which makes him uniquely effective at building high-performance teams for
                businesses. By connecting the dots between personal fulfillment and
                organizational success, he delivers solutions that truly{' '}
                <span className="font-semibold text-primary">catalyze careers</span> and{' '}
                <span className="font-semibold text-secondary">empower businesses</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
