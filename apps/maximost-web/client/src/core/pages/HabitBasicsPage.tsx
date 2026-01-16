
import { TrendingUp, CheckCircle, Zap } from 'lucide-react';

export default function HabitBasicsPage() {
  return (

      <div className="max-w-4xl mx-auto pb-20 space-y-12">
        <header className="text-center">
           <h1 className="text-4xl font-bold text-white mb-4">The Science of Performance</h1>
           <p className="text-xl text-gray-400">Principles to build an elite operating system.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
           <div className="bg-gray-900 p-8 rounded-2xl border border-blue-900/30">
              <div className="flex items-center gap-4 mb-4">
                 <TrendingUp className="text-blue-400" size={32} />
                 <h2 className="text-2xl font-bold text-white">Compound Effect</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                 Improving by 1% every day isn't noticeable in the moment. But over a year, 1.01^365 = <strong>37.78x better</strong>.
                 Consistency &gt; Intensity.
              </p>
           </div>
           <div className="bg-gray-900 p-8 rounded-2xl border border-green-900/30">
              <div className="flex items-center gap-4 mb-4">
                 <span className="text-3xl">🐸</span>
                 <h2 className="text-2xl font-bold text-white">Eat The Frog</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                 Identify your highest-impact, hardest task. Do it before you check email or social media.
                 Momentum is created by tackling resistance early.
              </p>
           </div>
        </div>

        <section className="bg-gray-900 p-8 rounded-2xl border border-purple-900/30">
           <div className="flex items-center gap-4 mb-4">
              <CheckCircle className="text-purple-400" size={32} />
              <h2 className="text-2xl font-bold text-white">Identity-Based Habits</h2>
           </div>
           <p className="text-gray-300 leading-relaxed">
              Don't say "I'm trying to run." Say <strong>"I am a runner."</strong>
              Every time you complete a habit, you cast a vote for the person you want to become.
           </p>
        </section>
      </div>

  );
}
