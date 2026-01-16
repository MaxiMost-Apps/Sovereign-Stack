import React from 'react';
import ContentPageLayout from '@/components/layout/ContentPageLayout';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  CheckCircle,
  Link,
  Calendar,
  Clock,
  Award,
  StickyNote,
  ListTodo,
  Layers,
  Target,
  Eye,
  Smile,
  ThumbsUp,
  Sparkles,
  PlusCircle,
  BarChart2,
  Users
} from "lucide-react";

interface HabitBook {
  id: string;
  title: string;
  author: string;
  description: string;
  keyPrinciples: string[];
  color: string;
}

interface HabitMethod {
  id: string;
  name: string;
  description: string;
  steps: string[];
  category: "building" | "tracking" | "psychology";
  icon: React.ReactNode;
}

// Renamed component
const HabitBuildingBasicsPage: React.FC = () => { // Ensure React is imported if not already

  // Top books on habit building (assuming data is defined within this component scope or imported)
  const habitBooks: HabitBook[] = [
    {
      id: "atomic-habits",
      title: "Atomic Habits",
      author: "James Clear",
      description: "A bestseller that focuses on the idea that small, incremental changes (atomic habits) lead to remarkable results through compound growth.",
      keyPrinciples: [
        "Make it obvious (cue)",
        "Make it attractive (craving)",
        "Make it easy (response)",
        "Make it satisfying (reward)"
      ],
      color: "bg-blue-100 border-blue-300"
    },
    {
      id: "compound-effect",
      title: "The Compound Effect",
      author: "Darren Hardy",
      description: "Reveals how small, daily choices compound over time to create significant life changes, emphasizing consistency and tracking.",
      keyPrinciples: [
        "Small, smart choices + consistency + time = radical difference",
        "Track all actions and habits",
        "Activate the momentum multiplier by building routines",
        "Identify and change your core influences"
      ],
      color: "bg-indigo-100 border-indigo-300"
    },
    {
      id: "power-of-habit",
      title: "The Power of Habit",
      author: "Charles Duhigg",
      description: "Explores the science behind why habits exist and how they can be changed using the habit loop concept.",
      keyPrinciples: [
        "Identify the cue",
        "Experiment with rewards",
        "Isolate the craving",
        "Have a plan (implementation intention)"
      ],
      color: "bg-purple-100 border-purple-300"
    },
    {
      id: "tiny-habits",
      title: "Tiny Habits",
      author: "BJ Fogg",
      description: "A behavior scientist's method for starting with incredibly small actions that are easy to do.",
      keyPrinciples: [
        "Behavior = Motivation + Ability + Prompt (B=MAP)",
        "Make habits tiny to increase ability",
        "Use existing routines as anchors",
        "Celebrate small successes immediately"
      ],
      color: "bg-green-100 border-green-300"
    },
    {
      id: "better-than-before",
      title: "Better Than Before",
      author: "Gretchen Rubin",
      description: "Explores how we can change our habits by understanding ourselves better through the Four Tendencies framework.",
      keyPrinciples: [
        "Know yourself (Upholder, Questioner, Obliger, Rebel)",
        "Different strategies work for different people",
        "Convenience is a major driver of habits",
        "Monitoring creates accountability"
      ],
      color: "bg-yellow-100 border-yellow-300"
    },
    {
      id: "7-habits",
      title: "The 7 Habits of Highly Effective People",
      author: "Stephen Covey",
      description: "Offers timeless principles for personal and interpersonal effectiveness that form the foundation of good habits.",
      keyPrinciples: [
        "Be proactive",
        "Begin with the end in mind",
        "Put first things first",
        "Think win-win"
      ],
      color: "bg-red-100 border-red-300"
    }
  ];

  // Effective methods for habit building (assuming data is defined within this component scope or imported)
  const habitMethods: HabitMethod[] = [
    {
      id: "two-minute-rule",
      name: "Two-Minute Rule / Micro-Habits",
      description: "Make the starting ritual so easy that you can't say no. Begin with incredibly small actions that take less than two minutes.",
      steps: [
        "Scale down your habit to something that takes 2 minutes or less",
        "Focus only on starting, not on finishing",
        "Gradually increase duration once the habit is established",
        "Example: Instead of 'read for an hour,' start with 'read one page'"
      ],
      category: "building",
      icon: <Clock className="h-5 w-5 text-blue-500" />
    },
    {
      id: "habit-stacking",
      name: "Habit Stacking",
      description: "Link a new habit to an existing one, using the existing habit as a trigger for the new one.",
      steps: [
        "Identify a current habit you do consistently",
        "Choose a new habit you want to establish",
        "Use the formula: After [current habit], I will [new habit]",
        "Example: 'After I brush my teeth, I will do 5 push-ups'"
      ],
      category: "building",
      icon: <Layers className="h-5 w-5 text-indigo-500" />
    },
    {
      id: "implementation-intentions",
      name: "Implementation Intentions",
      description: "Be specific about when and where you'll perform a habit using if-then planning.",
      steps: [
        "Set a specific time and location",
        "Use the formula: I will [behavior] at [time] in [location]",
        "Create if-then plans for potential obstacles",
        "Example: 'I will meditate at 7am in my bedroom'"
      ],
      category: "building",
      icon: <Calendar className="h-5 w-5 text-purple-500" />
    },
    {
      id: "dont-break-chain",
      name: "Don't Break the Chain",
      description: "Track consecutive days of completing a habit to build momentum and consistency.",
      steps: [
        "Mark each day you complete your habit on a calendar",
        "Try to maintain an unbroken streak",
        "Focus on not breaking the visual chain",
        "If you miss a day, get back on track immediately"
      ],
      category: "tracking",
      icon: <Link className="h-5 w-5 text-green-500" />
    },
    {
      id: "habit-tracking",
      name: "Habit Tracking Systems",
      description: "Record your habits consistently using manual or digital methods to increase awareness and accountability.",
      steps: [
        "Choose a tracking method (app, journal, calendar)",
        "Record each successful completion",
        "Review progress regularly",
        "Adjust your system as needed for sustainability"
      ],
      category: "tracking",
      icon: <ListTodo className="h-5 w-5 text-red-500" />
    },
    {
      id: "identity-based",
      name: "Identity-Based Habits",
      description: "Focus on becoming the type of person who performs the habit rather than just the outcome.",
      steps: [
        "Decide on the type of person you want to be",
        "Reframe your goal as an identity ('I am a runner' vs 'I want to run')",
        "Start with small behaviors that confirm this identity",
        "Look for evidence that supports your new identity"
      ],
      category: "psychology",
      icon: <Target className="h-5 w-5 text-amber-500" />
    },
    {
      id: "environment-design",
      name: "Environment Design",
      description: "Modify your environment to make good habits obvious and bad habits invisible.",
      steps: [
        "Make cues for good habits visible in your environment",
        "Remove triggers for bad habits from your space",
        "Prepare your environment in advance (e.g., lay out gym clothes)",
        "Use visual cues and reminders strategically"
      ],
      category: "psychology",
      icon: <Eye className="h-5 w-5 text-teal-500" />
    },
    {
      id: "reward-system",
      name: "Reward System",
      description: "Create immediate rewards for completing habits to make them more satisfying and reinforce behavior.",
      steps: [
        "Identify meaningful rewards that aren't counterproductive",
        "Make rewards immediate after completing the habit",
        "Start with external rewards if needed",
        "Gradually shift to intrinsic rewards (pride, satisfaction)"
      ],
      category: "psychology",
      icon: <Smile className="h-5 w-5 text-yellow-500" />
    },
    {
      id: "accountability",
      name: "Accountability Partners",
      description: "Share your goals and progress with others to increase your commitment and consistency.",
      steps: [
        "Find a reliable accountability partner or group",
        "Set up regular check-ins",
        "Be specific about your commitments",
        "Consider using stakes or consequences"
      ],
      category: "psychology",
      icon: <Users className="h-5 w-5 text-pink-500" />
    }
  ];

  const buildingMethods = habitMethods.filter(method => method.category === "building");
  const trackingMethods = habitMethods.filter(method => method.category === "tracking");
  const psychologyMethods = habitMethods.filter(method => method.category === "psychology");

  return (
    <ContentPageLayout title="Habit Building Basics">
      <GlassPanel>
        <div className="prose dark:prose-invert max-w-none text-slate-300">
          <p className="lead text-slate-200">Learn the proven methods for building lasting habits from world-class experts.</p>
          <div className="flex flex-wrap gap-2 my-4">
            <Badge variant="outline"><Sparkles className="h-3.5 w-3.5 mr-1" />Evidence-Based</Badge>
            <Badge variant="secondary"><CheckCircle className="h-3.5 w-3.5 mr-1" />Actionable Advice</Badge>
          </div>

          <h2>The Science of Habit Formation</h2>
          <p>Habits are the compound interest of self-improvement. Small changes in daily routines might seem insignificant at first, but they can deliver remarkable results over time through the power of consistency and compounding.</p>
          <p>The latest research in neuroscience and behavioral psychology has identified proven frameworks that make building positive habits easier and more sustainable. By understanding the habit loop (cue, craving, response, reward) and applying strategic methods, you can transform your habits and achieve lasting change.</p>

          <h3>Key Principles for Successful Habits</h3>
          <ul>
            <li><strong>Consistency over intensity:</strong> Small actions done consistently outperform occasional intense efforts</li>
            <li><strong>Systems over goals:</strong> Focus on the daily system rather than just the end result</li>
            <li><strong>Identity over outcomes:</strong> Change your identity first, and your actions will follow</li>
            <li><strong>Environment over willpower:</strong> Design your environment to make good habits easier</li>
          </ul>

          <h2>The Compound Effect: The Power of 1% Improvements</h2>
          <p>If you improve by just 1% each day for one year, you'll end up 37 times better than when you started. Conversely, if you get 1% worse each day, you'll decline nearly to zero. This isn't just inspiring philosophy—it's mathematics.</p>
          <p>This mathematical reality demonstrates why small habits make a big difference. Success is the product of daily habits—not once-in-a-lifetime transformations. What matters is whether your habits are putting you on the path toward success.</p>

          <h3>How to Apply the Compound Effect</h3>
          <ul>
              <li><strong>Focus on Systems, Not Goals:</strong> Don't focus on losing 30 pounds. Focus on showing up at the gym every day and eating well consistently.</li>
              <li><strong>Embrace "Atomic" Habits:</strong> Break big habits into tiny ones that take less than two minutes to start. Make them so easy you can't say no.</li>
              <li><strong>Value the Long Game:</strong> Habits often appear to make no difference until you cross a critical threshold and unlock a new level of performance.</li>
              <li><strong>Track and Measure:</strong> You can't improve what you don't measure. Track your habits to make the invisible progress visible.</li>
          </ul>

          <h2>Top Books on Habit Building</h2>
          {habitBooks.map((book) => (
            <div key={book.id} className="my-4 p-4 border border-white/10 rounded-lg">
              <h3>{book.title}</h3>
              <p className="text-sm text-gray-400">by {book.author}</p>
              <p>{book.description}</p>
              <h4>Key Principles:</h4>
              <ul>
                {book.keyPrinciples.map((principle, index) => (
                  <li key={index}>{principle}</li>
                ))}
              </ul>
            </div>
          ))}

          <h2>Effective Methods for Habit Building</h2>
          <h3>Building Techniques</h3>
          {buildingMethods.map((method) => (
              <div key={method.id} className="my-4 p-4 border border-white/10 rounded-lg">
                  <h4>{method.name}</h4>
                  <p>{method.description}</p>
                  <h5>How to Apply:</h5>
                  <ol>
                      {method.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                      ))}
                  </ol>
              </div>
          ))}
          <h3>Tracking Methods</h3>
          {trackingMethods.map((method) => (
              <div key={method.id} className="my-4 p-4 border border-white/10 rounded-lg">
                  <h4>{method.name}</h4>
                  <p>{method.description}</p>
                  <h5>How to Apply:</h5>
                  <ol>
                      {method.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                      ))}
                  </ol>
              </div>
          ))}
          <h3>Psychological Tools</h3>
          {psychologyMethods.map((method) => (
              <div key={method.id} className="my-4 p-4 border border-white/10 rounded-lg">
                  <h4>{method.name}</h4>
                  <p>{method.description}</p>
                  <h5>How to Apply:</h5>
                  <ol>
                      {method.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                      ))}
                  </ol>
              </div>
          ))}

          <h2>Common Habit Building Mistakes</h2>
          <h3>What Doesn't Work</h3>
          <ul>
              <li>Relying on motivation alone</li>
              <li>Starting too big</li>
              <li>Focusing only on goals, not systems</li>
              <li>Changing too many habits at once</li>
          </ul>
          <h3>Better Approaches</h3>
          <ul>
              <li>Design systems and environments</li>
              <li>Start with tiny habits</li>
              <li>Focus on processes</li>
              <li>Master one habit at a time</li>
          </ul>

          <h2>Ready to Build Better Habits?</h2>
          <p>Apply these evidence-based methods to your own habit journey using our habit tracking dashboard. Start small, be consistent, and watch as tiny daily improvements compound into remarkable results.</p>
          <div className="flex flex-wrap gap-4 justify-center">
              <Button className="gap-2" size="lg" onClick={() => window.location.href = "/dashboard"}>
                  <CheckCircle className="h-5 w-5" />
                  Go to Habit Dashboard
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.location.href = "/community"}>
                  <Users className="h-5 w-5 mr-1" />
                  Join Accountability Community
              </Button>
          </div>
        </div>
      </GlassPanel>
    </ContentPageLayout>
  );
};

export default HabitBuildingBasicsPage;