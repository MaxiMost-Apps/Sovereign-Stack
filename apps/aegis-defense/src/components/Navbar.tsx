import React from 'react';
import { Link, useLocation } from "wouter";
import { Shield, Sword, Lock } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();

  const links = [
    { name: "Defense", href: "/defense", icon: Shield },
    { name: "Protocols", href: "/protocols", icon: Lock },
    { name: "Armory", href: "/armory", icon: Sword },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/">
              <a className="flex items-center gap-2">
                <Shield className="w-8 h-8 text-primary" />
                <span className="font-serif text-2xl tracking-wider text-white">AEGIS DEFENSE</span>
              </a>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {links.map((link) => (
                <Link key={link.name} href={link.href}>
                  <a className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location === link.href
                      ? "text-primary bg-primary/10"
                      : "text-gray-400 hover:text-primary hover:bg-primary/5"
                  }`}>
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <button className="bg-primary hover:bg-primary/90 text-black px-4 py-2 rounded-md text-sm font-bold transition-colors">
              Secure Comms
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
