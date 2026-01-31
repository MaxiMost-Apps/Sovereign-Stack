import { useState } from 'react';
import { DriveService } from './services/DriveService';
import { AiCortex } from './services/AiCortex';
import { GlucoseSniffer, type GlucoseReading } from './services/GlucoseSniffer';
import { SupabaseService } from './services/SupabaseService';

function App() {
  const [logs, setLogs] = useState<string[]>(['System Initialized...', 'Waiting for Auth...']);
  const [isSyncing, setIsSyncing] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [lastReading, setLastReading] = useState<GlucoseReading | null>(null);

  const addLog = (msg: string) => setLogs(prev => [msg, ...prev]);

  const handleSyncToggle = () => {
    setIsSyncing(!isSyncing);
    addLog(isSyncing ? 'Sync Paused.' : 'Sync Active: 15min Loop Started.');
  };

  const handleManualTrigger = async () => {
    addLog('Manual Trigger: Checking Health Connect...');
    const folder = await DriveService.getTargetFolder();
    addLog(`Target Drive Folder: ${folder}`);
    // Here we would fetch data and push to Supabase
  };

  const handleAskAlexis = async () => {
    addLog('Querying Cortex (Gemini 2.0)...');
    try {
      const reply = await AiCortex.askAlexis("Analyze my drift", { steps: 5000 });
      setAiResponse(reply);
      addLog(`Cortex: ${reply}`);
    } catch (e: any) {
      addLog(`Error: ${e.message}`);
    }
  };

  const runSniffCycle = async () => {
    addLog('Loophole: Sniffing port 17580...');
    try {
      const reading = await GlucoseSniffer.sniffLocalPort();

      if (reading) {
        setLastReading(reading);
        addLog(`DATA FOUND: ${reading.sgv} mg/dL. Uploading...`);

        await SupabaseService.pushGlucose(reading);
        addLog('SUCCESS: Data live on Sovereign Stack.');
      } else {
        addLog('Loophole: No broadcast detected.');
      }
    } catch (err: any) {
      addLog(`ERROR: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', backgroundColor: '#121212', color: '#00ff00', minHeight: '100vh' }}>
      <h1 className="text-xl font-bold mb-4">BIO-UPLINK v1.0</h1>

      {/* STATUS PANEL */}
      <div style={{ border: '1px solid #333', padding: '10px', marginBottom: '20px' }}>
        <p>STATUS: {isSyncing ? '🟢 ACTIVE' : '🔴 PAUSED'}</p>
        <p>SOURCE: Health Connect</p>
        <p>DEST: Google Drive / Supabase</p>
        <p>CGM: {lastReading ? `${lastReading.sgv} (${lastReading.direction})` : 'WAITING'}</p>
      </div>

      {/* CONTROLS */}
      <button
        onClick={handleSyncToggle}
        style={{ padding: '15px', width: '100%', marginBottom: '10px', backgroundColor: isSyncing ? '#333' : '#00ff00', color: isSyncing ? '#fff' : '#000', border: 'none', fontWeight: 'bold' }}>
        {isSyncing ? 'STOP SYNC' : 'ACTIVATE SYNC'}
      </button>

      <button
        onClick={runSniffCycle}
        style={{ padding: '10px', width: '100%', marginBottom: '10px', backgroundColor: '#333', color: '#fff', border: '1px solid #555' }}>
        SNIFF LOCAL PORT (17580)
      </button>

      <button
        onClick={handleManualTrigger}
        style={{ padding: '10px', width: '100%', marginBottom: '10px', backgroundColor: '#333', color: '#fff', border: '1px solid #555' }}>
        MANUAL PUSH (DEBUG)
      </button>

      <button
        onClick={handleAskAlexis}
        style={{ padding: '10px', width: '100%', marginBottom: '20px', backgroundColor: '#222', color: '#00ccff', border: '1px solid #00ccff' }}>
        PING CORTEX (AI CHECK)
      </button>

      {/* AI OUTPUT */}
      {aiResponse && (
        <div style={{ border: '1px solid #00ccff', padding: '10px', marginBottom: '20px', color: '#fff' }}>
          <strong>ALEXIS:</strong> {aiResponse}
        </div>
      )}

      {/* LOG TERMINAL */}
      <div style={{ backgroundColor: '#000', padding: '10px', height: '200px', overflowY: 'scroll', border: '1px solid #333', fontSize: '12px' }}>
        {logs.map((log, i) => (
          <div key={i} style={{ borderBottom: '1px solid #222', padding: '2px 0' }}>{`> ${log}`}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
