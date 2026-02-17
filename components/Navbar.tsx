
import React from 'react';
import { Shield, LayoutGrid, Cpu, Terminal, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const navItems = [
    { name: 'Core', icon: <Cpu className="w-4 h-4" />, href: '#core' },
    { name: 'Projects', icon: <LayoutGrid className="w-4 h-4" />, href: '#projects' },
    { name: 'Audit', icon: <Terminal className="w-4 h-4" />, href: '#audit' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-4 bg-black/80 backdrop-blur-2xl border-b border-white/5' : 'py-8 bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.div 
            whileHover={{ rotate: 180 }}
            className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] cursor-pointer"
          >
            <Shield className="w-5 h-5 text-white" />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tighter leading-none uppercase glitch-text">Eliezer James</span>
            <span className="text-[8px] text-blue-500 font-mono tracking-[0.4em] uppercase mt-1 font-black">Security Architect // v4.0</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-10">
          <div className="flex items-center space-x-8 pr-10 border-r border-white/10">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="flex items-center space-x-2 text-[10px] font-black font-mono text-gray-500 hover:text-white transition-colors uppercase tracking-widest">
                {item.icon}
                <span>{item.name}</span>
              </a>
            ))}
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="https://github.com/jamesluiz" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/dev-eliezer" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:eliezerjames92@gmail.com"
              className="px-6 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-blue-600 hover:text-white transition-all"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
