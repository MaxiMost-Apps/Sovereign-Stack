import { useState } from 'react';
import { supabase } from '@/services/supabase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function LoginCore() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');
  const [founderBtnText, setFounderBtnText] = useState("Secure Your Spot");
  const navigate = useNavigate();

  // Function to handle Social Login
  const handleSocialLogin = async (provider: any) => {
    // Check if we are on Mobile (Capacitor) or Web
    const isCapacitor = (window as any).Capacitor !== undefined;

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider, // 'google' or 'facebook'
      options: {
        // Vital for Mobile: Redirects back to the app, not the browser
        redirectTo: isCapacitor
          ? 'com.maximost.atlas://login-callback'
          : window.location.origin
      },
    });

    if (error) setMessage(error.message);
  };

  const handleResetPassword = async () => {
      if (!email) {
          setMessage("Enter email to reset.");
          return;
      }
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + '/reset-password',
      });
      if (error) setMessage(error.message);
      else setMessage("Recovery Initiated. Check Email.");
      setLoading(false);
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (isSignUp) {
       const { error } = await supabase.auth.signUp({ email, password });
       if (error) setMessage(error.message);
       else setMessage("Check your email!");
    } else {
       const { data, error } = await supabase.auth.signInWithPassword({ email, password });
       if (error) {
           setMessage(error.message);
       } else if (data?.user) {
           // FORCE PROFILE CREATION
           await supabase.from('profiles').upsert({
               id: data.user.id,
               coach_preference: 'stoic',
               theme_preference: 'dark'
           }, { onConflict: 'id' });
           navigate('/dashboard');
       }
    }
    setLoading(false);
  };

  const handleGuest = async () => {
     setLoading(true);
     // Phase 89/90: Guest + Demo Load
     const { data, error } = await supabase.auth.signInAnonymously();
     if(error) {
         setMessage(error.message);
     } else if (data?.user) {
         // FORCE PROFILE CREATION
         await supabase.from('profiles').upsert({
             id: data.user.id,
             coach_preference: 'stoic',
             theme_preference: 'dark'
         }, { onConflict: 'id' });

         navigate('/dashboard');
     }
     setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#020202]">
      {/* LEFT SIDE: The Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-20 relative z-20 bg-[#020202]">
        <div className="w-full max-w-md bg-[#0F172A] border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-3xl font-black text-center mb-2 text-white">MaxiMost</h1>
          <p className="text-center text-gray-500 mb-8">Master Your Mind.</p>

          {message && <div className="bg-red-900/30 text-red-400 p-3 rounded mb-4 text-sm text-center">{message}</div>}

          <div className="flex gap-4 mb-6">
            <button
                onClick={() => handleSocialLogin('google')}
                className="flex-1 bg-white text-black py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition"
            >
                <span className="font-bold text-lg">G</span> Google
            </button>

            <button
                onClick={() => handleSocialLogin('facebook')}
                className="flex-1 bg-[#1877F2] text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition"
            >
                <span className="font-bold text-lg">f</span> Facebook
            </button>
          </div>

          <div className="relative my-6">
             <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-800"></div></div>
             <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0F172A] px-2 text-gray-500">OR USING EMAIL</span></div>
          </div>

          <form onSubmit={handleEmail} className="space-y-4">
             <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-black/30 border border-gray-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none" required />
             <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full bg-black/30 border border-gray-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none" required />
             <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors">
                {loading ? '...' : (isSignUp ? 'Create Account' : 'Sign In')}
             </button>
          </form>

          <div className="mt-6 text-center text-sm space-y-2">
             <button onClick={() => setIsSignUp(!isSignUp)} className="text-gray-400 hover:text-white underline block w-full">
                {isSignUp ? "Already have an account?" : "Create new account"}
             </button>
             {!isSignUp && (
                 <button onClick={handleResetPassword} className="text-slate-500 hover:text-blue-400 text-xs uppercase tracking-wider font-bold">
                     Forgot Password?
                 </button>
             )}
          </div>

          <button onClick={handleGuest} className="w-full mt-4 text-gray-500 text-xs hover:text-white">Continue as Guest (Demo)</button>
        </div>

        {/* HELP FAB */}
        <button
            onClick={() => window.open('https://maximost.com/docs', '_blank')}
            className="absolute bottom-8 right-8 w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all shadow-lg"
            title="Need Help?"
        >
            <span className="text-lg font-bold">?</span>
        </button>
      </div>

      {/* RIGHT SIDE: The Founder Anchor */}
      <div className="flex-1 bg-[#020202] flex items-center justify-center p-8 lg:p-12 relative overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-900">

          {/* A. Background Grid Texture (Fixes the 'Empty' look) */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />

          {/* B. The Founder Card */}
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.2 }}
             className="max-w-md w-full bg-[#0a0a0a]/90 border border-slate-800 p-8 rounded-3xl relative backdrop-blur-xl shadow-2xl z-10"
          >
              {/* Top Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>

              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-[0.2em] uppercase">
                  Limited Availability
              </div>

              <h2 className="text-3xl font-black text-white mb-2">The Founding 500</h2>
              <p className="text-slate-400 text-sm mb-8">Join the inner circle. Build the future.</p>

              <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-black text-white">$199</span>
                  <span className="text-lg font-bold text-blue-500">Lifetime</span>
                  <span className="text-xs text-slate-500 line-through ml-2">$499</span>
              </div>

              <ul className="space-y-4 mb-8">
                  {['Lifetime Access', 'Grandfathered AI Models', 'Priority Support', 'Founder Badge'].map(item => (
                      <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                          <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                              <Check className="w-3 h-3 text-blue-400" />
                          </div>
                          {item}
                      </li>
                  ))}
              </ul>

              {/* C. The Button (Balances the UI) */}
              <button
                onClick={() => setFounderBtnText("Access Coming Soon")}
                className="w-full py-4 bg-slate-100 hover:bg-white text-black rounded-xl font-bold shadow-lg transition-all mt-2 uppercase tracking-wider text-xs"
              >
                  {founderBtnText}
              </button>
          </motion.div>
      </div>
    </div>
  );
}
