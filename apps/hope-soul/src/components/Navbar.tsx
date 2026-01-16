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

        <div className="flex items-center space-x-6">
          <Link href="/dashboard">
            <a className="text-sm font-medium hover:text-primary transition-colors">Dashboard</a>
          </Link>
          <button className="bg-foreground text-background px-4 py-2 rounded-sm text-sm font-medium hover:bg-neutral-800 transition-colors">
            Connect
          </button>
        </div>
      </div>
    </nav>
  );
};
