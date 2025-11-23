import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Documentation from './components/Documentation';
import Footer from './components/Footer';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LANDING);

  return (
    <div className="min-h-screen bg-clay-950 text-clay-200 selection:bg-accent/30 selection:text-white font-sans overflow-x-hidden">
      {/* Noise texture overlay */}
      <div className="noise-bg"></div>
      
      <Navbar currentView={currentView} onChangeView={setCurrentView} />
      
      <main className="relative z-10">
        {currentView === View.LANDING ? (
          <>
            <Hero onGetStarted={() => setCurrentView(View.DOCS)} />
            <Features />
            <Footer onOpenDocs={() => setCurrentView(View.DOCS)} />
          </>
        ) : (
          <Documentation />
        )}
      </main>
    </div>
  );
};

export default App;