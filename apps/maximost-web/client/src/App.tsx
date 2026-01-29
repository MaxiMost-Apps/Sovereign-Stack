import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CoreLayout } from '@/components/layout/CoreLayout';
import { AuthSystem } from '@/components/auth/AuthSystem';
import Dashboard from '@/pages/Dashboard';
import Preferences from '@/pages/Preferences';
import LibraryPage from '@/pages/LibraryPage';

export default function App() {
  return (
    <BrowserRouter>
      <CoreLayout>
        <AuthSystem>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthSystem>
      </CoreLayout>
    </BrowserRouter>
  );
}
