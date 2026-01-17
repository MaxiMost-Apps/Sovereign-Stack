
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-obsidian text-emerald-50 selection:bg-emerald-500/30 selection:text-emerald-200">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
