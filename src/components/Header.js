import React from 'react';
import { Wind } from 'lucide-react';

function Header() {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Wind className="h-8 w-8 text-amber-500" />
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Paragliding Weather Checker
          </h1>
        </div>
      </div>
    </header>
  );
}

export default Header;