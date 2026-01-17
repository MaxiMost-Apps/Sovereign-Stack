import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CoreLayout } from './core/CoreLayout';
import { StoicQuote } from './pages/tools/StoicQuote';

function App() {
  return (
    <Router>
      <CoreLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/mirror" replace />} />
          <Route path="/mirror" element={<StoicQuote />} />
          <Route path="/path" element={<div className="text-center mt-20 text-muted font-sans text-sm">PATHWAY UNFOLDING...</div>} />
          <Route path="/stories" element={<div className="text-center mt-20 text-muted font-sans text-sm">ARCHIVES CLOSED</div>} />
          <Route path="/foundation" element={<div className="text-center mt-20 text-muted font-sans text-sm">BUILDING LEGACY</div>} />
        </Routes>
      </CoreLayout>
    </Router>
  );
}

export default App;
