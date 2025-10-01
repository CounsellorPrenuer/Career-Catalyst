# Career Catalyst - Comprehensive Design Guidelines

## Design Philosophy & Inspiration
The website design draws inspiration from leadcrestconsulting.com's polished UI/UX, adapted for Elroy Vaz's dual-audience brand. The aesthetic must be professional, calming, and highly credible, balancing sophistication with approachability.

## Color Palette
**Primary Base:** Soft slate blue (#607D8B) - conveys trust, professionalism, and calm
**Accent Color:** Muted teal (#4DB6AC) for CTAs, highlights, and interactive elements
**Secondary Accent:** Warm sand (#F4A460) for subtle warmth and variety
**Background:** Off-white (#F5F5F5) for a serene, clean backdrop
**Text:** Dark charcoal (#2C3E50) for primary text, with lighter grays for secondary content

## Typography System
**Headings:** Lato (Google Fonts) - clean, professional, highly readable
- H1: 3.5rem (56px) / Bold / Tight leading
- H2: 2.5rem (40px) / Bold / Section headings
- H3: 1.875rem (30px) / SemiBold / Card titles

**Body Text:** Open Sans (Google Fonts) - excellent readability
- Body: 1.125rem (18px) / Regular / 1.75 line-height
- Small: 1rem (16px) / Regular / Supporting text

## Layout & Spacing System
**Container Max-Width:** 1280px (max-w-7xl)
**Section Padding:** py-20 (desktop) / py-12 (mobile)
**Card Spacing:** gap-8 (desktop) / gap-6 (mobile)
**Consistent vertical rhythm:** Use multiples of 4 (Tailwind units: 4, 8, 12, 16, 20, 24)

## UI Components & Visual Treatment

### Glassmorphism Effects
Apply to navbar and premium cards:
- Semi-transparent backgrounds: bg-white/80
- Backdrop blur: backdrop-blur-lg
- Soft borders: border border-white/20
- Subtle shadows: shadow-xl with colored tints

### Interactive Elements
**Buttons:**
- Primary CTA: Solid muted teal background with white text, rounded-lg, px-8 py-4
- Secondary CTA: Outlined with teal border, hover fills with teal
- Hover states: Scale slightly (scale-105), smooth transitions (duration-300)

**Cards:**
- Service cards: White background with soft shadows, hover lifts with increased shadow
- Rounded corners: rounded-2xl for modern feel
- Padding: p-8 (desktop) / p-6 (mobile)

### Animations
**On-Scroll Effects:**
- Fade-in for section entries
- Slide-up for cards (stagger by 100ms each)
- Smooth ease-out timing functions

**Hover Effects:**
- Buttons: Scale + color intensity
- Cards: Lift (translateY) + shadow enhancement
- Links: Underline slide-in animation

## Page Structure & Sections

### Navbar
- Sticky with blur effect, becomes opaque on scroll
- Logo (left): "Career Catalyst" text-based logo with "By Elroy Vaz" tagline
- Navigation links: About, For Individuals, For Businesses, Blog, Contact
- CTA button (right): "Book a Strategy Call" - prominent teal button

### Hero Section
**Layout:** Full-screen (min-h-screen), centered content with gradient overlay
**Background:** Abstract professional imagery or soft gradient (slate blue to teal)
**Content Hierarchy:**
1. Main Headline: "Catalyzing Careers. Empowering Businesses." - Large, bold, center-aligned
2. Sub-headline: Two-line description addressing both audiences
3. Dual CTAs (side-by-side): "Advance My Career" and "Grow My Business" - equal prominence

### Dual Services Sections

**For Individuals Section:**
- Headline: "Unlock Your Dream Career: Where Passion Meets Purpose!"
- 2x2 grid of service cards (4 total)
- Each card: Icon at top, title, description, subtle hover lift
- Cards: Career Roadmapping, Interest Audits, Values Alignment, Profile Building

**For Businesses Section:**
- Headline: "SME HR Revolution: Turn HR Chaos into a Competitive Edge"
- Same grid layout as individuals, but with corporate color treatment (slightly darker slate tones)
- Cards: Talent Acquisition, Performance Management, L&D, Strategic HR Operations

### About Me Section
**Layout:** Two-column (desktop) - Profile image left (40%), bio right (60%)
**Profile Image:** Elroy's photo from Google Drive - rounded-2xl with soft shadow
**Bio Structure:**
1. Headline: "Meet Elroy Vaz"
2. Sub-headline: "Your Career Catalyst and HR Strategist"
3. Three paragraphs: Individual expertise, Business expertise, Synthesis of both
4. Social proof elements (if available): Years of experience, certifications

### Packages & Payments Section

**For Individuals:**
- Two pricing cards side-by-side
- Card 1: "Career Clarity Call" - ₹4,999, single session details
- Card 2: "Student Success Package" - ₹14,999, multi-session details
- Payment buttons: Razorpay integration with teal CTA buttons

**For Businesses:**
- Two solution cards with "Request a Quote" buttons
- Card 1: HR Strategy Audit
- Card 2: Recruitment Retainer
- Emphasize custom solutions with softer, consultative tone

### Contact Section
**Layout:** Two-column - Contact form (left), Contact details + map/visual (right)
**Form Fields:** Name, Email, Phone, Service Interest (dropdown), Message
**Contact Details:** Email, phone, social media icons (LinkedIn, Instagram)
**Validation:** Real-time with subtle error states, success message on submit

### Footer
- Three-column layout: About, Quick Links, Social Media
- Background: Darker slate blue (#4A5F6B)
- Text: Light gray for readability
- Social icons: Prominent, teal on hover
- Copyright and brand tagline at bottom

## Images & Visual Assets

**Hero Section:** Use a sophisticated stock image showing professional consultation or career growth metaphor. Apply a gradient overlay (slate blue to transparent) for text readability.

**About Section:** Elroy's profile photo (from Google Drive link) - professional headshot, well-lit, approachable expression.

**Service Card Icons:** Use Heroicons (via CDN) for consistency - select icons that represent each service metaphorically (compass for roadmapping, target for alignment, chart for performance, etc.).

## Responsive Breakpoints
- Mobile: < 768px - Single column layouts, stacked CTAs
- Tablet: 768px - 1024px - Two-column grids, adjusted spacing
- Desktop: > 1024px - Full multi-column layouts, optimal spacing

## Accessibility & Dark Mode
- All text meets WCAG AA contrast ratios
- Focus states: Visible teal outline for keyboard navigation
- Alt text for all images
- Semantic HTML structure
- No dark mode variant (keep light theme for professional, calming aesthetic)

## SEO & Metadata
**Title:** Career Catalyst - Career Guidance & SME HR Solutions by Elroy Vaz
**Meta Description:** Expert career coaching for students and professionals, and strategic HR consulting for SMEs. Unlock potential with Elroy Vaz, your Career Catalyst.
**Keywords:** career guidance, SME HR consulting, Elroy Vaz, Career Catalyst, headhunting, performance management, career coach, Dubai, UAE