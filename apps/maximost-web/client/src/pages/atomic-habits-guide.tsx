import React from 'react';
import { PageContainer } from "@/components/layout/page-container";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle, GlassCardDescription } from "@/components/glass/GlassCard";
import { Button } from "@/components/ui/button";
import { CheckCircle, Eye, Heart, Gift, Zap, TrendingUp, Target, Puzzle, Lightbulb, ShieldAlert, Users, Brain, Timer, CheckSquare, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const FourLawsSection: React.FC<{
  lawNumber: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  points: { point: string; detail: string; icon?: React.ReactNode }[];
}> = ({ lawNumber, title, subtitle, icon, points }) => (
  <GlassCard>
    <GlassCardHeader>
      <div className="flex items-center mb-3">
        <span className="text-5xl font-bold mr-4 text-white/40">{lawNumber}</span>
        {React.cloneElement(icon as React.ReactElement, { className: "w-10 h-10 text-white/80" })}
      </div>
      <GlassCardTitle>{title}</GlassCardTitle>
      <GlassCardDescription>{subtitle}</GlassCardDescription>
    </GlassCardHeader>
    <GlassCardContent>
      <ul className="space-y-4">
        {points.map((p, index) => (
          <li key={index} className="flex items-start">
            <div className="mr-3 mt-1 flex-shrink-0 text-primary">
              {p.icon || <CheckCircle size={20} />}
            </div>
            <div>
              <h4 className="font-semibold text-lg text-white/90">{p.point}</h4>
              <p className="text-white/70 text-sm">{p.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </GlassCardContent>
  </GlassCard>
);

export default function AtomicHabitsGuidePage() {
  return (
    <PageContainer>
      <div className="py-8 px-4 md:px-6">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            The Four Laws of Behavior Change
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            An actionable framework for building good habits and breaking bad ones, inspired by James Clear's "Atomic Habits".
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          <FourLawsSection
            lawNumber="1st"
            title="Make It Obvious"
            subtitle="How to Create a Good Habit: The Cue"
            icon={<Eye />}
            points={[
              { point: "Implementation Intentions", detail: "State your intention: \"I will [BEHAVIOR] at [TIME] in [LOCATION].\"", icon: <Target size={20}/> },
              { point: "Habit Stacking", detail: "Link new habits to existing ones: \"After [CURRENT HABIT], I will [NEW HABIT].\"", icon: <Puzzle size={20}/> },
              { point: "Design Your Environment", detail: "Make cues for good habits visible and cues for bad habits invisible.", icon: <Lightbulb size={20}/> },
            ]}
          />

          <FourLawsSection
            lawNumber="2nd"
            title="Make It Attractive"
            subtitle="How to Create a Good Habit: The Craving"
            icon={<Heart />}
            points={[
              { point: "Temptation Bundling", detail: "Pair an action you want to do with an action you need to do.", icon: <Gift size={20}/> },
              { point: "Join a Culture", detail: "Surround yourself with people for whom your desired behavior is the norm.", icon: <Users size={20}/> },
              { point: "Reframe Your Mindset", detail: "Highlight the benefits of good habits over the drawbacks.", icon: <Brain size={20}/> },
            ]}
          />

          <FourLawsSection
            lawNumber="3rd"
            title="Make It Easy"
            subtitle="How to Create a Good Habit: The Response"
            icon={<Zap />}
            points={[
              { point: "Reduce Friction", detail: "Decrease the number of steps between you and your good habits.", icon: <TrendingUp size={20}/> },
              { point: "The Two-Minute Rule", detail: "Downscale your habits until they can be done in two minutes or less.", icon: <Timer size={20}/> },
              { point: "Automate Your Habits", detail: "Use technology and one-time decisions to lock in future behavior.", icon: <CheckSquare size={20}/> },
            ]}
          />

          <FourLawsSection
            lawNumber="4th"
            title="Make It Satisfying"
            subtitle="How to Create a Good Habit: The Reward"
            icon={<Gift />}
            points={[
              { point: "Immediate Reward", detail: "Give yourself an immediate reward when you complete your habit.", icon: <CheckCircle size={20}/> },
              { point: "Habit Tracking", detail: "Visually measure your progress and don't break the chain.", icon: <Calendar size={20}/> },
              { point: "Accountability Partner", detail: "Have someone who expects you to perform the habit.", icon: <ShieldAlert size={20}/> },
            ]}
          />
        </div>

        <section className="mt-16 text-center">
          <GlassCard className="inline-block p-8">
            <GlassCardHeader>
              <GlassCardTitle className="text-2xl md:text-3xl">
                Ready to Build Better Habits?
              </GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent>
              <p className="text-white/70 mb-6 max-w-xl mx-auto">
                Apply these laws today using MaxiMost. Start small, be consistent, and watch the compound effect transform your life.
              </p>
              <Button asChild>
                <Link to="/dashboard">Go to My Dashboard</Link>
              </Button>
            </GlassCardContent>
          </GlassCard>
        </section>

      </div>
    </PageContainer>
  );
}
