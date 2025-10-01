import PricingCard from '../PricingCard';

export default function PricingCardExample() {
  return (
    <div className="p-8 grid md:grid-cols-2 gap-8 max-w-4xl">
      <PricingCard
        title="Career Clarity Call"
        price="₹4,999"
        description="Single deep-dive session to unlock your career potential"
        features={[
          'One-on-one consultation session',
          'Personalized career assessment',
          'Actionable roadmap',
          'Follow-up email summary',
        ]}
        buttonText="Book Now"
        onButtonClick={() => console.log('Career Clarity Call clicked')}
        highlighted={true}
      />
      <PricingCard
        title="HR Strategy Audit"
        description="Comprehensive review of your current HR operations"
        features={[
          'Complete HR systems analysis',
          'Gap identification',
          'Detailed recommendations',
          'Implementation roadmap',
        ]}
        buttonText="Request a Quote"
        onButtonClick={() => console.log('HR Strategy Audit clicked')}
      />
    </div>
  );
}
