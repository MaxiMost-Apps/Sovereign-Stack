import React from 'react';
import { Feather } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-neutral-50 text-neutral-600 py-12 border-t border-neutral-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <Feather className="w-5 h-5 text-primary" />
                <span className="font-serif font-bold tracking-tight text-lg text-foreground">HOPE SOUL</span>
            </div>
            <div className="flex space-x-8 text-sm">
                <a href="#" className="hover:text-primary transition-colors">The Path</a>
                <a href="/manifesto" className="hover:text-primary transition-colors">Manifesto</a>
                <a href="#" className="hover:text-primary transition-colors">The Foundation</a>
                <a href="#" className="hover:text-primary transition-colors">The Mirror</a>
            </div>
        </div>

        {/* Shared Labs Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-t border-neutral-200">
             <div>
                <h3 className="font-serif font-bold text-foreground mb-4">THE LABS</h3>
                <ul className="space-y-2 text-sm">
                    <li><a href="http://localhost:5173" className="hover:text-primary transition-colors">COMMAND</a></li>
                    <li><a href="http://localhost:5175" className="hover:text-primary transition-colors">INTEL (Alexis)</a></li>
                    <li><a href="http://localhost:5176" className="hover:text-primary transition-colors">DEFENSE (Aegis)</a></li>
                    <li><a href="http://localhost:5174" className="text-primary font-bold">SOUL (Hope)</a></li>
                </ul>
             </div>
             <div>
                <h3 className="font-serif font-bold text-foreground mb-4">LOCATION</h3>
                <p className="text-sm">Painesville, OH</p>
                <p className="text-sm text-neutral-400">United States</p>
             </div>
             <div>
                 <h3 className="font-serif font-bold text-foreground mb-4">LEGAL</h3>
                 <p className="text-sm">MaxiMost LLC</p>
                 <p className="text-sm text-neutral-400">Authorized Personnel Only</p>
             </div>
        </div>

        <div className="border-t border-neutral-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-400">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} Hope Soul. All rights reserved.</p>
            <p className="mt-1">A MaxiMost Laboratory.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
