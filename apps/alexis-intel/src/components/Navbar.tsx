import React from 'react';
import { Link, useLocation } from "wouter";
import { Brain, FileText, Map, Shield } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();

  const links = [
    { name: "The Vault", href: "/vault", icon: Brain },
    { name: "Intelligence", href: "/intelligence", icon: FileText },
    { name: "Field Guide", href: "/field-guide", icon: Map },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/">
              <a className="flex items-center gap-2">
                <Shield className="w-8 h-8 text-primary" />
                <span className="font-serif text-2xl tracking-wider text-white">ALEXIS INTEL</span>
              </a>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {links.map((link) => (
                <Link key={link.name} href={link.href}>
                  <a className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location === link.href
                      ? "text-primary bg-white/5"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}>
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Access Network
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
