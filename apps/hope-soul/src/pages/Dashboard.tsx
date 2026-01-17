import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface SovereignKey {
  id: string;
  key_code: string;
  status: 'AVAILABLE' | 'REDEEMED';
  recipient_email?: string;
  created_at: string;
}

export const Dashboard = () => {
  const [keys] = useState<SovereignKey[]>([]);
  const [loading, setLoading] = useState(false); // Default false for demo if no auth
  const [redeemCode, setRedeemCode] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  // MOCK DATA for Demo Purposes if API fails or no auth
  // In a real integration, we'd fetch this from the API I just built.
  // const fetchKeys = async () => { ... }

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
        // Fetch User ID (Assuming we have auth context, using a placeholder for now)
        // In a real app, `supabase.auth.getUser()` would be used.
        // const { data: { user } } = await supabase.auth.getUser();
        // const userId = user?.id;

        // Direct API call to the Hono backend
        // Since we are on port 5174 and API is on 3000 (usually), we need the full URL or proxy.
        // Assuming localhost:3000 for development.

        // Temporary Fake Logic for Demo UI until Auth is fully wired
        if (!redeemCode) throw new Error("Code is required");

        const response = await fetch('http://localhost:3000/api/keys/redeem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code: redeemCode,
                userId: '00000000-0000-0000-0000-000000000000', // Placeholder or real ID
                email: email
            })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Redemption failed');

        setMessage({ type: 'success', text: 'Key successfully redeemed! Access granted.' });
        setRedeemCode('');
        setEmail('');

    } catch (err: unknown) {
        // Fallback for demo if API isn't running reachable
        console.error(err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to connect to Sovereign Network.';
        setMessage({ type: 'error', text: errorMessage });
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="font-serif text-4xl font-bold mb-2">Scholarship Dashboard</h1>
        <p className="text-neutral-500 mb-12">Manage your Sovereign Keys or redeem an invitation.</p>

        <div className="grid md:grid-cols-2 gap-8">
            {/* VANGUARD / ARCHITECT VIEW */}
            <section className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-primary mr-2" />
                    Your Sovereign Keys
                </h2>
                <div className="space-y-4">
                    {/* Empty State / Loading */}
                    {keys.length === 0 ? (
                        <div className="text-center py-12 bg-neutral-50 rounded-md border border-dashed border-neutral-200">
                            <p className="text-neutral-400 text-sm">No keys minted yet.</p>
                            <p className="text-xs text-neutral-300 mt-1">Ascend to Vanguard to mint keys.</p>
                        </div>
                    ) : (
                        <ul className="space-y-2">
                           {keys.map(key => (
                               <li key={key.id} className="flex justify-between items-center p-3 bg-neutral-50 rounded border border-neutral-100">
                                   <code className="text-primary font-mono">{key.key_code}</code>
                                   <span className={`text-xs px-2 py-1 rounded ${key.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' : 'bg-neutral-200 text-neutral-500'}`}>
                                       {key.status}
                                   </span>
                               </li>
                           ))}
                        </ul>
                    )}
                </div>
            </section>

            {/* INITIATE VIEW (REDEEM) */}
            <section className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
                <h2 className="text-xl font-bold mb-4">Redeem Invitation</h2>
                <form onSubmit={handleRedeem} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Recipient Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded border border-neutral-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Sovereign Key Code</label>
                        <input
                            type="text"
                            required
                            value={redeemCode}
                            onChange={e => setRedeemCode(e.target.value)}
                            className="w-full px-4 py-2 rounded border border-neutral-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono"
                            placeholder="SOV-XXXX-XXXX"
                        />
                    </div>

                    {message && (
                        <div className={`text-sm p-3 rounded ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-foreground text-background py-2 rounded font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Verifying...' : 'Redeem Key'}
                    </button>
                </form>
            </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
