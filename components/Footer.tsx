
import React from 'react';
import { Twitter, Github, Linkedin, Mail, ExternalLink, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 px-6 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-black uppercase tracking-tighter">ELIEZER.SYSTEM</span>
            </div>
            <p className="text-gray-500 text-lg max-w-md leading-relaxed">
              High-frequency backend logic. Multi-chain DeFi architecture. Penetration testing and security research.
            </p>
            <div className="flex items-center space-x-6">
              <a href="https://x.com/devbot_luiz" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h6 className="text-xs font-mono uppercase text-gray-400 tracking-widest">Navigation</h6>
            <ul className="space-y-4 text-gray-500 font-mono text-sm uppercase">
              <li><a href="#core" className="hover:text-white transition-colors">Systems Core</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Proof of Work</a></li>
              <li><a href="#audit" className="hover:text-white transition-colors">Security Lab</a></li>
              <li><a href="#research" className="hover:text-white transition-colors">Research</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h6 className="text-xs font-mono uppercase text-gray-400 tracking-widest">Connect</h6>
            <ul className="space-y-4 text-gray-500 font-mono text-sm uppercase">
              <li>
                <a href="mailto:contact@eliezer.systems" className="flex items-center hover:text-white transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </a>
              </li>
              <li>
                <a href="tel:+2349152087229" className="flex items-center hover:text-white transition-colors">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
            © {new Date().getFullYear()} Eliezer James // All Protocols Reserved // Latency: 22ms
          </div>
          <div className="flex items-center space-x-6 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
            <span>Built with Nest.js Aesthetic</span>
            <span>Audited by Gemini</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
