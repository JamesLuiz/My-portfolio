
import React from 'react';
import { Shield, LayoutGrid, Cpu, Terminal } from 'lucide-react';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const navItems = [
    { name: 'Core', icon: <Cpu className="w-4 h-4" />, href: '#core' },
    { name: 'Projects', icon: <LayoutGrid className="w-4 h-4" />, href: '#projects' },
    { name: 'Audit', icon: <Terminal className="w-4 h-4" />, href: '#audit' },
    { name: 'Research', icon: <Shield className="w-4 h-4" />, href: '#research' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <span className="font-bold text-xl mono">E</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight leading-none uppercase">Eliezer James</span>
            <span className="text-[10px] text-blue-400 font-mono tracking-widest uppercase mt-1 opacity-80">Security Architect // v4.0.1</span>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className="flex items-center space-x-2 text-sm font-medium text-gray-400 hover:text-blue-400 transition-colors group"
            >
              <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="mono">{item.name}</span>
            </a>
          ))}
          <a 
            href="mailto:contact@eliezer.systems"
            className="px-5 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-widest rounded hover:bg-blue-600 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(59,130,246,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            Deploy Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
