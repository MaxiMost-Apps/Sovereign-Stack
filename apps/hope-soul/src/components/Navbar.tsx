import React from 'react';
import { Link } from 'wouter';
import { Feather } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="w-full bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-neutral-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
            <Feather className="w-6 h-6 text-primary" />
            <span className="font-serif font-bold tracking-tight text-lg">HOPE SOUL</span>
          </a>
        </Link>

        {/* "Independent Authority" Navigation */}
        <div className="hidden md:flex items-center space-x-8">
            <Link href="/manifesto">
              <a className="text-sm font-medium text-neutral-600 hover:text-primary transition-colors">Manifesto</a>
            </Link>
            <a href="#" className="text-sm font-medium text-neutral-600 hover:text-primary transition-colors">The Path</a>
            <a href="#" className="text-sm font-medium text-neutral-600 hover:text-primary transition-colors">The Foundation</a>
            <a href="#" className="text-sm font-medium text-neutral-600 hover:text-primary transition-colors">The Mirror</a>
        </div>

        <div className="flex items-center space-x-6">
          <Link href="/dashboard">
            <button className="bg-foreground text-background px-4 py-2 rounded-sm text-sm font-medium hover:bg-neutral-800 transition-colors">
                Member Access
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
