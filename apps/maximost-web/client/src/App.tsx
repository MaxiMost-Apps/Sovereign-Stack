import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './core/AuthSystem';
import { ToastProvider } from './core/components/Toast';
import { AIProvider } from './core/context/AIContext';
import DashboardCore from './core/DashboardCore';
import LoginCore from './core/LoginCore'; // Mapped from LoginPage
import AdminConsole from './core/admin/AdminConsoleV2';
import LibraryPage from './core/pages/LibraryPage';
import AIWarRoomPage from './core/pages/AIWarRoomPage';
import TheMirror from './core/pages/TheMirror';
import TheArchitect from './core/pages/TheArchitect';
import BioTelemetryPage from './core/pages/BioTelemetryPage';
import { LandingPage } from './core/pages/LandingPage';
import ManifestoPage from './core/pages/ManifestoPage';
import { LegalPage } from './core/pages/LegalPage';
import VaultPage from './core/pages/VaultPage';
import PreferencesPage from './core/pages/PreferencesPage';
import { ProtocolsPage } from './core/pages/ProtocolsPage';
import ProgressPage from './core/pages/ProgressPage';
import LexiconPage from './core/pages/LexiconPage';
import AccessDenied from './core/components/ui/AccessDenied';
import CoreLayout from './core/CoreLayout'; // Import CoreLayout

// Protected Route Wrapper - NOW WRAPS EVERYTHING IN CORELAYOUT
const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-[#0B1121] text-white flex items-center justify-center">Loading OS...</div>;
  if (!user) return <Navigate to="/login" replace />;

  // Wrap Outlet in CoreLayout for persistent Sidebar
  return (
    <CoreLayout>
      <Outlet />
    </CoreLayout>
  );
};

// Public Route Wrapper (redirects to dashboard if logged in)
const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
};

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AIProvider>
          <Router>
            <Routes>
              {/* PUBLIC */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/manifesto" element={<ManifestoPage />} />
              <Route path="/lexicon" element={<LexiconPage />} /> {/* SEO Root Route */}
              <Route path="/login" element={<PublicRoute><LoginCore /></PublicRoute>} />
              <Route path="/signup" element={<Navigate to="/login" replace />} />
              <Route path="/privacy" element={<LegalPage title="Privacy Protocol" content={`1. Data Sovereignty: You own your data. We do not sell it.\n2. Encryption: All biometric data is encrypted at rest.\n3. Deletion: You may nuke your account at any time.`} />} />
              <Route path="/terms" element={<LegalPage title="Terms of Service" content={`1. The Code: Maximost is a tool for self-mastery. Use it responsibly.\n2. Liability: We are not doctors. Do not use this for medical diagnosis.`} />} />
              <Route path="/support" element={<LegalPage title="Support Frequency" content={`Contact the command center at: support@maximost.com\n\nExpected response time: 24-48 hours.`} />} />

              {/* PROTECTED */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardCore />} />
                <Route path="/archive" element={<LibraryPage />} />
                <Route path="/body-hud" element={<BioTelemetryPage />} />
                <Route path="/coach" element={<AIWarRoomPage />} />
                <Route path="/mirror" element={<TheMirror />} />
                <Route path="/architect" element={<TheArchitect />} />
                <Route path="/admin" element={<AdminConsole />} />
                <Route path="/admin/diagnostics" element={<AdminConsole />} />

                {/* Tools Sub-routes */}
                <Route path="/tools/lexicon" element={<LexiconPage />} />

                {/* Secondary/Utility Routes */}
                <Route path="/vault" element={<VaultPage />} />
                <Route path="/preferences" element={<PreferencesPage />} />
                <Route path="/stacks" element={<ProtocolsPage />} />
                <Route path="/ledger" element={<ProgressPage />} />
                <Route path="/body" element={<BioTelemetryPage />} /> {/* Legacy mapping */}
                <Route path="/journal" element={<Navigate to="/coach" replace />} /> {/* Redirect Journal to Coach/WarRoom? Or keep if exists. Mapping to WarRoom based on Sidebar */}
                <Route path="/progress" element={<ProgressPage />} />

                {/* Fallback for access denied or unknown protected routes if needed,
                    but * acts as global fallback.
                    If we want specific AccessDenied route: */}
                <Route path="/access-denied" element={<AccessDenied />} />
              </Route>

              {/* 404 / Catch-all -> Redirect to Dashboard (which handles auth) or AccessDenied?
                  User said: "App-Style Redirects... rather than a generic 404".
                  If logged in, * goes to Dashboard. If not, Landing/Login.
                  Let's keep * -> Dashboard.
              */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Router>
        </AIProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
// DEPLOY TRIGGER: 1768454937
