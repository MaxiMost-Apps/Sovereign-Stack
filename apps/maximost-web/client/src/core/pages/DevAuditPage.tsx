import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';


export default function DevAuditPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function getRawData() {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: profile } = await supabase.from('profiles').select('*').single();
      const { data: habits } = await supabase.from('habits').select('*, metadata');
      setData({ user, profile, habits });
    }
    getRawData();
  }, []);

  return (

        <div className="p-10 font-mono bg-black text-green-500 min-h-screen overflow-auto">
          <h1 className="text-xl font-bold mb-4">SYSTEM DIAGNOSTIC: RAW DATA FEED</h1>
          <pre className="whitespace-pre-wrap break-all text-xs">{JSON.stringify(data, null, 2)}</pre>
        </div>

  );
}
