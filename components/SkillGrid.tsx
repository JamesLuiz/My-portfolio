
import React from 'react';
import { Server, Shield, Hexagon } from 'lucide-react';
import { SKILL_MODULES } from '../constants';
import { motion } from 'framer-motion';

const SkillGrid: React.FC = () => {
  const IconMap: Record<string, React.ReactNode> = {
    Server: <Server className="w-6 h-6" />,
    Hexagon: <Hexagon className="w-6 h-6" />,
    Shield: <Shield className="w-6 h-6" />,
  };

  return (
    <section id="core" className="py-32 px-6 relative bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-24 space-y-4 md:space-y-0"
        >
          <div className="space-y-4">
            <h2 className="text-xs font-mono text-blue-500 uppercase tracking-[0.4em] font-bold">Systems Architecture</h2>
            <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">The Trifecta</h3>
          </div>
          <p className="text-gray-500 max-w-sm font-mono text-xs uppercase leading-relaxed tracking-wider">
            Specialized engineering for high-availability ecosystems where backend performance, blockchain integrity, and defensive security converge.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {SKILL_MODULES.map((module, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.2, type: "spring", stiffness: 50 }}
              className="group relative p-10 bg-[#0c0c0c] border border-white/5 rounded-[2rem] transition-all hover:border-blue-500/30 hover:bg-[#111] overflow-hidden cursor-default shadow-2xl"
            >
              {/* Animated Glow Effect */}
              <motion.div 
                className="absolute -top-24 -right-24 w-64 h-64 blur-[100px] opacity-10 transition-opacity group-hover:opacity-30 pointer-events-none"
                style={{ backgroundColor: module.color }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              ></motion.div>

              <div className="relative z-10 flex flex-col h-full">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-10 border border-white/10 shadow-2xl transition-transform group-hover:scale-110 group-hover:rotate-3"
                  style={{ color: module.color, backgroundColor: `${module.color}15` }}
                >
                  {IconMap[module.icon]}
                </div>

                <h4 className="text-3xl font-bold mb-6 tracking-tight">{module.title}</h4>
                <p className="text-gray-400 text-sm mb-10 leading-relaxed flex-grow font-light">
                  {module.tagline}
                </p>

                <div className="space-y-6 pt-10 border-t border-white/5">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono uppercase text-gray-500 tracking-[0.2em] font-bold block">Engine Stack</span>
                    <div className="flex flex-wrap gap-2">
                      {module.tech.map(t => (
                        <span key={t} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-mono text-white/60 border border-white/5 group-hover:border-blue-500/20 group-hover:text-white transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase text-gray-500 tracking-[0.2em] font-bold block">Primary Directive</span>
                    <div className="text-xs font-mono text-blue-400/90 leading-relaxed uppercase tracking-tighter italic">
                      {module.focus}
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Indicator */}
              <div className="absolute bottom-6 right-8 flex space-x-1 opacity-10 group-hover:opacity-100 transition-opacity">
                <div className="w-1 h-8 bg-blue-500/20 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ y: [-32, 32] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-full h-1/2 bg-blue-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillGrid;
