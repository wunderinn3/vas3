import React from 'react';
import Hero from './components/Hero';
import Audience from './components/Audience';
import ServiceDetail from './components/ServiceDetail';
import Contact from './components/Contact';
import ValueProposition from './components/ValueProposition';
import QamVideoWidget from './components/QamVideoWidget';
import StsVideoWidget from './components/StsVideoWidget';
import { SERVICES } from './constants';
import { BGPattern } from './components/ui/bg-pattern';

function App() {
  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-amber-500 selection:text-white">
      
      {/* Global Background Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BGPattern variant="grid" size={32} fill="#404040" className="opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]" />
      </div>

      {/* Main Content (No Navbar as requested) */}
      <div className="relative z-10">
        <Hero />
        <Audience />
        
        <ValueProposition />

        {/* Render Services in Order defined in constants */}
        {SERVICES.map((service, index) => (
          <ServiceDetail 
            key={service.id} 
            data={service} 
            index={index} 
          />
        ))}

        <Contact />
      </div>

      <QamVideoWidget />
      <StsVideoWidget />
    </div>
  );
}

export default App;