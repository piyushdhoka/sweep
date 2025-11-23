import React from 'react';
import { View } from '../types';
import { Github, Sparkles } from 'lucide-react';
import { GITHUB_URL, PACKAGE_NAME } from '../constants';

interface NavbarProps {
  currentView: View;
  onChangeView: (view: View) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView }) => {
  return (
    <div className="fixed top-8 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto glass-panel rounded-full pl-5 pr-2 py-2 flex items-center gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/10 bg-clay-950/60">
        
        {/* Logo */}
        <div 
          onClick={() => onChangeView(View.LANDING)}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <Sparkles className="w-4 h-4 text-accent transition-transform duration-500 group-hover:rotate-180" />
          <span className="font-serif font-medium text-lg tracking-tight text-white group-hover:text-accent-light transition-colors">
            {PACKAGE_NAME}
          </span>
        </div>

        {/* Separator */}
        <div className="w-px h-4 bg-white/10"></div>

        {/* Links */}
        <div className="flex items-center gap-1">
          <button 
            onClick={() => onChangeView(View.LANDING)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
              currentView === View.LANDING 
                ? 'bg-white/10 text-white shadow-inner' 
                : 'text-clay-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Home
          </button>
          <button 
            onClick={() => onChangeView(View.DOCS)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
              currentView === View.DOCS 
                ? 'bg-white/10 text-white shadow-inner' 
                : 'text-clay-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Docs
          </button>
        </div>

        <a 
          href={GITHUB_URL} 
          target="_blank" 
          rel="noreferrer"
          className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-white text-clay-950 hover:bg-accent hover:text-white transition-colors duration-300"
          aria-label="GitHub"
        >
          <Github className="w-4 h-4" />
        </a>
      </nav>
    </div>
  );
};

export default Navbar;