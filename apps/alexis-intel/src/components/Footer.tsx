import React from 'react';
import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-serif text-xl tracking-wider text-white">ALEXIS INTEL</span>
            </div>
            <p className="text-gray-400 max-w-sm">
              Operational intelligence for the sovereign individual.
              Analyze. Adapt. Overcome.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Protocol</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Methodology</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Manifesto</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Alexis Intel. A MaxiMost Laboratory.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Painesville, OH</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
