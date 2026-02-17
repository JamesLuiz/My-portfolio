
import React from 'react';
import { TrendingUp, ArrowUpRight, CheckCircle2, Zap } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis } from 'recharts';
import { CASE_STUDIES, THEME } from '../constants';
import { motion } from 'framer-motion';

const CaseStudies: React.FC = () => {
  return (
    <section id="projects" className="py-32 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center space-y-6"
        >
          <h2 className="text-xs font-mono text-amber-500 uppercase tracking-[0.5em] font-black">Strategic Operations</h2>
          <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">Proof of Impact</h3>
        </motion.div>

        <div className="space-y-48">
          {CASE_STUDIES.map((study, idx) => (
            <motion.div 
              key={study.id} 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col lg:flex-row items-center gap-20 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 space-y-10">
                <motion.div 
                  initial={{ x: idx % 2 === 0 ? -50 : 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="space-y-8"
                >
                  <div className="inline-flex items-center space-x-3 px-4 py-2 bg-amber-500/5 border border-amber-500/20 rounded-full">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">Telemetry: Performance Peak</span>
                  </div>
                  
                  <h4 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] group">
                    {study.title}
                  </h4>
                  
                  <p className="text-gray-500 text-xl leading-relaxed italic border-l-2 border-white/10 pl-6 font-light">
                    &ldquo;{study.context}&rdquo;
                  </p>

                  <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] shadow-2xl backdrop-blur-sm relative overflow-hidden group">
                     <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-transparent"></div>
                    <div className="flex items-center space-x-3 mb-6">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                      <span className="text-xs font-mono uppercase font-black tracking-widest text-emerald-500">ROI & Impact Analysis</span>
                    </div>
                    <p className="text-white text-xl font-bold leading-relaxed tracking-tight">
                      {study.impact}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {study.tech.map(t => (
                      <span key={t} className="px-5 py-2.5 bg-white/5 rounded-xl text-xs font-mono text-gray-400 border border-white/10 hover:border-white/30 hover:text-white transition-all cursor-default">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button className="group flex items-center space-x-4 text-white font-black uppercase text-xs tracking-[0.3em] pt-6 hover:text-blue-400 transition-colors">
                    <span className="border-b-2 border-transparent group-hover:border-blue-400 transition-all pb-1">Request Case Analysis</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </motion.div>
              </div>

              <motion.div 
                initial={{ scale: 0.9, opacity: 0, rotate: idx % 2 === 0 ? 2 : -2 }}
                whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring" }}
                className="flex-1 w-full aspect-square md:aspect-video rounded-[3rem] border border-white/10 bg-[#0a0a0a] p-12 relative overflow-hidden group shadow-[0_0_100px_rgba(0,0,0,0.5)]"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-10"></div>
                
                <div className="relative z-20 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-10">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.4em] font-bold">Node Telemetry</span>
                      <div className="text-2xl font-black mono uppercase tracking-tighter">
                        {study.id === 'aqua' ? 'Risk Mitigation' : 'Traffic Expansion'}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                       <div className="flex items-center text-emerald-500 space-x-2 font-mono text-xl font-black">
                        <TrendingUp className="w-6 h-6" />
                        <span>{study.id === 'aqua' ? '-95%' : '+450%'}</span>
                      </div>
                      <span className="text-[10px] text-gray-600 font-mono uppercase">Verified Protocol</span>
                    </div>
                  </div>

                  <div className="w-full h-64 mt-auto">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={study.visualData?.map((v, i) => ({ value: v, time: i }))}>
                        <defs>
                          <linearGradient id={`color-${study.id}`} x1="0" y1="0" x2="0" y2="100%">
                            <stop offset="5%" stopColor={study.color} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={study.color} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke={study.color} 
                          fillOpacity={1} 
                          fill={`url(#color-${study.id})`}
                          strokeWidth={4} 
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#050505', border: '1px solid #222', borderRadius: '12px', fontSize: '10px', fontFamily: 'Fira Code' }}
                          itemStyle={{ color: study.color }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/5">
                    {['X-01', 'X-02', 'X-03', 'X-04'].map(tag => (
                      <div key={tag} className="flex flex-col">
                        <span className="text-[8px] font-mono text-gray-600 uppercase">{tag}</span>
                        <div className="h-1 w-full bg-white/5 rounded-full mt-1 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${Math.random() * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-blue-500/40"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
