import ServiceCard from '../ServiceCard';
import { Compass } from 'lucide-react';

export default function ServiceCardExample() {
  return (
    <div className="p-8 grid gap-4 max-w-md">
      <ServiceCard
        icon={Compass}
        title="Career Roadmapping"
        description="For Professionals, Students (8-12), and Graduates seeking clarity and direction."
        variant="individual"
      />
      <ServiceCard
        icon={Compass}
        title="Talent Acquisition"
        description="Headhunting top-tier talent for mission-critical roles in your organization."
        variant="business"
      />
    </div>
  );
}
