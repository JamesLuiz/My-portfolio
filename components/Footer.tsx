
import React from 'react';
import { Twitter, Github, Linkedin, Mail, ExternalLink, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="py-32 px-6 bg-[#020202] border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-blue-600/[0.03] blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
          <div className="col-span-1 md:col-span-2 space-y-12">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <span className="text-4xl font-black uppercase tracking-tighter leading-none">ELIEZER<br/><span className="text-blue-500">.SYSTEM</span></span>
            </div>
            <p className="text-gray-500 text-xl max-w-md leading-relaxed font-light">
              Designing high-performance backend logic, secure blockchain ecosystems, and automated defensive infrastructures.
            </p>
            <div className="flex items-center space-x-10">
              {[
                { icon: <Github className="w-6 h-6" />, href: "https://github.com/jamesluiz" },
                { icon: <Linkedin className="w-6 h-6" />, href: "https://linkedin.com/in/dev-eliezer" },
                { icon: <Twitter className="w-6 h-6" />, href: "https://x.com/devbot_luiz" }
              ].map((social, i) => (
                <motion.a 
                  key={i} 
                  whileHover={{ scale: 1.2, y: -5 }}
                  href={social.href} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-gray-600 hover:text-white transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <h6 className="text-[10px] font-mono uppercase text-gray-400 tracking-[0.6em] font-black">Architecture</h6>
            <ul className="space-y-6 text-gray-500 font-mono text-[10px] uppercase font-bold tracking-widest">
              <li><a href="#core" className="hover:text-blue-500 transition-colors flex items-center group">_Node Core</a></li>
              <li><a href="#projects" className="hover:text-blue-500 transition-colors flex items-center group">_Telemetry</a></li>
              <li><a href="#audit" className="hover:text-blue-500 transition-colors flex items-center group">_Security Lab</a></li>
              <li><a href="#research" className="hover:text-blue-500 transition-colors flex items-center group">_Forward Path</a></li>
            </ul>
          </div>

          <div className="space-y-10">
            <h6 className="text-[10px] font-mono uppercase text-gray-400 tracking-[0.6em] font-black">Connection</h6>
            <ul className="space-y-6 text-gray-500 font-mono text-[10px] uppercase font-bold tracking-widest">
              <li>
                <a href="mailto:eliezerjames92@gmail.com" className="flex items-center hover:text-white transition-colors">
                  <Mail className="w-4 h-4 mr-3 text-blue-600" />
                  Mail Protocol
                </a>
              </li>
              <li>
                <a href="https://wa.me/2349152087229" target="_blank" rel="noreferrer" className="flex items-center hover:text-white transition-colors">
                  <ExternalLink className="w-4 h-4 mr-3 text-blue-600" />
                  Secure WhatsApp
                </a>
              </li>
              <li>
                <div className="flex items-center text-emerald-500 font-black">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-4"></div>
                  Status: Available
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 text-[10px] font-mono text-gray-700 uppercase tracking-[0.4em] font-black">
          <div>© {new Date().getFullYear()} Eliezer James // SHA-256 Verified</div>
          <div className="flex items-center space-x-12">
             <div className="flex items-center space-x-2">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
               <span>High Availability</span>
             </div>
             <div className="flex items-center space-x-2">
               <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
               <span>DeFi Native</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
