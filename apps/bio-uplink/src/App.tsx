import { useState, useEffect } from 'react';
import { GlucoseSniffer, type GlucoseReading } from './services/GlucoseSniffer';
import { SyncEngine } from './services/SyncEngine';
import { FileWatcherService } from './services/FileWatcherService';
import { MetricTransformer } from './services/MetricTransformer';

function App() {
  const [logs, setLogs] = useState<string[]>(['Mule System Initialized...']);
  const [pendingCount, setPendingCount] = useState(0);
  const [lastPush, setLastPush] = useState<string>('--:--');
  const [lastReading, setLastReading] = useState<GlucoseReading | null>(null);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev.slice(0, 49)]); // Keep last 50
  };

  useEffect(() => {
    // Init Services
    const init = async () => {
        await SyncEngine.init();
        await FileWatcherService.init();
        updateVaultStats();
    };
    init();
  }, []);

  const updateVaultStats = async () => {
      const count = await SyncEngine.getPendingCount();
      setPendingCount(count);
      if (SyncEngine.lastPushTime) {
          setLastPush(SyncEngine.lastPushTime);
      }
  };

  const runSniffCycle = async () => {
    addLog('Sniffer: Scanning Port 17580...');
    try {
      const reading = await GlucoseSniffer.sniffLocalPort();

      if (reading) {
        setLastReading(reading);
        const metric = MetricTransformer.fromGlucose(reading);
        await SyncEngine.queueItem(metric);
        addLog(`GLUCOSE: ${reading.sgv} mg/dL -> Vaulted`);
        await updateVaultStats();
      } else {
        addLog('Sniffer: No broadcast found.');
      }
    } catch (err: any) {
      addLog(`Error: ${err.message}`);
    }
  };

  const runFileScan = async () => {
      addLog('Watcher: Scanning /Documents/Sovereign_Ingest...');
      const count = await FileWatcherService.scanAndIngest();
      if (count > 0) {
          addLog(`Watcher: Ingested ${count} files -> Vaulted`);
          await updateVaultStats();
      } else {
          addLog('Watcher: No new files.');
      }
  };

  const flushVault = async () => {
      addLog(`Sync: Flushing ${pendingCount} items to Cloud...`);
      const success = await SyncEngine.flushQueue();
      if (success > 0) {
          addLog(`Sync: ${success} items sent -> Health.Metrics`);
      } else {
          addLog('Sync: Vault empty or upload failed.');
      }
      await updateVaultStats();
  };

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-4 flex flex-col">
      <div className="flex justify-between items-center mb-6 border-b border-green-900 pb-2">
        <h1 className="text-2xl font-bold tracking-widest">MULE HUD v2.1</h1>
        <div className="text-xs text-gray-500">ID: SOVEREIGN-01</div>
      </div>

      {/* STATUS GRID */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border border-gray-800 p-4 rounded bg-gray-900/50">
            <div className="text-xs text-gray-400 mb-1">VAULT (PENDING)</div>
            <div className="text-4xl font-bold text-white">{pendingCount}</div>
            <div className="text-xs text-green-700 mt-1 flex justify-between">
                <span>SQLite</span>
                <span>Last Push: {lastPush}</span>
            </div>
        </div>
        <div className="border border-gray-800 p-4 rounded bg-gray-900/50">
            <div className="text-xs text-gray-400 mb-1">LATEST VITAL</div>
            <div className="text-2xl font-bold text-white">
                {lastReading ? `${lastReading.sgv} mg/dL` : '--'}
            </div>
            <div className="text-xs text-gray-500 mt-1">
                {lastReading ? lastReading.direction : 'Waiting...'}
            </div>
        </div>
      </div>

      {/* ACTION DECK */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button onClick={runSniffCycle} className="bg-gray-800 hover:bg-gray-700 p-3 text-xs rounded border border-gray-600">
            SCAN PORT 17580
        </button>
        <button onClick={runFileScan} className="bg-gray-800 hover:bg-gray-700 p-3 text-xs rounded border border-gray-600">
            SCAN FILES (/Ingest)
        </button>
        <button onClick={flushVault} className="col-span-2 bg-green-900 hover:bg-green-800 text-white p-4 font-bold rounded border border-green-700 tracking-wider">
            FORCE CLOUD SYNC
        </button>
      </div>

      {/* CONSOLE LOG */}
      <div className="flex-grow border border-gray-800 bg-black rounded p-2 overflow-hidden flex flex-col">
        <div className="text-xs text-gray-500 mb-2 border-b border-gray-900 pb-1">SYSTEM LOGS</div>
        <div className="overflow-y-auto flex-grow text-xs space-y-1 font-mono text-green-400/80">
            {logs.map((log, i) => (
                <div key={i} className="break-words">{log}</div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
