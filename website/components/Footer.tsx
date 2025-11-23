import React from 'react';
import { Github, Twitter, ArrowUpRight, Globe, Linkedin } from 'lucide-react';
import { PACKAGE_NAME, GITHUB_URL } from '../constants';

interface FooterProps {
  onOpenDocs: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenDocs }) => {
  return (
    <footer className="relative z-10 bg-clay-950 pt-32 pb-12 border-t border-white/5 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl text-clay-100 mb-6 tracking-tight">
                Ready to <span className="text-accent italic">sweep</span>?
              </h2>
              <p className="text-clay-400 text-lg leading-relaxed max-w-sm mb-8">
                The zero-config CLI for keeping your codebase clean, performant, and maintainable.
              </p>
              
              <div className="flex items-center gap-4">
                <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="group px-6 py-2.5 rounded-full bg-clay-100 text-clay-950 font-medium text-sm transition-all duration-300 hover:bg-white hover:scale-105 flex items-center gap-2">
                  <span>GitHub</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div>
              <h4 className="font-serif text-white mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-clay-400">
                <li>
                  <button 
                    onClick={onOpenDocs} 
                    className="hover:text-accent transition-colors block py-1 text-left"
                  >
                    Documentation
                  </button>
                </li>
                <li><a href="https://www.npmjs.com/package/sweepp" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors block py-1">NPM Package</a></li>
              </ul>
            </div>
            
            {/* Column 2 */}
            <div>
               <h4 className="font-serif text-white mb-6">Project</h4>
               <ul className="space-y-4 text-sm text-clay-400">
                <li><a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors block py-1">GitHub</a></li>
                <li><a href={`${GITHUB_URL}/issues`} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors block py-1">Issues</a></li>
               </ul>
            </div>

            {/* Column 3 */}
            <div>
               <h4 className="font-serif text-white mb-6">Connect</h4>
               <ul className="space-y-4 text-sm text-clay-400">
                <li><a href="https://x.com/piyush_dhoka27" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors block py-1">Twitter</a></li>
                <li><a href="https://www.linkedin.com/in/piyushdhoka27" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors block py-1">LinkedIn</a></li>
               </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 text-clay-500 text-xs font-mono tracking-wider uppercase">
            <span>© {new Date().getFullYear()} {PACKAGE_NAME}. Open Source Apache-2.0.</span>
            <span className="hidden md:block text-clay-700">•</span>
            <a 
              href="https://piyush.sparkstudio.co.in/" 
              target="_blank" 
              rel="noreferrer"
              className="text-clay-400 hover:text-accent transition-colors"
            >
              Built by Piyush Dhoka
            </a>
          </div>
          
          <div className="flex items-center gap-6">
             <a href="https://github.com/piyushdhoka" target="_blank" rel="noreferrer" className="text-clay-500 hover:text-white transition-colors" aria-label="Github Profile">
               <Github className="w-5 h-5" />
             </a>
             <a href="https://x.com/piyush_dhoka27" target="_blank" rel="noreferrer" className="text-clay-500 hover:text-white transition-colors" aria-label="Twitter Profile">
               <Twitter className="w-5 h-5" />
             </a>
             <a href="https://www.linkedin.com/in/piyushdhoka27" target="_blank" rel="noreferrer" className="text-clay-500 hover:text-white transition-colors" aria-label="LinkedIn Profile">
               <Linkedin className="w-5 h-5" />
             </a>
             <a href="https://piyush.sparkstudio.co.in/" target="_blank" rel="noreferrer" className="text-clay-500 hover:text-white transition-colors" aria-label="Portfolio">
               <Globe className="w-5 h-5" />
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;