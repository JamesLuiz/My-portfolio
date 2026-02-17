
import React, { useState, useEffect } from 'react';
import { Terminal, Database, ShieldCheck, Cpu } from 'lucide-react';

const Hero: React.FC = () => {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const fullText = [
    "> Initiating Secure Protocol...",
    "> Loading Backend Nodes (Node.js/NestJS)... [OK]",
    "> Connecting Database (PostgreSQL)... [Synced]",
    "> Verifying Smart Contracts (Solidity)... [Secure]",
    "> Welcome to Eliezer.System()"
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < fullText.length) {
        setTerminalLines(prev => [...prev, fullText[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 blur-[150px] rounded-full z-0"></div>
      
      <div className="max-w-4xl w-full relative z-10 text-center space-y-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-4">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">System Status: Active // No Breaches</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight uppercase">
          Securing Value.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-amber-400 to-red-500">Scaling Future.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
          I build high-frequency backend systems, secure DeFi protocols, and audit the code that powers the decentralized web.
        </p>

        {/* Terminal Visual */}
        <div className="mt-12 w-full max-w-2xl mx-auto rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]/90 backdrop-blur-xl">
          <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <div className="flex items-center space-x-2 opacity-40">
              <Terminal className="w-3 h-3" />
              <span className="text-[10px] font-mono uppercase tracking-tighter">eliezer-james — sh — 80x24</span>
            </div>
          </div>
          <div className="p-6 text-left font-mono text-sm space-y-1.5 h-48 overflow-y-auto">
            {terminalLines.map((line, idx) => (
              <div key={idx} className={line.includes('[OK]') ? 'text-green-400' : line.includes('[Secure]') ? 'text-blue-400' : 'text-gray-300'}>
                {line}
              </div>
            ))}
            <div className="flex items-center">
              <span className="text-blue-500 animate-pulse">█</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
          <a href="#audit" className="group relative px-8 py-4 bg-blue-600 text-white font-bold rounded-lg overflow-hidden transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)]">
            <span className="relative z-10 flex items-center">
              <Terminal className="w-4 h-4 mr-2" />
              AUDIT MY CODE
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </a>
          <a href="#projects" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-colors flex items-center">
            <LayoutGrid className="w-4 h-4 mr-2" />
            VIEW PORTFOLIO
          </a>
        </div>
      </div>
    </section>
  );
};

const LayoutGrid: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>
  </svg>
);

export default Hero;
