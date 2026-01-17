import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CoreLayout } from './core/CoreLayout';
import { DopamineDetox } from './pages/tools/DopamineDetox';

function App() {
  return (
    <Router>
      <CoreLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/tools" replace />} />
          <Route path="/tools" element={<DopamineDetox />} />
          <Route path="/guides" element={<div className="text-center mt-20 text-primary">CLASSIFIED</div>} />
          <Route path="/protocols" element={<div className="text-center mt-20 text-primary">ENCRYPTED</div>} />
          <Route path="/lab" element={<div className="text-center mt-20 text-primary">RESTRICTED</div>} />
        </Routes>
      </CoreLayout>
    </Router>
  );
}

export default App;
