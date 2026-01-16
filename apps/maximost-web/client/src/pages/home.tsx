import React, { useState, useEffect, useRef, useCallback } from "react";
import Particles from "@tsparticles/react";
import type { Engine } from "tsparticles-engine";
import { loadStarsPreset } from "tsparticles-preset-stars";

// Import reusable components
import { CTASection } from "../components/homepage/CTASection";
import { MeetTheCoachesSection } from "../components/homepage/MeetTheCoachesSection";
import { FeatureCard } from "../components/homepage/FeatureCard";
import { TestimonialCard } from "../components/homepage/TestimonialCard";
import { FAQItem } from "../components/homepage/FAQItem";
import { Accordion } from "@/components/ui/accordion";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import GlassPanel from "../components/glass/GlassPanel";

// Import Lucide icons
import {
  Users, Brain, Zap, TrendingUp, FlaskConical, ShieldCheck,
  Dumbbell, Apple as NutritionIcon, Bed, Lightbulb, Landmark,
  Smartphone, Activity, Watch, Bike
} from "lucide-react";

// Helper function to convert hex color to RGB string "r,g,b"
const hexToRgbString = (hex: string): string | null => {
  if (!hex) return null;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
    : null;
};

// Data structures
const keyFeaturesData = [
  { id: "feat-multi-view", icon: <Users size={32} className="text-sky-400" />, title: "Multi-view Tracking", description: "Daily, weekly, and monthly views for both absolute (did/didn't do) and frequency-based (2x, 3x per week) habits." },
  { id: "feat-ai-coach", icon: <Brain size={32} className="text-emerald-400" />, title: "AI Habit Coach", description: "Get personalized guidance and recommendations from your automated AI coach to optimize your habit formation and consistency." },
  { id: "feat-break-bad", icon: <Zap size={32} className="text-amber-400" />, title: "Break Bad Habits & Addictions", description: "Specialized tools to identify, track, and overcome negative patterns, including addiction recovery support." },
  { id: "feat-one-percent", icon: <TrendingUp size={32} className="text-sky-400" />, title: "1% Better Every Day", description: "Make consistent improvements following the \"compound effect\" principle. 1% better each day leads to 37x improvement in a year." },
  { id: "feat-science", icon: <FlaskConical size={32} className="text-emerald-400" />, title: "Scientific Approach", description: "Based on evidence-backed protocols from leading experts like Dr. Peter Attia and Gary Brecka for optimal health outcomes." },
  { id: "feat-resilience", icon: <ShieldCheck size={32} className="text-amber-400" />, title: "Mental Resilience", description: "Build unwavering discipline inspired by methods from David Goggins and Jocko Willink to stay consistent through challenges." },
];
const iconColorCycle = ["text-sky-400", "text-emerald-400", "text-amber-400", "text-rose-400", "text-violet-400", "text-teal-400"];
const performanceAreasData = [
  { id: "area-physical", icon: <Dumbbell size={32} className={iconColorCycle[0]} />, title: "Physical Training", description: "Strength, cardio, mobility, and recovery" },
  { id: "area-nutrition", icon: <NutritionIcon size={32} className={iconColorCycle[1]} />, title: "Nutrition & Fueling", description: "Diet, hydration, and supplements" },
  { id: "area-sleep", icon: <Bed size={32} className={iconColorCycle[2]} />, title: "Sleep & Hygiene", description: "Quality rest and recovery cycles" },
  { id: "area-mental", icon: <Lightbulb size={32} className={iconColorCycle[3]} />, title: "Mental Acuity & Growth", description: "Focus, learning, and mindfulness" },
  { id: "area-relationships", icon: <Users size={32} className={iconColorCycle[4]} />, title: "Relationships", description: "Social connections and communication" },
  { id: "area-financial", icon: <Landmark size={32} className={iconColorCycle[5]} />, title: "Financial Habits", description: "Saving, investing, and wealth building" },
];
const testimonialsData = [
    { id: "t-hormozi", imageSrc: "https://placehold.co/100x100/1E293B/FFFFFF?text=AH", altText: "Alex Hormozi", name: "Alex Hormozi", title: "Founder, Acquisition.com", quote: "MaxiMost perfectly embodies the 'small hinges swing big doors' philosophy. The ability to track consistent 1% improvements across multiple life domains is a game-changer. This is the operating system for high performers." },
    { id: "t-urban", imageSrc: "https://placehold.co/100x100/2A3B4C/FFFFFF?text=MU", altText: "Melissa Urban", name: "Melissa Urban", title: "Co-Founder & CEO, Whole30", quote: "I've tried dozens of habit trackers, but none integrate across all aspects of wellness like MaxiMost. The fitness tracker integration is brilliant—tracking my habits without requiring manual input makes consistency so much easier." },
    { id: "t-huberman", imageSrc: "https://placehold.co/100x100/3B4C5D/FFFFFF?text=ANH", altText: "Andrew Huberman", name: "Andrew Huberman", title: "Neuroscientist & Professor", quote: "The science behind MaxiMost is solid. By focusing on small, consistent behavior changes across multiple domains, they've created a system that works with our brain's neuroplasticity rather than against it. This is how lasting habits are formed." },
    { id: "t-patrick", imageSrc: "https://placehold.co/100x100/4C5D6E/FFFFFF?text=RP", altText: "Rhonda Patrick", name: "Rhonda Patrick", title: "Biochemist & Health Expert", quote: "The holistic approach to health in MaxiMost is what sets it apart. It understands that physical training, nutrition, sleep, mental acuity, social relationships, and finances are all interconnected systems. Finally, a habit tracker that sees the complete picture!" },
];
const faqData = [
    { id: "faq-1", question: "What makes Maximost different from other habit trackers?", answer: "Maximost isn't just a habit tracker—it's an AI-powered life operating system that applies both ancient Stoic wisdom and modern performance science. We integrate with 5 fitness trackers, provide automatic habit completion, offer streak milestones, and focus on the \"maximum bang for your buck\" principle to truly transform your life one habit at a time." },
    { id: "faq-2", question: "How does the fitness tracker integration work?", answer: "Maximost connects seamlessly with Fitbit, Samsung Health, Apple Health, Google Fit, and Garmin. Once connected, relevant activities like steps, workouts, sleep data, and more will automatically mark corresponding habits as complete without manual input, making consistent tracking effortless." },
    { id: "faq-3", question: "What are the six key performance areas?", answer: "Maximost tracks habits across six critical life domains: Physical Training (red), Nutrition & Fueling (orange), Sleep & Hygiene (indigo), Mental Acuity & Growth (yellow), Relationships & Community (blue), and Financial Habits (green). This holistic approach ensures you're developing in all areas that truly matter for a fulfilling life." },
    { id: "faq-4", question: "How does the streak system motivate long-term habit formation?", answer: "Our streak system counts consecutive days of habit completion while providing milestone celebrations (3, 7, 14, 30, 60, 90, 180, 365 days). The system is designed with flexibility—continuing if you complete habits today or yesterday—while also encouraging consistent daily action for maximum habit formation." },
];

const Home: React.FC = () => {
  const [activeGlowColor, setActiveGlowColor] = useState<string | null>(null); // For hero gradient on hover - might be deprecated by particle effect
  const [particleThemeColor, setParticleThemeColor] = useState<string | undefined>(undefined); // For particle theming on click

  const handlePersonaHover = (glowColor: string | undefined) => {
    // This function was for the CSS gradient hero background, which is commented out.
    // setActiveGlowColor(glowColor || null);
  };

  const handlePersonaSelectGlow = (glowColorRgb: string | undefined) => {
    setParticleThemeColor(glowColorRgb);
  };

  const handleWaitlistSubmit = (formData: { email: string; rewardsOptIn: boolean }) => {
    alert(`Thank you, ${formData.email}! You've been added to the waitlist.`);
  };

  const fitnessTrackers = [
    { name: "Fitbit", icon: <Smartphone className="inline-block h-6 w-6 mr-1" />, color: "text-sky-400" },
    { name: "Samsung Health", icon: <Smartphone className="inline-block h-6 w-6 mr-1" />, color: "text-violet-400" },
    { name: "Apple Health", icon: <NutritionIcon className="inline-block h-6 w-6 mr-1" />, color: "text-gray-400" },
    { name: "Google Fit", icon: <Activity className="inline-block h-6 w-6 mr-1" />, color: "text-rose-400" },
    { name: "Garmin", icon: <Watch className="inline-block h-6 w-6 mr-1" />, color: "text-amber-400" },
    { name: "Strava", icon: <Bike className="inline-block h-6 w-6 mr-1" />, color: "text-orange-400" },
  ];

  // Refs for sections to be animated
  const keyFeaturesRef = useRef<HTMLDivElement>(null);
  const performanceAreasRef = useRef<HTMLDivElement>(null);
  const fitnessTrackersRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const finalCtaRef = useRef<HTMLDivElement>(null);
  const coachesRef = useRef<HTMLDivElement>(null);

const SectionDivider = () => (
  <div className="py-6 md:py-8"> {/* Further reduced vertical spacing for SectionDivider */}
    <div className="h-px w-full bg-white/10 shadow-[0_0_15px_0px_rgba(255,255,255,0.2)] transition-all duration-300 ease-out hover:shadow-[0_0_20px_2px_rgba(255,255,255,0.35)] hover:bg-white/20"></div>
  </div>
);

  // Intersection observer hooks
  const isKeyFeaturesVisible = useIntersectionObserver(keyFeaturesRef, { threshold: 0.1, triggerOnce: true });
  const isPerformanceAreasVisible = useIntersectionObserver(performanceAreasRef, { threshold: 0.1, triggerOnce: true });
  const isFitnessTrackersVisible = useIntersectionObserver(fitnessTrackersRef, { threshold: 0.1, triggerOnce: true });
  const isTestimonialsVisible = useIntersectionObserver(testimonialsRef, { threshold: 0.1, triggerOnce: true });
  const isFaqVisible = useIntersectionObserver(faqRef, { threshold: 0.1, triggerOnce: true });
  const isFinalCtaVisible = useIntersectionObserver(finalCtaRef, { threshold: 0.1, triggerOnce: true });
  const isCoachesVisible = useIntersectionObserver(coachesRef, { threshold: 0.1, triggerOnce: true });


  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed inset-0 z-[-1] bg-[#0A192F]" />
      <header className="absolute top-0 left-0 w-full z-50 p-4 md:p-6">
        <div className="container mx-auto flex items-center justify-between">
          <img
            src="/images/Gemini_sq_logo1.png"
            alt="MaxiMost Logo Left"
            className="h-24 w-24 md:h-28 md:w-28"
          />
          <img
            src="/images/Gemini_sq_logo1.png"
            alt="MaxiMost Logo Right"
            className="h-24 w-24 md:h-28 md:w-28"
          />
          {/* Navigation links can be added here later if needed */}
        </div>
      </header>
      <main className="flex-grow">
        {/* Section 1: UVP / Hero Section */}
        <section
          id="uvp"
          className="relative py-16 md:py-20 lg:py-24 text-white overflow-hidden"
        >
          <div className="relative z-10 container mx-auto max-w-4xl text-center">
            <CTASection
              headline="Forge Your Elite Habits. Master Your Mind."
              description="Harness the power of AI to build extraordinary discipline. Our system integrates performance science with flexible coaching philosophies to match your drive."
              buttonText="Get Started Free"
              showEmailInput={false}
              buttonLink="/login"
              className="bg-black/40 backdrop-blur-lg rounded-xl p-8 shadow-2xl border-2 border-white/25 hover:shadow-[0_0_35px_5px_rgba(255,255,255,0.3)] hover:border-white/40 transition-all duration-300 ease-in-out"
            />
          </div>
        </section>

        <div className="py-12 md:py-16">
          <div ref={coachesRef} className={`transition-all duration-1000 ease-out ${isCoachesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <MeetTheCoachesSection
              title="Pick your Coaching style"
              className="py-10 md:py-12"
              onPersonaHover={handlePersonaHover}
              onPersonaSelectGlow={handlePersonaSelectGlow}
              isCoachesVisible={isCoachesVisible}
            />
          </div>
        </div>

        <SectionDivider />

        {/* Section 3: Key Features */}
        <section ref={keyFeaturesRef} id="key-features" className={`py-10 md:py-12 transition-all duration-1000 ease-out ${isKeyFeaturesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <GlassPanel className="container mx-auto px-4 py-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10 md:mb-12 lg:mb-16">Key Features of MaxiMost</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {keyFeaturesData.map((feature, index) => {
                let slideFromDirection: 'left' | 'right' | 'bottom' = 'bottom';
                if (index % 3 === 0) slideFromDirection = 'left';
                if (index % 3 === 2) slideFromDirection = 'right';
                return (
                  <FeatureCard
                    key={feature.id}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    animationDelayIndex={index}
                    isVisible={isKeyFeaturesVisible}
                    slideFromDirection={slideFromDirection}
                  />
                );
              })}
            </div>
          </GlassPanel>
        </section>

        <SectionDivider />

        {/* Section 4: Fitness Tracker Integration */}
        <section ref={fitnessTrackersRef} id="fitness-trackers" className={`py-10 md:py-12 transition-all duration-1000 ease-out ${isFitnessTrackersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <GlassPanel className="container mx-auto px-4 py-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Fitness Tracker Integration
            </h2>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              Connect All Your Health Data
            </p>
            <p className="text-md text-neutral-300 mb-8 max-w-3xl mx-auto">
              Integration with your favorite fitness platforms automatically
              completes your habits based on your activity.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
              {fitnessTrackers.map((tracker) => (
                <div key={tracker.name} className="flex items-center p-3 bg-neutral-800/50 dark:bg-neutral-800/60 rounded-lg shadow-md hover:scale-105 hover:bg-neutral-700/70 transition-all cursor-default">
                  <span className={`${tracker.color} mr-2`}>{tracker.icon}</span>
                  <span className="ml-1 text-sm font-medium text-neutral-100">{tracker.name}</span>
                </div>
              ))}
            </div>
            <div className="max-w-2xl mx-auto text-left space-y-3 text-neutral-200 mb-10 text-lg">
              <p>✓ Auto-complete workout habits when your fitness tracker records activity.</p>
              <p>✓ Sleep habits marked complete when your tracker records sufficient sleep.</p>
              <p>✓ Heart rate and recovery metrics for holistic health tracking.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <GlassPanel
                className={`p-6 text-neutral-300 transition-all ease-out duration-700 delay-[0ms] ${isFitnessTrackersVisible ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-16'} border-t-4 border-sky-500`}
              >
                <h4 className="text-lg font-semibold text-white mb-3">Fitbit Activity (Example)</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <p><strong className="text-white">Steps:</strong> 9,857</p>
                  <p><strong className="text-white">Miles:</strong> 4.3</p>
                  <p><strong className="text-white">Calories:</strong> 2,478</p>
                  <p><strong className="text-white">Active Min:</strong> 45</p>
                  <p><strong className="text-white">Sleep:</strong> 7:15</p>
                  <p><strong className="text-white">Resting BPM:</strong> 68</p>
                </div>
              </GlassPanel>
              <GlassPanel
                className={`p-6 text-neutral-300 transition-all ease-out duration-700 delay-[150ms] ${isFitnessTrackersVisible ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-16'} border-t-4 border-sky-500`}
              >
                <h4 className="text-lg font-semibold text-white mb-3">Samsung Health (Example)</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <p><strong className="text-white">Steps:</strong> 11,235</p>
                  <p><strong className="text-white">Miles:</strong> 5.2</p>
                  <p><strong className="text-white">Calories:</strong> 2,912</p>
                  <p><strong className="text-white">Active Min:</strong> 65</p>
                  <p><strong className="text-white">Sleep:</strong> 8:10</p>
                  <p><strong className="text-white">Resting BPM:</strong> 71</p>
                </div>
              </GlassPanel>
            </div>
          </GlassPanel>
        </section>

        <SectionDivider />

        {/* Section 5: Six Key Performance Areas */}
        <section ref={performanceAreasRef} id="performance-areas" className={`py-10 md:py-12 transition-all duration-1000 ease-out ${isPerformanceAreasVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <GlassPanel className="container mx-auto px-4 py-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10 md:mb-12 lg:mb-16">Holistic Growth Across Six Key Performance Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-8 lg:gap-y-10">
              {performanceAreasData.map((area, index) => {
                let slideFromDirection: 'left' | 'right' | 'bottom' = 'bottom';
                if (index % 3 === 0) slideFromDirection = 'left';
                if (index % 3 === 2) slideFromDirection = 'right';
                return (
                  <FeatureCard
                    key={area.id}
                    icon={area.icon}
                    title={area.title}
                    description={area.description}
                    cardStyleType="simple"
                    animationDelayIndex={index}
                    isVisible={isPerformanceAreasVisible}
                    slideFromDirection={slideFromDirection}
                  />
                );
              })}
            </div>
          </GlassPanel>
        </section>

        <SectionDivider />

        {/* Section 6: Social Proof (Testimonials) */}
        <section ref={testimonialsRef} id="testimonials" className={`py-10 md:py-12 transition-all duration-1000 ease-out ${isTestimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <GlassPanel className="container mx-auto px-4 py-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10 md:mb-12 lg:mb-16">
              What People Are Saying
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">
              {testimonialsData.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  imageSrc={testimonial.imageSrc}
                  altText={testimonial.altText}
                  name={testimonial.name}
                  title={testimonial.title}
                  quote={testimonial.quote}
                  animationDelayIndex={index}
                  isVisible={isTestimonialsVisible}
                />
              ))}
            </div>
          </GlassPanel>
        </section>

        <SectionDivider />

        {/* Section 7: FAQ */}
        <section ref={faqRef} id="faq" className={`py-10 md:py-12 transition-all duration-1000 ease-out ${isFaqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <GlassPanel className="container mx-auto px-4 py-8 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10 md:mb-12 lg:mb-16">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faqItem) => (
                <FAQItem
                  key={faqItem.id}
                  value={faqItem.id}
                  question={faqItem.question}
                  answer={faqItem.answer}
                />
              ))}
            </Accordion>
          </GlassPanel>
        </section>

        <SectionDivider />

        {/* Section 8: Final CTA Section */}
        <section ref={finalCtaRef} id="final-cta" className={`py-10 md:py-16 bg-gradient-to-t from-background to-muted/20 dark:from-neutral-900 dark:to-neutral-800/30 transition-all duration-1000 ease-out ${isFinalCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <CTASection
            headline="Start Forging Your Elite Habits Today"
            description="Take control of your life, build unbreakable habits, and master your mind with MaxiMost."
            buttonText="Sign Up & Get Started"
            buttonLink="/login"
            showEmailInput={false}
            showRewardsOptIn={false}
            buttonVariant="primary"
            className="container mx-auto max-w-3xl"
          />
        </section>

        <footer className="py-8 border-t border-neutral-700 dark:border-neutral-800">
            <div className="container mx-auto px-4 text-center text-neutral-400 dark:text-neutral-500 text-sm">
                <div className="space-x-4 mb-3">
                    <a href="/privacy-policy" className="hover:text-sky-400 dark:hover:text-sky-300 transition-colors duration-300">Privacy Policy</a>
                    <a href="/terms-of-service" className="hover:text-sky-400 dark:hover:text-sky-300 transition-colors duration-300">Terms of Service</a>
                    <a href="/contact" className="hover:text-sky-400 dark:hover:text-sky-300 transition-colors duration-300">Contact Us</a>
                </div>
                <p>© {new Date().getFullYear()} MaxiMost. All rights reserved.</p>
            </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;