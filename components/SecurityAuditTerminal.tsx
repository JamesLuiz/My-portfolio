
import React, { useState } from 'react';
import { Shield, Search, Terminal, AlertTriangle, CheckCircle, Loader2, Info, ChevronRight, FileCode } from 'lucide-react';
import { auditCode } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

const SecurityAuditTerminal: React.FC = () => {
  const [code, setCode] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleAudit = async () => {
    if (!code.trim()) return;
    setIsAuditing(true);
    setError('');
    setResult(null);

    try {
      const auditResult = await auditCode(code);
      setResult(auditResult);
    } catch (err) {
      setError('System failure: Kernel communication error or invalid API token.');
    } finally {
      setIsAuditing(false);
    }
  };

  const sampleCode = `// Vulnerable Token Bridge logic
function withdraw(uint256 amount) public {
  require(balances[msg.sender] >= amount, "Insufficient");
  
  // Potential Re-entrancy attack vector
  (bool success, ) = msg.sender.call{value: amount}("");
  require(success, "Transfer failed");
  
  balances[msg.sender] -= amount;
}`;

  return (
    <section id="audit" className="py-32 px-6 relative bg-black overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-red-900/[0.03] blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-24 gap-12"
        >
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-red-600/10 border border-red-500/20 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.1)]">
              <Shield className="w-10 h-10 text-red-500" />
            </div>
            <div>
              <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Security Lab</h3>
              <div className="flex items-center space-x-3 mt-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <p className="text-red-500 font-mono text-[10px] uppercase tracking-[0.4em] font-black">Scanning Node Active // 0xCC21</p>
              </div>
            </div>
          </div>
          <p className="text-gray-500 max-w-sm text-sm font-mono uppercase tracking-wider leading-relaxed">
            Automated defensive research. Identify logic exploits, re-entrancy, and buffer overflows in real-time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="relative group flex-1 flex flex-col">
              <div className="absolute -inset-1 bg-gradient-to-br from-red-600/20 to-transparent rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              
              <div className="relative flex-1 bg-[#080808] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col">
                <div className="bg-white/[0.03] px-6 py-4 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileCode className="w-4 h-4 text-gray-500" />
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">code_analyzer.sol</span>
                  </div>
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 rounded-full bg-white/10"></div>
                    <div className="w-2 h-2 rounded-full bg-white/10"></div>
                  </div>
                </div>
                
                <textarea 
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="// Paste smart contract logic or backend snippets here..."
                  className="flex-1 w-full bg-transparent p-10 font-mono text-sm text-gray-400 focus:outline-none focus:text-gray-200 transition-all resize-none leading-relaxed overflow-y-auto scrollbar-hide"
                ></textarea>
                
                <div className="p-6 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
                  <motion.button 
                    whileHover={{ color: "#fff" }}
                    onClick={() => setCode(sampleCode)}
                    className="text-[10px] uppercase font-mono text-gray-600 font-black tracking-widest hover:text-white transition-colors"
                  >
                    Load Sample Vector
                  </motion.button>
                  <div className="text-[9px] font-mono text-gray-700 uppercase italic">UTF-8 // CRLF</div>
                </div>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleAudit}
              disabled={isAuditing || !code}
              className={`mt-10 w-full py-8 rounded-[2rem] font-black uppercase tracking-[0.4em] text-sm flex items-center justify-center transition-all ${
                isAuditing ? 'bg-gray-900 cursor-not-allowed text-gray-600' : 'bg-red-600 hover:bg-red-700 shadow-[0_30px_60px_rgba(220,38,38,0.2)] text-white'
              }`}
            >
              {isAuditing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-4 animate-spin" />
                  Analyzing Logical Invariants...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-4" />
                  Initialize Neural Scan
                </>
              )}
            </motion.button>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full p-12 bg-[#0c0c0c] border border-red-500/20 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.9)] relative flex flex-col"
                >
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <Terminal className="w-5 h-5 text-blue-500" />
                      </div>
                      <span className="font-mono text-[10px] uppercase font-black text-gray-500 tracking-[0.3em]">Neural Output</span>
                    </div>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`px-5 py-2 rounded-xl text-[10px] font-black font-mono tracking-widest uppercase ${
                      result.severity === 'CRITICAL' ? 'bg-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.5)]' : 'bg-amber-500 text-black'
                    }`}>
                      {result.severity} THREAT
                    </motion.div>
                  </div>

                  <div className="flex-1 space-y-12">
                    <div>
                      <h4 className="text-white font-black text-4xl mb-6 tracking-tighter uppercase leading-none">{result.vulnerability}</h4>
                      <p className="text-gray-400 text-xl font-light leading-relaxed">{result.explanation}</p>
                    </div>

                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="p-10 bg-emerald-500/[0.03] border border-emerald-500/20 rounded-[2.5rem] relative"
                    >
                      <div className="flex items-center space-x-3 mb-6">
                        <CheckCircle className="w-6 h-6 text-emerald-500" />
                        <span className="text-xs font-mono uppercase font-black text-emerald-500 tracking-[0.3em]">Proposed Remediation</span>
                      </div>
                      <div className="bg-black/50 p-6 rounded-2xl border border-white/5 font-mono text-sm text-gray-300 leading-relaxed italic">
                        &ldquo;{result.remediation}&rdquo;
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between text-gray-600 font-mono text-[9px] uppercase tracking-widest font-black">
                    <div className="flex items-center space-x-2">
                      <ChevronRight className="w-3 h-3" />
                      <span>Signature: Eliezer_v4_Lab</span>
                    </div>
                    <span>Timestamp: {new Date().toLocaleTimeString()}</span>
                  </div>
                </motion.div>
              ) : error ? (
                <motion.div 
                   key="error"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="h-full p-16 bg-red-600/5 border border-red-500/20 rounded-[3rem] flex flex-col items-center justify-center text-center space-y-8"
                >
                  <AlertTriangle className="w-20 h-20 text-red-600 mb-2 animate-bounce" />
                  <div className="space-y-4">
                    <h4 className="text-red-600 font-black uppercase text-2xl tracking-tighter italic">Neural Link Severed</h4>
                    <p className="text-red-400 font-mono text-sm max-w-xs mx-auto leading-relaxed">{error}</p>
                  </div>
                  <button onClick={() => setError('')} className="px-8 py-3 bg-red-600/10 border border-red-600/30 text-red-500 font-mono text-[10px] uppercase font-black rounded-xl hover:bg-red-600 hover:text-white transition-all">Retry Handshake</button>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: 0.6 }}
                  className="h-full min-h-[500px] bg-[#080808] border border-white/5 border-dashed rounded-[3rem] flex flex-col items-center justify-center text-center p-20 group"
                >
                  <div className="relative mb-10">
                    <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full scale-150 group-hover:bg-blue-500/20 transition-all"></div>
                    <div className="relative w-28 h-28 rounded-[2.5rem] border border-white/10 flex items-center justify-center bg-white/[0.02] shadow-2xl">
                      <Terminal className="w-12 h-12 text-gray-700" />
                    </div>
                  </div>
                  <h4 className="text-gray-500 font-black uppercase tracking-[0.5em] text-sm mb-6">Waiting for Signal</h4>
                  <p className="text-gray-700 text-sm font-mono max-w-sm leading-relaxed uppercase italic">
                    Establish a logic stream via the terminal to begin automated vulnerability indexing.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityAuditTerminal;
