import React from 'react';
import { FEATURES } from '../constants';
import { ArrowUpRight, Layers } from 'lucide-react';

const Features: React.FC = () => {
  const renderDiagram = (id: string) => {
    switch (id) {
      case 'zero-config':
        return (
          <div className="w-64 h-32 bg-[#0E0D0C] border border-white/10 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-accent/20">
            <div className="h-6 bg-white/5 border-b border-white/5 flex items-center px-3 gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
              <div className="w-2 h-2 rounded-full bg-green-500/20"></div>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-clay-400">
                <span className="text-accent">$</span>
                <span className="animate-typing overflow-hidden whitespace-nowrap">sweepp list .</span>
              </div>
              <div className="space-y-1 pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                <div className="h-1.5 w-3/4 bg-white/10 rounded-full"></div>
                <div className="h-1.5 w-1/2 bg-accent/20 rounded-full"></div>
                <div className="h-1.5 w-5/6 bg-white/5 rounded-full"></div>
              </div>
            </div>
          </div>
        );
      case 'safe-clean':
        return (
          <div className="transition-all duration-500 group-hover:scale-110">
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" stroke="currentColor" className="text-white/10" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="50" cy="50" r="25" stroke="currentColor" className="text-accent/50" strokeWidth="1" />
              <path d="M35 50L45 60L65 40" stroke="currentColor" className="text-accent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* Particles */}
              <circle cx="20" cy="30" r="2" className="fill-clay-500 animate-pulse" />
              <circle cx="80" cy="70" r="2" className="fill-clay-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <circle cx="20" cy="70" r="2" className="fill-clay-500 animate-pulse" style={{ animationDelay: '1s' }} />
              <circle cx="80" cy="30" r="2" className="fill-clay-500 animate-pulse" style={{ animationDelay: '1.5s' }} />
            </svg>
          </div>
        );
      case 'dead-code':
        return (
          <div className="w-32 h-32 flex items-center justify-center transition-all duration-500 group-hover:scale-105">
            <div className="relative w-full h-full p-4 flex flex-col items-center justify-center gap-2">
                <div className="w-16 h-2 bg-white/20 rounded-sm"></div>
                <div className="w-24 h-2 bg-white/10 rounded-sm"></div>
                <div className="w-20 h-2 bg-white/10 rounded-sm"></div>
                <div className="w-12 h-2 bg-red-500/30 rounded-sm group-hover:bg-red-500/50 transition-colors animate-pulse"></div>
                <div className="w-16 h-2 bg-red-500/20 rounded-sm group-hover:bg-red-500/40 transition-colors"></div>
            </div>
          </div>
        );
      case 'monorepo-ready':
        return (
          <div className="flex items-center gap-4 transition-all duration-500 group-hover:scale-105">
             <div className="relative w-12 h-12 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center transform group-hover:-translate-x-2 transition-transform">
                <div className="w-6 h-6 border border-white/10 rounded bg-white/5"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
             </div>
             <div className="h-px w-8 bg-gradient-to-r from-white/20 to-white/5"></div>
             <div className="relative w-16 h-16 rounded-xl border border-accent/30 bg-accent/5 flex items-center justify-center shadow-[0_0_15px_rgba(217,119,87,0.1)] scale-110">
                <Layers className="w-8 h-8 text-accent opacity-80" />
             </div>
             <div className="h-px w-8 bg-gradient-to-l from-white/20 to-white/5"></div>
             <div className="relative w-12 h-12 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center transform group-hover:translate-x-2 transition-transform">
                <div className="w-6 h-6 border border-white/10 rounded bg-white/5"></div>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="mb-16 text-center md:text-left">
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">
            Engineered for <span className="italic text-accent">performance.</span>
          </h2>
          <p className="text-clay-400 max-w-lg text-lg">
            Built on the premise that maintainability should be effortless, not a chore.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {FEATURES.map((feature, index) => (
            <div 
              key={feature.id}
              className={`group relative p-8 rounded-3xl bg-surface-card border border-surface-border overflow-hidden transition-all duration-500 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5 flex flex-col justify-between ${feature.colSpan}`}
            >
              
              {/* Centered Diagram Container */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none">
                {renderDiagram(feature.id)}
              </div>

              {/* Animated Gradient Background on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(800px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(217,119,87,0.06),transparent)] pointer-events-none"></div>
              
              {/* Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

              {/* Header: Icon & Arrow */}
              <div className="relative z-10 flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-surface-highlight border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-500 ease-out shadow-lg">
                  {React.cloneElement(feature.icon as React.ReactElement<{ className?: string }>, { 
                    className: `w-6 h-6 transition-colors duration-300 ${feature.id === 'monorepo-ready' ? 'text-white' : 'text-clay-300 group-hover:text-accent'}` 
                  })}
                </div>
                <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75 bg-white/5 backdrop-blur-sm">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 mt-auto max-w-[90%]">
                <h3 className="font-serif text-2xl text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
                  {feature.title}
                </h3>
                <p className="text-clay-400 text-sm leading-relaxed group-hover:text-clay-200 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;