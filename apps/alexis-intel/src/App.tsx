import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CoreLayout } from './core/CoreLayout';
import { IntelDashboard } from './pages/IntelDashboard';
import { VaultPage } from './pages/VaultPage';

function App() {
  return (
    <Router>
      <CoreLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<IntelDashboard />} />
          <Route path="/vault" element={<VaultPage />} />
        </Routes>
      </CoreLayout>
    </Router>
  );
}

export default App;
