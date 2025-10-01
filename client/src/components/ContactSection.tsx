import ContactForm from './ContactForm';
import { Mail, Phone, Linkedin, Instagram } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
            Get In Touch
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to catalyze your career or empower your business? Let's start the conversation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3">
            <ContactForm />
          </div>
          
          <div className="md:col-span-2 space-y-8">
            <div>
              <h3 className="font-heading text-2xl font-bold text-card-foreground mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <a
                  href="mailto:elroyv@gmail.com"
                  className="flex items-center gap-3 text-foreground hover-elevate p-3 rounded-md transition-colors"
                  data-testid="link-email"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-sans text-sm text-muted-foreground">Email</p>
                    <p className="font-sans font-medium">elroyv@gmail.com</p>
                  </div>
                </a>
                
                <a
                  href="tel:+971502404129"
                  className="flex items-center gap-3 text-foreground hover-elevate p-3 rounded-md transition-colors"
                  data-testid="link-phone"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-sans text-sm text-muted-foreground">Phone</p>
                    <p className="font-sans font-medium">+971 50 240 4129</p>
                  </div>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-heading text-xl font-bold text-card-foreground mb-4">
                Connect on Social Media
              </h3>
              
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/elroy-vaz-educator-learninganddevelopmentspecialist/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center hover-elevate transition-all"
                  data-testid="link-linkedin"
                >
                  <Linkedin className="w-6 h-6 text-primary" />
                </a>
                <a
                  href="https://www.instagram.com/ecv167/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center hover-elevate transition-all"
                  data-testid="link-instagram"
                >
                  <Instagram className="w-6 h-6 text-primary" />
                </a>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-6">
              <h4 className="font-heading font-bold text-card-foreground mb-2">
                Office Hours
              </h4>
              <p className="font-sans text-muted-foreground">
                Monday - Friday: 9:00 AM - 6:00 PM (GST)
                <br />
                Saturday: By Appointment
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
