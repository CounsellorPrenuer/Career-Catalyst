import TestimonialCard from '../TestimonialCard';

export default function TestimonialCardExample() {
  return (
    <div className="p-8 grid md:grid-cols-2 gap-8 max-w-4xl">
      <TestimonialCard
        name="Sarah Johnson"
        role="Marketing Professional"
        content="Elroy helped me find clarity when I was completely lost in my career. His guidance was transformational!"
        rating={5}
      />
      <TestimonialCard
        name="Ahmed Al-Rashid"
        role="CEO, TechStart Solutions"
        content="The HR systems Elroy implemented completely transformed our hiring process. Highly recommend!"
        rating={5}
      />
    </div>
  );
}
