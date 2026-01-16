import React from 'react';
import { Link } from 'react-router-dom';
import Particles from "@tsparticles/react";
import type { Engine } from "tsparticles-engine";
import { loadStarsPreset } from "@tsparticles/preset-stars";
import GlassPanel from '../../components/ui/GlassPanel';
import { FeatureCard } from '../../components/landing/FeatureCard';
import { Users, Brain, Zap, TrendingUp, FlaskConical, ShieldCheck, Dumbbell, Apple, Bed, Lightbulb, Landmark, Smartphone, Activity, Watch, Bike } from 'lucide-react';

// --- DATA ---
const coaches = [
    { name: 'THE STOIC', description: 'Calm, reflective, and logical. Focuses on building inner resilience. The best choice for a thoughtful, stoic approach.', image: '/images/stoicCC1.png' },
    { name: 'THE OPERATOR', description: 'Direct, intense, and action-oriented. Emphasizes extreme ownership and discipline over motivation.', image: '/images/operatorCC1t.png' },
    { name: 'THE NURTURER', description: 'Encouraging, empathetic, and supportive. Fosters a growth mindset and celebrates progress. A gentle, but firm hand.', image: '/images/NurturerCC1.png' },
];
const keyFeaturesData = [
    { id: "feat-multi-view", icon: <Users size={32} className="text-sky-400" />, title: "Multi-view Tracking", description: "Daily, weekly, and monthly views for habits." },
    { id: "feat-ai-coach", icon: <Brain size={32} className="text-emerald-400" />, title: "AI Habit Coach", description: "Get personalized guidance to optimize your consistency." },
    { id: "feat-break-bad", icon: <Zap size={32} className="text-amber-400" />, title: "Break Bad Habits", description: "Specialized tools to overcome negative patterns." },
    { id: "feat-one-percent", icon: <TrendingUp size={32} className="text-sky-400" />, title: "1% Better Every Day", description: "Make consistent improvements via the compound effect." },
    { id: "feat-science", icon: <FlaskConical size={32} className="text-emerald-400" />, title: "Scientific Approach", description: "Based on evidence-backed protocols from top experts." },
    { id: "feat-resilience", icon: <ShieldCheck size={32} className="text-amber-400" />, title: "Mental Resilience", description: "Build unwavering discipline inspired by elite methods." },
];
const performanceAreasData = [
    { id: "area-physical", icon: <Dumbbell size={32} className="text-sky-400" />, title: "Physical Training", description: "Strength, cardio, and recovery" },
    { id: "area-nutrition", icon: <Apple size={32} className="text-emerald-400" />, title: "Nutrition & Fueling", description: "Diet, hydration, and supplements" },
    { id: "area-sleep", icon: <Bed size={32} className="text-amber-400" />, title: "Sleep & Hygiene", description: "Quality rest and recovery cycles" },
    { id: "area-mental", icon: <Lightbulb size={32} className="text-rose-400" />, title: "Mental Acuity", description: "Focus, learning, and mindfulness" },
    { id: "area-relationships", icon: <Users size={32} className="text-violet-400" />, title: "Relationships", description: "Social connections and communication" },
    { id: "area-financial", icon: <Landmark size={32} className="text-teal-400" />, title: "Financial Habits", description: "Saving, investing, and wealth building" },
];

const testimonialsData = [
    { id: "t-hormozi", imageSrc: "https://placehold.co/100x100/1E293B/FFFFFF?text=AH", altText: "Alex Hormozi", name: "Alex Hormozi", title: "Founder, Acquisition.com", quote: "MaxiMost perfectly embodies the 'small hinges swing big doors' philosophy. The ability to track consistent 1% improvements across multiple life domains is a game-changer. This is the operating system for high performers." },
    { id: "t-urban", imageSrc: "https://placehold.co/100x100/2A3B4C/FFFFFF?text=MU", altText: "Melissa Urban", name: "Melissa Urban", title: "Co-Founder & CEO, Whole30", quote: "I've tried dozens of habit trackers, but none integrate across all aspects of wellness like MaxiMost. The fitness tracker integration is brilliant—tracking my habits without requiring manual input makes consistency so much easier." },
    { id: "t-huberman", imageSrc: "https://placehold.co/100x100/3B4C5D/FFFFFF?text=ANH", altText: "Andrew Huberman", name: "Andrew Huberman", title: "Neuroscientist & Professor", quote: "The science behind MaxiMost is solid. By focusing on small, consistent behavior changes across multiple domains, they've created a system that works with our brain's neuroplasticity rather than against it. This is how lasting habits are formed." },
    { id: "t-patrick", imageSrc: "https://placehold.co/100x100/4C5D6E/FFFFFF?text=RP", altText: "Rhonda Patrick", name: "Rhonda Patrick", title: "Biochemist & Health Expert", quote: "The holistic approach to health in MaxiMost is what sets it apart. It understands that physical training, nutrition, sleep, mental acuity, social relationships, and finances are all interconnected systems. Finally, a habit tracker that sees the complete picture!" },
];

const faqData = [
    { id: "faq-1", question: "What makes Maximost different from other habit trackers?", answer: "Maximost isn't just a habit tracker—it's an AI-powered life operating system that applies both ancient Stoic wisdom and modern performance science. We integrate with 5 fitness trackers, provide automatic habit completion, offer streak milestones, and focus on the \"maximum bang for your buck\" principle to truly transform your life one habit at a time." },
    { id: "faq-2", question: "How does the fitness tracker integration work?", answer: "Maximost connects seamlessly with Fitbit, Samsung Health, Apple Health, Google Fit, Garmin, and Strava. Once connected, relevant activities like steps, workouts, sleep data, and more will automatically mark corresponding habits as complete without manual input, making consistent tracking effortless." },
    { id: "faq-3", question: "What are the six key performance areas?", answer: "Maximost tracks habits across six critical life domains: Physical Training (red), Nutrition & Fueling (orange), Sleep & Hygiene (indigo), Mental Acuity & Growth (yellow), Relationships & Community (blue), and Financial Habits (green). This holistic approach ensures you're developing in all areas that truly matter for a fulfilling life." },
    { id: "faq-4", question: "How does the streak system motivate long-term habit formation?", answer: "Our streak system counts consecutive days of habit completion while providing milestone celebrations (3, 7, 14, 30, 60, 90, 180, 365 days). The system is designed with flexibility—continuing if you complete habits today or yesterday—while also encouraging consistent daily action for maximum habit formation." },
];

// --- MAIN COMPONENT ---
const Homepage = ({ init }) => {
  const [selectedCoach, setSelectedCoach] = React.useState(null);

  const TestimonialCard = ({ imageSrc, altText, name, title, quote, animationDelayIndex }) => (
    <GlassPanel className={`flex flex-col p-6 animate-fadeInSlideUp transition-transform transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/50`} style={{ animationDelay: `${animationDelayIndex * 150}ms` }}>
        <div className="flex items-center mb-4">
            <img src={imageSrc} alt={altText} className="w-12 h-12 rounded-full mr-4" loading="lazy" />
            <div className="flex-grow">
                <h3 className="text-lg font-semibold text-white">{name}</h3>
                <p className="text-xs text-neutral-300">{title}</p>
            </div>
        </div>
        <div>
            <p className="italic leading-relaxed">"{quote}"</p>
        </div>
    </GlassPanel>
  );

  const FAQItem = ({ question, answer }) => (
    <GlassPanel className="mb-4 transition-all duration-300 hover:bg-gray-700/60">
        <details className="p-4 cursor-pointer group">
            <summary className="font-semibold text-lg text-white list-none flex justify-between items-center">
                {question}
                <span className="transform transition-transform duration-200 group-open:rotate-45">+</span>
            </summary>
            <p className="text-neutral-300 mt-2 text-left">{answer}</p>
        </details>
    </GlassPanel>
  );

  const particlesOptions = {
    preset: "stars",
    background: {
      color: {
        value: "#0A192F",
      },
    },
    particles: {
      number: {
        value: 120,
      },
      color: {
        value: "#FFFFFF",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: {min: 0.1, max: 1},
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0.1,
          sync: false
        }
      },
      size: {
        value: {min: 0.5, max: 1.5},
      },
      move: {
        enable: true,
        speed: 0.3,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
      links: {
          enable: false,
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: false,
        },
        onclick: {
          enable: false,
        },
        resize: true
      }
    },
    detectRetina: true,
  };

  const CoachCard = ({ coach, isSelected, onSelect }) => {
    const [transform, setTransform] = React.useState("scale(1) rotateX(0) rotateY(0)");

    const handleMouseMove = (e) => {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const rotateX = (y / height - 0.5) * -30;
      const rotateY = (x / width - 0.5) * 30;
      setTransform(`scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    };

    const handleMouseLeave = () => {
      setTransform("scale(1) rotateX(0) rotateY(0)");
    };

    const cardStyle = {
      transition: "transform 0.1s ease-out",
      transform: isSelected ? "scale(1.05)" : transform,
      transformStyle: "preserve-3d",
    };

    return (
      <div
        className={`flex flex-col items-center cursor-pointer group`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onSelect}
        style={{ perspective: "1000px" }}
      >
        <GlassPanel style={cardStyle} className={`rounded-lg ${isSelected ? 'shadow-2xl shadow-blue-500/50 ring-2 ring-blue-400' : 'hover:shadow-lg hover:shadow-white/10'} overflow-hidden`}>
          <div className="relative w-full" style={{ paddingTop: '75%' }}>
            <img
              src={coach.image}
              alt={coach.name}
              className="absolute top-0 left-0 w-full h-full object-cover object-top"
            />
          </div>
          <div className="p-4 text-center bg-gray-800/20 backdrop-blur-lg">
            <h3 className="text-xl font-bold text-white">{coach.name}</h3>
            <p className="text-sm text-slate-300 mt-2">{coach.description}</p>
          </div>
        </GlassPanel>
      </div>
    );
  };


  return (
    <div className="min-h-screen text-white font-sans">
      {init && <Particles
        id="tsparticles"
        options={particlesOptions as any}
        className="absolute inset-0 z-[-1]"
      />}
      <div className="container mx-auto px-4 py-20 text-center">

        <GlassPanel className="py-12 px-8 max-w-4xl mx-auto border-2 border-white/25">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Forge Your Elite Habits. Master Your Mind.</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">Harness the power of AI to build extraordinary discipline.</p>
          <Link to="/login" className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all transform hover:scale-105 active:scale-95 animate-pulse-glow">Get Started Free</Link>
        </GlassPanel>

        <div className="mt-24">
          <h2 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">Pick your Coaching style</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coaches.map((coach) => (
              <CoachCard
                key={coach.name}
                coach={coach}
                isSelected={selectedCoach === coach.name}
                onSelect={() => setSelectedCoach(coach.name)}
              />
            ))}
          </div>
        </div>

        {/* --- CORRECTED & RESTORED SECTIONS --- */}
        <div className="mt-24 animate-fadeInSlideUp">
            <h2 className="text-4xl font-bold text-center text-white mb-16 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">Key Features of MaxiMost</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {keyFeaturesData.map((feature, index) => (
                    <div
                        key={feature.id}
                        className="animate-fadeInSlideUp"
                        style={{ animationDelay: `${index * 150}ms` }}
                    >
                        <FeatureCard {...feature} />
                    </div>
                ))}
            </div>
        </div>

        <div
            className="mt-24 animate-fadeInSlideUp"
            onMouseMove={(e) => {
                const { currentTarget: target } = e;
                const rect = target.getBoundingClientRect(),
                      x = e.clientX - rect.left,
                      y = e.clientY - rect.top;
                target.style.setProperty("--mouse-x", `${x}px`);
                target.style.setProperty("--mouse-y", `${y}px`);
            }}
            style={{
                '--mouse-x': '50%',
                '--mouse-y': '50%',
                position: 'relative',
                background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.1), transparent 40%)'
            } as React.CSSProperties}
        >
            <GlassPanel className="py-12 px-8 max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">Fitness Tracker Integration</h2>
                <p className="text-lg text-gray-300 mb-8">Connect All Your Health Data</p>
                <p className="text-md text-gray-300 mb-8 max-w-3xl mx-auto">Integration with your favorite fitness platforms automatically completes your habits based on your activity.</p>
                <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
<div className="flex items-center p-3 bg-neutral-800/50 dark:bg-neutral-800/60 rounded-lg shadow-md hover:scale-110 hover:bg-neutral-700/70 transition-all cursor-pointer">
                        <span className="text-sky-400 mr-2"><Smartphone /></span>
                        <span className="ml-1 text-sm font-medium text-neutral-100">Fitbit</span>
                    </div>
<div className="flex items-center p-3 bg-neutral-800/50 dark:bg-neutral-800/60 rounded-lg shadow-md hover:scale-110 hover:bg-neutral-700/70 transition-all cursor-pointer">
                        <span className="text-violet-400 mr-2"><Smartphone /></span>
                        <span className="ml-1 text-sm font-medium text-neutral-100">Samsung Health</span>
                    </div>
<div className="flex items-center p-3 bg-neutral-800/50 dark:bg-neutral-800/60 rounded-lg shadow-md hover:scale-110 hover:bg-neutral-700/70 transition-all cursor-pointer">
                        <span className="text-gray-400 mr-2"><Apple /></span>
                        <span className="ml-1 text-sm font-medium text-neutral-100">Apple Health</span>
                    </div>
<div className="flex items-center p-3 bg-neutral-800/50 dark:bg-neutral-800/60 rounded-lg shadow-md hover:scale-110 hover:bg-neutral-700/70 transition-all cursor-pointer">
                        <span className="text-rose-400 mr-2"><Activity /></span>
                        <span className="ml-1 text-sm font-medium text-neutral-100">Google Fit</span>
                    </div>
<div className="flex items-center p-3 bg-neutral-800/50 dark:bg-neutral-800/60 rounded-lg shadow-md hover:scale-110 hover:bg-neutral-700/70 transition-all cursor-pointer">
                        <span className="text-amber-400 mr-2"><Watch /></span>
                        <span className="ml-1 text-sm font-medium text-neutral-100">Garmin</span>
                    </div>
<div className="flex items-center p-3 bg-neutral-800/50 dark:bg-neutral-800/60 rounded-lg shadow-md hover:scale-110 hover:bg-neutral-700/70 transition-all cursor-pointer">
                        <span className="text-orange-400 mr-2"><Bike /></span>
                        <span className="ml-1 text-sm font-medium text-neutral-100">Strava</span>
                    </div>
                </div>
                <div className="max-w-2xl mx-auto text-left space-y-3 text-neutral-200 mb-10 text-lg">
                    <p>✓ Auto-complete workout habits when your fitness tracker records activity.</p>
                    <p>✓ Sleep habits marked complete when your tracker records sufficient sleep.</p>
                    <p>✓ Heart rate and recovery metrics for holistic health tracking.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <GlassPanel className="p-6 text-neutral-300 border-t-4 border-sky-500">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-semibold text-white">Fitbit Activity</h4>
                            <span className="text-xs text-sky-400">EXAMPLE</span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <p><strong className="text-white">Steps:</strong> 9,857</p>
                            <p><strong className="text-white">Miles:</strong> 4.3</p>
                            <p><strong className="text-white">Calories:</strong> 2,478</p>
                            <p><strong className="text-white">Active Min:</strong> 45</p>
                            <p><strong className="text-white">Sleep:</strong> 7:15</p>
                            <p><strong className="text-white">Resting BPM:</strong> 68</p>
                        </div>
                    </GlassPanel>
                    <GlassPanel className="p-6 text-neutral-300 border-t-4 border-sky-500">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-semibold text-white">Samsung Health</h4>
                            <span className="text-xs text-violet-400">EXAMPLE</span>
                        </div>
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
        </div>

        <div className="mt-24 animate-fadeInSlideUp">
            <h2 className="text-4xl font-bold text-center text-white mb-16 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">Holistic Growth Across Six Key Performance Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {performanceAreasData.map((area, index) => (
                    <div
                        key={area.id}
                        className="animate-fadeInSlideUp"
                        style={{ animationDelay: `${index * 150}ms` }}
                    >
                        <FeatureCard {...area} />
                    </div>
                ))}
            </div>
        </div>

        {/* Testimonials Section */}
        <div
            className="mt-24 animate-fadeInSlideUp"
            onMouseMove={(e) => {
                const { currentTarget: target } = e;
                const rect = target.getBoundingClientRect(),
                      x = e.clientX - rect.left,
                      y = e.clientY - rect.top;
                target.style.setProperty("--mouse-x", `${x}px`);
                target.style.setProperty("--mouse-y", `${y}px`);
            }}
            style={{
                '--mouse-x': '50%',
                '--mouse-y': '50%',
                position: 'relative',
                background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.1), transparent 40%)'
            } as React.CSSProperties}
        >
          <h2 className="text-4xl font-bold text-center text-white mb-16 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">What People Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonialsData.map((testimonial, index) => (
                <TestimonialCard key={testimonial.id} {...testimonial} animationDelayIndex={index} />
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 animate-fadeInSlideUp">
          <h2 className="text-4xl font-bold text-center text-white mb-16 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            {faqData.map((faq) => (
                <FAQItem key={faq.id} {...faq} />
            ))}
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="mt-24 animate-fadeInSlideUp">
            <GlassPanel className="py-12 px-8 max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">Start Forging Your Elite Habits Today</h2>
                <p className="text-lg text-gray-300 mb-8">Take control of your life, build unbreakable habits, and master your mind with MaxiMost.</p>
                <Link to="/login" className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all transform hover:scale-105 active:scale-95">Sign Up & Get Started</Link>
            </GlassPanel>
        </div>

      </div>
      <footer className="py-8 border-t border-neutral-700 dark:border-neutral-800">
            <div className="container mx-auto px-4 text-center text-neutral-400 dark:text-neutral-500 text-sm">
                <div className="space-x-4 mb-3">
                    <Link to="/contact" className="hover:text-sky-400 dark:hover:text-sky-300 transition-colors duration-300">Contact</Link>
                    <Link to="/terms-of-service" className="hover:text-sky-400 dark:hover:text-sky-300 transition-colors duration-300">Terms of Service</Link>
                    <Link to="/privacy-policy" className="hover:text-sky-400 dark:hover:text-sky-300 transition-colors duration-300">Privacy Policy</Link>
                </div>
                <p>© 2025 MaxiMost. All rights reserved.</p>
            </div>
        </footer>
    </div>
  );
};

export default Homepage;
