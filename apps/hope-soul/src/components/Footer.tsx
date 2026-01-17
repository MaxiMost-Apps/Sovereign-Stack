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
                <a href="#" className="hover:text-primary transition-colors">Stories</a>
                <a href="#" className="hover:text-primary transition-colors">The Foundation</a>
                <a href="#" className="hover:text-primary transition-colors">The Mirror</a>
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
