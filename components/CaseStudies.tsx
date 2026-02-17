
import React from 'react';
import { TrendingUp, ArrowUpRight, CheckCircle2, Zap } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from 'recharts';
import { CASE_STUDIES } from '../constants';

const CaseStudies: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-xs font-mono text-amber-500 uppercase tracking-[0.3em] mb-4">Strategic Impact</h2>
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight">Business Case Studies</h3>
        </div>

        <div className="space-y-32">
          {CASE_STUDIES.map((study, idx) => (
            <div key={study.id} className={`flex flex-col lg:flex-row items-center gap-16 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="flex-1 space-y-8">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/5 border border-white/10 rounded-md">
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Success Metric: High Performance</span>
                </div>
                
                <h4 className="text-3xl md:text-5xl font-bold tracking-tight uppercase leading-tight">
                  {study.title}
                </h4>
                
                <p className="text-gray-400 text-lg leading-relaxed italic">
                  &ldquo;{study.context}&rdquo;
                </p>

                <div className="p-6 bg-white/5 border-l-4 rounded-r-xl border-white/10" style={{ borderColor: study.color }}>
                  <div className="flex items-center space-x-2 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-xs font-mono uppercase font-bold tracking-tighter">Impact & ROI</span>
                  </div>
                  <p className="text-white text-lg font-medium leading-relaxed">
                    {study.impact}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  {study.tech.map(t => (
                    <span key={t} className="px-4 py-2 bg-white/5 rounded-full text-xs font-mono text-gray-300 border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>

                <button className="flex items-center space-x-2 group text-white font-bold uppercase text-sm tracking-widest pt-4">
                  <span>View Full Documentation</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>

              <div className="flex-1 w-full aspect-video rounded-3xl border border-white/5 bg-[#0a0a0a] p-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10"></div>
                
                <div className="relative z-20 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-8">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Real-time Telemetry</span>
                      <div className="text-xl font-bold mono uppercase">{study.id === 'aqua' ? 'Security Audit Risk' : 'Transaction Throughput'}</div>
                    </div>
                    <div className="flex items-center text-green-500 space-x-1 font-mono text-sm">
                      <TrendingUp className="w-4 h-4" />
                      <span>{study.id === 'aqua' ? '-95%' : '+450%'}</span>
                    </div>
                  </div>

                  <div className="w-full h-48 mt-auto">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={study.visualData?.map((v, i) => ({ value: v, time: i }))}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke={study.color} 
                          strokeWidth={3} 
                          dot={{ fill: study.color, r: 4 }} 
                          activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                          labelStyle={{ display: 'none' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Visual Glitch Elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity">
                  <div className="absolute inset-0 grid-bg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
