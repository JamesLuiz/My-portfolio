
import React from 'react';
import { Cpu, Brain, Rocket, Eye } from 'lucide-react';

const FutureProof: React.FC = () => {
  const research = [
    {
      title: "Zero-Knowledge Proofs (ZKPs)",
      desc: "Implementing privacy-preserving protocols for Ethereum-based identity management.",
      icon: <Eye className="w-5 h-5" />,
      tag: "Bleeding Edge"
    },
    {
      title: "AI-Driven Auditing",
      desc: "Training LLMs to detect logic errors in complex DeFi liquidation engines.",
      icon: <Brain className="w-5 h-5" />,
      tag: "Researching"
    },
    {
      title: "Post-Quantum Cryptography",
      desc: "Hardening backend systems against emerging quantum computing threats.",
      icon: <Cpu className="w-5 h-5" />,
      tag: "Active Learning"
    }
  ];

  return (
    <section id="research" className="py-24 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto border border-white/5 bg-[#0a0a0a] rounded-[40px] p-12 md:p-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px]"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 space-y-4 md:space-y-0">
            <div className="space-y-4">
              <h2 className="text-xs font-mono text-blue-400 uppercase tracking-[0.3em]">Next Horizons</h2>
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Future-Proof Research</h3>
            </div>
            <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
              The ecosystem evolves daily. I stay ahead by researching technologies that will define the next decade of digital security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {research.map((item, idx) => (
              <div key={idx} className="group p-8 border border-white/5 bg-white/[0.02] rounded-3xl hover:bg-white/[0.05] transition-all hover:border-white/10">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center text-blue-400">
                    {item.icon}
                  </div>
                  <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[8px] font-mono uppercase text-gray-500 tracking-widest">
                    {item.tag}
                  </span>
                </div>
                <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-20 p-8 border border-dashed border-white/10 rounded-2xl flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center animate-pulse">
                <Rocket className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <h5 className="text-xl font-bold uppercase">Ready for Deployment?</h5>
                <p className="text-gray-500 text-sm">Let&apos;s architect your next secure system together.</p>
              </div>
            </div>
            <a 
              href="mailto:contact@eliezer.systems"
              className="px-8 py-4 bg-white text-black font-black uppercase text-sm tracking-widest hover:bg-blue-600 hover:text-white transition-all rounded-lg"
            >
              Initialize Connection
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureProof;
