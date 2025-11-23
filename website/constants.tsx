import React from 'react';
import { DocSection } from './types';
import { Zap, Trash2, Box, Layers, Terminal, Sparkles, FileCode, ShieldCheck } from 'lucide-react';

export const PACKAGE_NAME = 'sweepp';
export const INSTALL_CMD = 'npm install -g sweepp';
export const GITHUB_URL = 'https://github.com/piyushdhoka/sweep';

export const FEATURES = [
  {
    id: 'zero-config',
    title: 'Zero Config',
    description: 'Run instantly on any JS/TS project. No configuration files required to get started.',
    icon: <Zap className="w-6 h-6 text-accent" />,
    colSpan: 'md:col-span-2',
  },
  {
    id: 'safe-clean',
    title: 'Safe Cleanup',
    description: 'Uses AST parsing (Babel) to accurately identify and remove unused imports without breaking side-effects.',
    icon: <ShieldCheck className="w-6 h-6 text-clay-200" />,
    colSpan: 'md:col-span-1',
  },
  {
    id: 'dead-code',
    title: 'Dead Code Detection',
    description: 'Finds unused functions, classes, variables, and types to keep your bundle size minimal.',
    icon: <FileCode className="w-6 h-6 text-accent-light" />,
    colSpan: 'md:col-span-1',
  },
  {
    id: 'monorepo-ready',
    title: 'Monorepo Ready',
    description: 'First-class support for Turborepo, pnpm workspaces, and yarn workspaces with path alias resolution.',
    icon: <Layers className="w-6 h-6 text-white" />,
    colSpan: 'md:col-span-2',
  },
];

export const DOCS_DATA: DocSection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: (
      <div className="space-y-8">
        <p className="text-xl md:text-2xl text-clay-200 font-serif italic leading-relaxed opacity-90">
          Codebases grow. <span className="text-accent decoration-accent/30 underline decoration-1 underline-offset-4">Cruft shouldn't</span>.
        </p>
        <p className="text-lg text-clay-400 leading-relaxed font-light">
          <strong className="text-white font-semibold">sweepp</strong> is a fast, zero-config CLI tool designed to keep your JavaScript and TypeScript projects clean. 
          It analyzes your AST to safely list and remove unused imports and detect dead code, supporting everything from single files to complex monorepos.
        </p>
        
        {/* Aesthetic "Latest Release" Badge */}
        <div className="inline-flex items-center gap-4 p-1.5 pr-5 bg-surface-highlight/50 backdrop-blur-md border border-white/5 rounded-full shadow-lg hover:border-accent/20 transition-colors cursor-default group">
           <div className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-card border border-white/10 group-hover:border-accent/30 transition-colors">
              <Sparkles className="w-4 h-4 text-accent" />
           </div>
           <div className="flex flex-col">
              <span className="text-[10px] font-bold text-clay-500 uppercase tracking-widest leading-none mb-1">Latest Release</span>
              <span className="text-sm font-mono text-clay-200 leading-none">v2.0.0</span>
           </div>
           <div className="ml-2 w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)] animate-pulse"></div>
        </div>
      </div>
    ),
  },
  {
    id: 'installation',
    title: 'Installation',
    content: (
      <div className="space-y-8">
        <p>The minimum supported version of Node.js is <strong>v18</strong>.</p>
        
        <div className="grid gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-clay-500 uppercase tracking-wider">NPM / Yarn / PNPM</span>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 blur rounded-xl"></div>
              <div className="relative flex items-center justify-between bg-[#0E0D0C] p-5 rounded-xl border border-white/5 font-mono text-sm text-clay-200 shadow-xl">
                <span className="flex gap-3">
                  <span className="text-clay-600 select-none">$</span>
                  npm install -g sweepp
                </span>
                <Terminal className="w-4 h-4 text-clay-600" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-clay-500 uppercase tracking-wider">Homebrew (macOS/Linux)</span>
            <div className="relative group">
               <div className="relative flex flex-col justify-center bg-[#0E0D0C] p-5 rounded-xl border border-white/5 font-mono text-sm text-clay-200 shadow-xl hover:border-white/10 transition-colors gap-2">
                <span className="flex gap-3">
                  <span className="text-clay-600 select-none">$</span>
                  brew tap piyushdhoka/sweep
                </span>
                <span className="flex gap-3">
                  <span className="text-clay-600 select-none">$</span>
                  brew install sweepp
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'usage',
    title: 'Usage',
    content: (
      <div className="space-y-10">
        <p>
          Sweep exposes a simple CLI with three main modes: <code className="text-accent">list</code>, <code className="text-accent">clean</code>, and <code className="text-accent">unuse</code>.
        </p>
        
        <div className="space-y-8">
          
          {/* List Section */}
          <div>
            <h3 className="text-white text-lg font-medium mb-4">List Unused Imports</h3>
            <pre className="!mt-0 !bg-[#0E0D0C] !p-0 !border-0 overflow-hidden rounded-2xl shadow-2xl">
              <div className="flex items-center gap-1.5 px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30"></div>
              </div>
              <div className="p-6 overflow-x-auto">
                <code className="text-sm font-mono leading-relaxed">
                  <span className="text-clay-500"># Scan current directory</span><br/>
                  <span className="text-accent">sweepp</span> list .<br/>
                  <br/>
                  <span className="text-clay-500"># With options</span><br/>
                  <span className="text-accent">sweepp</span> list . --ext ts,tsx --ignore dist
                </code>
              </div>
            </pre>
          </div>

          {/* Clean Section */}
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Clean Imports</h3>
            <pre className="!mt-0 !bg-[#0E0D0C] !p-0 !border-0 overflow-hidden rounded-2xl shadow-2xl">
              <div className="p-6 overflow-x-auto">
                <code className="text-sm font-mono leading-relaxed">
                  <span className="text-clay-500"># Remove unused imports automatically</span><br/>
                  <span className="text-accent">sweepp</span> clean
                </code>
              </div>
            </pre>
          </div>

          {/* Unuse Section */}
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Detect Dead Code</h3>
            <pre className="!mt-0 !bg-[#0E0D0C] !p-0 !border-0 overflow-hidden rounded-2xl shadow-2xl">
              <div className="p-6 overflow-x-auto">
                <code className="text-sm font-mono leading-relaxed">
                  <span className="text-clay-500"># Find unused variables, functions, and classes</span><br/>
                  <span className="text-accent">sweepp</span> unuse
                </code>
              </div>
            </pre>
          </div>

        </div>
      </div>
    ),
  },
  {
    id: 'options',
    title: 'Options',
    content: (
      <div className="space-y-8">
        <p>Customize the behavior of the sweeper.</p>
        
        <div className="grid gap-4">
          <div className="p-5 rounded-xl bg-surface-card border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
               <code className="text-accent text-sm font-bold bg-transparent border-0 p-0">--ext &lt;list&gt;</code>
               <span className="hidden md:block h-px flex-1 bg-white/5"></span>
            </div>
            <p className="text-sm text-clay-400 mb-2">Comma-separated file extensions to include.</p>
            <div className="text-xs font-mono text-clay-600">Default: ts,tsx,js,jsx</div>
          </div>

          <div className="p-5 rounded-xl bg-surface-card border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
               <code className="text-accent text-sm font-bold bg-transparent border-0 p-0">--ignore &lt;list&gt;</code>
               <span className="hidden md:block h-px flex-1 bg-white/5"></span>
            </div>
            <p className="text-sm text-clay-400 mb-2">Comma-separated directories to ignore.</p>
            <div className="text-xs font-mono text-clay-600">Default: node_modules</div>
          </div>

          <div className="p-5 rounded-xl bg-surface-card border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
               <code className="text-accent text-sm font-bold bg-transparent border-0 p-0">--check-local</code>
               <span className="hidden md:block h-px flex-1 bg-white/5"></span>
            </div>
            <p className="text-sm text-clay-400">Check if local imports exist in project. Supports path aliases from tsconfig.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'faq',
    title: 'Troubleshooting & FAQ',
    content: (
      <div className="space-y-12">
        <div className="space-y-8">
          
          <div className="group">
            <h3 className="flex items-center gap-3 !mt-0 !mb-4 text-white group-hover:text-accent transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-clay-600 group-hover:bg-accent transition-colors"></span>
              No unused imports detected?
            </h3>
            <p className="pl-5 border-l border-white/5">
              Ensure your file extensions match the default list (ts, tsx, js, jsx) or use the <code className="text-accent">--ext</code> flag. 
              Also check that your files aren't in an ignored directory.
            </p>
          </div>

          <div className="group">
            <h3 className="flex items-center gap-3 !mt-0 !mb-4 text-white group-hover:text-accent transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-clay-600 group-hover:bg-accent transition-colors"></span>
              Output includes system folders?
            </h3>
            <p className="pl-5 border-l border-white/5">
               Use the <code className="text-accent">--ignore</code> option to add specific folders to the exclusion list. 
               By default, only node_modules is ignored.
            </p>
          </div>

          <div className="group">
            <h3 className="flex items-center gap-3 !mt-0 !mb-4 text-white group-hover:text-accent transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-clay-600 group-hover:bg-accent transition-colors"></span>
              How does it handle Monorepos?
            </h3>
            <p className="pl-5 border-l border-white/5">
              sweepp automatically detects workspace configurations (pnpm, yarn, turbo) and resolves aliases defined in <code className="text-accent">tsconfig.json</code>. 
              It treats <code>workspace:*</code> dependencies correctly.
            </p>
          </div>

          <div className="group">
            <h3 className="flex items-center gap-3 !mt-0 !mb-4 text-white group-hover:text-accent transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-clay-600 group-hover:bg-accent transition-colors"></span>
              Is it safe to run clean?
            </h3>
            <p className="pl-5 border-l border-white/5">
              Yes. It uses safe AST transformation. However, side-effect imports (e.g., <code className="text-accent">import 'polyfill'</code>) are preserved. 
              Dynamic usage might sometimes evade detection, so we recommend committing your changes before running <code className="text-accent">clean</code>.
            </p>
          </div>

        </div>
      </div>
    ),
  },
];