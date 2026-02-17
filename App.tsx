
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillGrid from './components/SkillGrid';
import CaseStudies from './components/CaseStudies';
import FutureProof from './components/FutureProof';
import SecurityAuditTerminal from './components/SecurityAuditTerminal';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 selection:text-blue-200">
        <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none z-0"></div>
        <div className="scanline z-50"></div>
        
        <Navbar scrolled={scrolled} />
        
        <main className="relative z-10 pt-16">
          <Hero />
          <SkillGrid />
          <CaseStudies />
          <SecurityAuditTerminal />
          <FutureProof />
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
