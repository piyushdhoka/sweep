import React, { useState } from 'react';
import { DOCS_DATA } from '../constants';
import { ChevronRight } from 'lucide-react';

const Documentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState(DOCS_DATA[0].id);
  const activeContent = DOCS_DATA.find(d => d.id === activeSection);

  return (
    <div className="min-h-screen pt-28 pb-24 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row gap-12 xl:gap-24">
      
      {/* Sidebar Navigation */}
      <aside className="hidden md:block w-64 flex-shrink-0">
        <div className="sticky top-32">
          <h2 className="text-xs font-bold text-clay-500 uppercase tracking-widest mb-6 px-3">
            Contents
          </h2>
          <nav className="space-y-1">
            {DOCS_DATA.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setActiveSection(doc.id)}
                className={`group w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center justify-between ${
                  activeSection === doc.id 
                    ? 'bg-surface-highlight text-clay-100 font-medium shadow-[0_1px_2px_rgba(0,0,0,0.2)] border border-white/5' 
                    : 'text-clay-400 hover:text-clay-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <span>{doc.title}</span>
                {activeSection === doc.id && (
                    <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(217,119,87,0.6)]"></div>
                )}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Selector */}
      <div className="md:hidden">
        <div className="relative">
          <select 
            value={activeSection} 
            onChange={(e) => setActiveSection(e.target.value)}
            className="w-full appearance-none bg-surface-card border border-white/10 rounded-xl px-4 py-3 text-clay-200 focus:outline-none focus:border-accent/50 transition-colors"
          >
             {DOCS_DATA.map(doc => <option key={doc.id} value={doc.id}>{doc.title}</option>)}
          </select>
          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-clay-500 rotate-90 pointer-events-none" />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0">
        {activeContent && (
          <div className="animate-fade-up max-w-3xl mx-auto md:mx-0" key={activeContent.id}>
            
            {/* Breadcrumb & Header */}
            <header className="mb-12">
              <div className="flex items-center gap-2 text-xs font-mono text-accent/80 mb-6 tracking-wider uppercase opacity-80">
                <span>Docs</span>
                <ChevronRight className="w-3 h-3 text-clay-600" />
                <span>{activeContent.title}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-clay-100 tracking-tight leading-tight">
                {activeContent.title}
              </h1>
            </header>
            
            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent mb-10"></div>
            
            {/* Content Rendering Wrapper */}
            <div className="prose prose-invert prose-clay max-w-none">
              <div className="
                [&_p]:text-clay-400 [&_p]:leading-8 [&_p]:mb-8 [&_p]:text-lg [&_p]:font-light
                [&_h3]:text-white [&_h3]:font-serif [&_h3]:text-2xl [&_h3]:mt-16 [&_h3]:mb-6 [&_h3]:font-normal
                [&_strong]:text-clay-100 [&_strong]:font-medium
                [&_code]:bg-surface-highlight [&_code]:border [&_code]:border-white/5 [&_code]:rounded-md [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.9em] [&_code]:font-mono [&_code]:text-accent/90
                [&_pre]:bg-[#0E0D0C] [&_pre]:border [&_pre]:border-white/5 [&_pre]:rounded-2xl [&_pre]:p-6 [&_pre]:shadow-2xl [&_pre]:my-8 [&_pre]:overflow-x-auto
                [&_li]:text-clay-400 [&_li]:mb-3 [&_li]:leading-7
                [&_ul]:list-none [&_ul]:pl-0
              ">
                 {activeContent.content}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Documentation;