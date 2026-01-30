import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CoreLayout } from './core/CoreLayout';
import { IntelDashboard } from './pages/IntelDashboard';
import { VaultPage } from './pages/VaultPage';
import { ZoneTwoCalculator } from './pages/tools/ZoneTwoCalculator';

function App() {
  return (
    <Router>
      <CoreLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<IntelDashboard />} />
          <Route path="/vault" element={<VaultPage />} />
          <Route path="/tools/zone2" element={<ZoneTwoCalculator />} />
        </Routes>
      </CoreLayout>
    </Router>
  );
}

export default App;
