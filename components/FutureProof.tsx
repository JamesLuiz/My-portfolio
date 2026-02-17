
import React from 'react';
import { Cpu, Brain, Rocket, Eye, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const FutureProof: React.FC = () => {
  const research = [
    {
      title: "Zero-Knowledge Proofs (ZKPs)",
      desc: "Implementing privacy-preserving protocols for Ethereum-based identity management and cross-chain messaging.",
      icon: <Eye className="w-5 h-5" />,
      tag: "Bleeding Edge",
      color: "#3B82F6"
    },
    {
      title: "AI-Driven Auditing",
      desc: "Training custom LLMs to detect complex logic errors and edge cases in DeFi liquidation engines.",
      icon: <Brain className="w-5 h-5" />,
      tag: "Researching",
      color: "#F59E0B"
    },
    {
      title: "Post-Quantum Crypto",
      desc: "Hardening backend systems and multi-sig wallets against emerging quantum computing security threats.",
      icon: <Cpu className="w-5 h-5" />,
      tag: "Active Learning",
      color: "#EF4444"
    }
  ];

  return (
    <section id="research" className="py-32 px-6 bg-black relative">
      <div className="max-w-7xl mx-auto border border-white/10 bg-[#080808] rounded-[3rem] p-12 md:p-24 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-blue-600/[0.03] blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-amber-500/[0.02] blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-center justify-between mb-24 space-y-6 md:space-y-0"
          >
            <div className="space-y-6">
              <h2 className="text-xs font-mono text-blue-500 uppercase tracking-[0.5em] font-black">Next Horizons</h2>
              <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">The Forward Path</h3>
            </div>
            <p className="text-gray-500 max-w-sm text-lg font-light leading-relaxed">
              Security is a moving target. I stay ahead by auditing technologies that will define the next decade of digital sovereignty.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {research.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group p-10 border border-white/5 bg-white/[0.01] rounded-[2.5rem] hover:bg-white/[0.03] transition-all hover:border-white/20 shadow-xl"
              >
                <div className="flex items-center justify-between mb-10">
                  <div 
                    className="w-12 h-12 border rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6"
                    style={{ color: item.color, borderColor: `${item.color}40`, backgroundColor: `${item.color}10` }}
                  >
                    {item.icon}
                  </div>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-mono uppercase text-gray-500 tracking-[0.2em] font-black">
                    {item.tag}
                  </span>
                </div>
                <h4 className="text-2xl font-black mb-6 tracking-tight uppercase">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-300 transition-colors font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-24 p-12 border border-dashed border-white/20 rounded-[3rem] bg-gradient-to-r from-blue-600/5 to-transparent flex flex-col lg:flex-row items-center justify-between gap-12"
          >
            <div className="flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
              <div className="w-20 h-20 rounded-[2rem] bg-blue-600 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.5)]">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-2">
                <h5 className="text-3xl font-black uppercase tracking-tighter">Ready for Operations?</h5>
                <p className="text-gray-500 font-mono text-xs uppercase tracking-widest font-bold italic">Initializing high-availability system architecture...</p>
              </div>
            </div>
            <motion.a 
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:eliezerjames92@gmail.com"
              className="px-10 py-6 bg-white text-black font-black uppercase text-sm tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all rounded-2xl flex items-center shadow-2xl"
            >
              <span>Secure Connection</span>
              <ArrowRight className="w-5 h-5 ml-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FutureProof;
