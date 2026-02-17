
import React from 'react';
import { Server, Shield, Hexagon, Database, Link, Lock, Cpu, Layers } from 'lucide-react';
import { SKILL_MODULES } from '../constants';

const SkillGrid: React.FC = () => {
  const IconMap: Record<string, React.ReactNode> = {
    Server: <Server className="w-6 h-6" />,
    Hexagon: <Hexagon className="w-6 h-6" />,
    Shield: <Shield className="w-6 h-6" />,
  };

  return (
    <section id="core" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-xs font-mono text-blue-500 uppercase tracking-[0.3em] mb-4">Architecture Modules</h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight">The Trifecta Stack</h3>
          </div>
          <p className="text-gray-500 max-w-sm font-mono text-xs uppercase leading-relaxed">
            Specialized engineering for high-availability systems where performance, security, and decentralization intersect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILL_MODULES.map((module, idx) => (
            <div 
              key={idx}
              className="group relative p-8 bg-[#0a0a0a] border border-white/5 rounded-2xl transition-all hover:border-white/20 hover:bg-[#0c0c0c] overflow-hidden"
            >
              <div 
                className="absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-20 transition-opacity group-hover:opacity-40"
                style={{ backgroundColor: module.color }}
              ></div>

              <div className="relative z-10 flex flex-col h-full">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-8 border border-white/10 shadow-lg"
                  style={{ color: module.color, backgroundColor: `${module.color}10` }}
                >
                  {IconMap[module.icon]}
                </div>

                <h4 className="text-2xl font-bold mb-4">{module.title}</h4>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-grow">
                  {module.tagline}
                </p>

                <div className="space-y-4 pt-6 border-t border-white/5">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-gray-500 tracking-widest block mb-2">Technologies</span>
                    <div className="flex flex-wrap gap-2">
                      {module.tech.map(t => (
                        <span key={t} className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-white/70 border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-gray-500 tracking-widest block mb-2">Core Focus</span>
                    <div className="text-xs font-mono text-blue-400/80">
                      {module.focus}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-4 right-4 flex space-x-1 opacity-20">
                <div className="w-1 h-1 rounded-full bg-white"></div>
                <div className="w-1 h-1 rounded-full bg-white"></div>
                <div className="w-1 h-1 rounded-full bg-white"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillGrid;
