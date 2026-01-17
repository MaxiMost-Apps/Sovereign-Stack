import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CoreLayout } from './core/CoreLayout';
import { IntelDashboard } from './pages/IntelDashboard';
import { VaultPage } from './pages/VaultPage';
import { ResearchPage } from './pages/ResearchPage';
import { WearablesPage } from './pages/WearablesPage';

function App() {
  return (
    <Router>
      <CoreLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<IntelDashboard />} />
          <Route path="/vault" element={<VaultPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/wearables" element={<WearablesPage />} />
        </Routes>
      </CoreLayout>
    </Router>
  );
}

export default App;
