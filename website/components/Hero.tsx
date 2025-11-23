import React, { useState } from 'react';
import { Copy, Check, ArrowRight, ChevronRight, Zap } from 'lucide-react';
import { INSTALL_CMD } from '../constants';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-accent/10 via-transparent to-transparent blur-[100px] opacity-30"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Version Pill */}
        <div className="animate-fade-up opacity-0 mb-8" style={{ animationDelay: '0.1s' }}>
          <a href="https://www.npmjs.com/package/sweepp" target="_blank" rel="noreferrer" className="group bg-surface-highlight/30 backdrop-blur-md hover:bg-surface-highlight/50 border border-white/10 rounded-full pl-1 pr-4 py-1 flex items-center gap-3 transition-all duration-300 hover:border-accent/30 cursor-pointer">
            <span className="bg-accent/10 text-accent text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-accent/20">v2.0.0</span>
            <span className="text-sm text-clay-300 group-hover:text-clay-100 transition-colors font-sans">Major release is out</span>
            <ChevronRight className="w-3.5 h-3.5 text-clay-500 group-hover:text-accent transition-colors" />
          </a>
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-normal tracking-tight text-clay-100 mb-6 leading-[0.95] animate-fade-up opacity-0 drop-shadow-2xl" style={{ animationDelay: '0.2s' }}>
          Purify your <br />
          <span className="italic text-clay-200 opacity-80 bg-gradient-to-b from-white to-clay-400 bg-clip-text text-transparent">codebase.</span>
        </h1>

        {/* Description */}
        <p className="animate-fade-up opacity-0 max-w-2xl mx-auto text-lg md:text-xl text-clay-400 mb-10 leading-relaxed font-light tracking-wide antialiased" style={{ animationDelay: '0.3s' }}>
          The zero-config CLI that sweeps away unused imports and dead code.
          Keep your bundle light, your repository clean, and your sanity intact.
        </p>

        {/* Actions */}
        <div className="animate-fade-up opacity-0 flex flex-col sm:flex-row items-center gap-4 w-full justify-center" style={{ animationDelay: '0.4s' }}>
          
          {/* Primary Button */}
          <button 
            onClick={onGetStarted}
            className="group relative h-12 pl-6 pr-5 rounded-xl bg-clay-200 text-clay-950 font-medium text-[15px] transition-all duration-300 hover:bg-white hover:scale-[1.02] flex items-center gap-2 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_25px_rgba(228,224,221,0.25)]"
          >
             <span className="relative z-10">Get Started</span>
             <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* Command Button */}
          <div 
            onClick={handleCopy}
            className="group relative h-12 pl-5 pr-4 rounded-xl bg-surface-card/50 border border-white/5 hover:border-accent/30 hover:bg-surface-highlight/50 flex items-center gap-4 cursor-pointer transition-all duration-300 backdrop-blur-sm active:scale-[0.98] w-full sm:w-auto justify-between sm:justify-start"
          >
            <div className="flex items-center gap-2.5 font-mono text-[13px] text-clay-400 group-hover:text-clay-200 transition-colors">
              <span className="text-accent/70 select-none">$</span>
              <span>{INSTALL_CMD}</span>
            </div>
            
            <div className="hidden sm:block w-px h-4 bg-white/5 mx-1"></div>

            <div className="relative w-4 h-4 flex items-center justify-center text-clay-500 group-hover:text-clay-300 transition-colors">
               {copied ? (
                  <Check className="absolute inset-0 w-3.5 h-3.5 text-accent animate-fade-up" />
               ) : (
                  <Copy className="absolute inset-0 w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
               )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;