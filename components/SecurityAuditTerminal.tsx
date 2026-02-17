
import React, { useState } from 'react';
import { Shield, Search, Terminal, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { auditCode } from '../services/geminiService';

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
      setError('System failure: Check API configuration or connection.');
    } finally {
      setIsAuditing(false);
    }
  };

  const sampleCode = `function transfer(address to, uint amount) public {
  require(balances[msg.sender] >= amount);
  balances[msg.sender] -= amount;
  (bool success, ) = to.call{value: amount}("");
  require(success);
  balances[to] += amount;
}`;

  return (
    <section id="audit" className="py-24 px-6 relative bg-black overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-red-900/5 blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center space-x-4 mb-12">
          <div className="w-12 h-12 bg-red-600/10 border border-red-500/30 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tight">Security Research Lab</h3>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest mt-1">Live Vulnerability Detection Simulator powered by Gemini 3</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <p className="text-gray-400 text-lg">
              Paste a smart contract or backend snippet below to see how I identify critical vulnerabilities before deployment.
            </p>
            
            <div className="relative group">
              <textarea 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste code here (e.g., Solidity, Node.js, SQL)..."
                className="w-full h-80 bg-[#0a0a0a] border border-white/10 rounded-xl p-6 font-mono text-sm text-gray-300 focus:outline-none focus:border-red-500/50 transition-all resize-none"
              ></textarea>
              <button 
                onClick={() => setCode(sampleCode)}
                className="absolute top-4 right-4 text-[10px] uppercase font-mono text-gray-500 hover:text-white transition-colors"
              >
                Use Sample Snippet
              </button>
            </div>

            <button 
              onClick={handleAudit}
              disabled={isAuditing || !code}
              className={`w-full py-4 rounded-xl font-bold uppercase tracking-[0.2em] flex items-center justify-center transition-all ${
                isAuditing ? 'bg-gray-800 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
              }`}
            >
              {isAuditing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing Attack Vectors...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Initialize Security Scan
                </>
              )}
            </button>
          </div>

          <div className="relative">
            {result ? (
              <div className="p-8 bg-[#0a0a0a] border border-red-500/30 rounded-2xl animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className={`w-5 h-5 ${result.severity === 'CRITICAL' ? 'text-red-500' : 'text-yellow-500'}`} />
                    <span className="font-mono text-xs uppercase font-bold text-gray-300">Analysis Report</span>
                  </div>
                  <div className={`px-2 py-1 rounded text-[10px] font-bold font-mono ${
                    result.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {result.severity} THREAT
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-white font-bold text-xl mb-2">{result.vulnerability}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{result.explanation}</p>
                  </div>

                  <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-[10px] font-mono uppercase font-bold text-green-500">Proposed Remediation</span>
                    </div>
                    <p className="text-gray-300 text-xs font-mono leading-relaxed">
                      {result.remediation}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between opacity-50">
                  <span className="text-[10px] font-mono uppercase">Agent: James_AI_Audit_v4</span>
                  <span className="text-[10px] font-mono uppercase">Timestamp: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            ) : error ? (
              <div className="p-8 bg-red-500/5 border border-red-500/20 rounded-2xl flex flex-col items-center justify-center text-center">
                <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                <p className="text-red-400 font-mono text-sm">{error}</p>
              </div>
            ) : (
              <div className="w-full h-[450px] bg-[#0a0a0a] border border-white/5 rounded-2xl border-dashed flex flex-col items-center justify-center text-center p-12 opacity-50">
                <Terminal className="w-16 h-16 text-gray-700 mb-6" />
                <h4 className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-2">Waiting for Input</h4>
                <p className="text-gray-700 text-xs font-mono max-w-xs">Enter code in the terminal to initialize scanning sequence.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityAuditTerminal;
