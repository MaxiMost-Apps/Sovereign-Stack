import React from 'react';
import { Shield, Lock, Eye, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 border-t border-primary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* COMMAND */}
          <div className="space-y-4">
            <h3 className="flex items-center space-x-2 text-primary font-bold uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              <span>Command</span>
            </h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-primary transition-colors">Protocol Status</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Directive 4</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Vanguard Log</a></li>
            </ul>
          </div>

          {/* INTEL */}
          <div className="space-y-4">
            <h3 className="flex items-center space-x-2 text-primary font-bold uppercase tracking-wider">
              <Eye className="w-4 h-4" />
              <span>Intel</span>
            </h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-primary transition-colors">Alexis AI</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Data Vault</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shadow Audit</a></li>
            </ul>
          </div>

          {/* DEFENSE */}
          <div className="space-y-4">
            <h3 className="flex items-center space-x-2 text-primary font-bold uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>Defense</span>
            </h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-primary transition-colors">Aegis Shield</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Threat Map</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Recovery Ops</a></li>
            </ul>
          </div>

          {/* SOUL */}
          <div className="space-y-4">
            <h3 className="flex items-center space-x-2 text-primary font-bold uppercase tracking-wider">
              <Heart className="w-4 h-4" />
              <span>Soul</span>
            </h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-primary transition-colors">Hope Vision</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Scholarship Fund</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Founding 500</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500">
          <div className="mb-4 md:mb-0">
            <p>MAXIMOST LLC</p>
            <p>PO BOX 42, PAINESVILLE, OH 44077</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-primary">PRIVACY</a>
            <a href="#" className="hover:text-primary">TERMS</a>
            <a href="#" className="hover:text-primary">CONTACT</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
