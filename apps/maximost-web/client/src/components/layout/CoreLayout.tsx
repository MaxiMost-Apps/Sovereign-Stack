import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export const CoreLayout = () => {
  return (
    <div className="flex h-screen bg-[#020408] text-slate-200 overflow-hidden">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Scrollable Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="min-h-full">
           <Outlet />
        </div>
      </main>
    </div>
  );
};
