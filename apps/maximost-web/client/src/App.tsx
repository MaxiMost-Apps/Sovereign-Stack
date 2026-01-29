import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/components/auth/AuthSystem';
import { ToastProvider } from '@/components/ui/Toast';
import { AIProvider } from '@/context/AIContext';
import { LensProvider } from '@/context/LensContext';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import LibraryPage from '@/pages/LibraryPage';
import AccountabilityMirror from '@/pages/mirror';
import { LandingPage } from '@/pages/Landing';
import Preferences from '@/pages/Preferences';
import AccessDenied from '@/components/ui/AccessDenied';
import CoreLayout from '@/components/layout/CoreLayout';

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
        <LensProvider>
        <AIProvider>
          <Router>
            <Routes>
              {/* PUBLIC */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/signup" element={<Navigate to="/login" replace />} />

              {/* PUBLIC CAMPAIGN ROUTES */}
              <Route path="/mirror" element={<AccountabilityMirror />} />

              {/* PROTECTED */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/archive" element={<LibraryPage />} />
                <Route path="/preferences" element={<Preferences />} />
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
        </LensProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
// DEPLOY TRIGGER: 1768456000
