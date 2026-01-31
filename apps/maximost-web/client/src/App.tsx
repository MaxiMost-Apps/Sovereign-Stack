import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CoreLayout } from '@/components/layout/CoreLayout';
import { Dashboard } from '@/pages/Dashboard';
import LibraryPage from '@/pages/LibraryPage';
import PreferencesPage from '@/pages/PreferencesPage';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Main Layout Wrapper */}
          <Route element={<CoreLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/preferences" element={<PreferencesPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster theme="dark" position="bottom-right" />
    </>
  );
}
