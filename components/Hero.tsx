
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Terminal, Lock, ChevronRight, Activity, ShieldCheck, Database, Layers } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

const TypewriterLine: React.FC<{ text: string; delay: number; onComplete?: () => void }> = ({ text, delay, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let timeout: number;
    const startTimeout = window.setTimeout(() => {
      let current = '';
      let i = 0;
      const type = () => {
        if (i < text.length) {
          current += text[i];
          setDisplayedText(current);
          i++;
          timeout = window.setTimeout(type, 20);
        } else if (onComplete) {
          onComplete();
        }
      };
      type();
    }, delay);

    return () => {
      window.clearTimeout(startTimeout);
      window.clearTimeout(timeout);
    };
  }, [text, delay]);

  const getLineClass = (t: string) => {
    if (t.includes('[OK]')) return 'text-emerald-400';
    if (t.includes('[Secure]')) return 'text-blue-400';
    if (t.includes('[GRANTED]')) return 'text-amber-400';
    return 'text-gray-300';
  };

  return (
    <div className={`flex items-center space-x-4 ${getLineClass(text)}`}>
      <span className="opacity-20 select-none w-6 text-right font-bold mono text-[10px]">#</span>
      <span className="flex-1 tracking-tight font-mono text-sm">{displayedText}</span>
    </div>
  );
};

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Objects: A floating "Blockchain" grid of cubes
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color: 0x3b82f6 });
    
    const cubes: THREE.LineSegments[] = [];
    for (let i = 0; i < 12; i++) {
      const cube = new THREE.LineSegments(edges, material);
      cube.position.x = (Math.random() - 0.5) * 8;
      cube.position.y = (Math.random() - 0.5) * 6;
      cube.position.z = (Math.random() - 0.5) * 4;
      scene.add(cube);
      cubes.push(cube);
    }

    // Money/Contracts represented as floating glowing planes
    const planeGeom = new THREE.PlaneGeometry(0.6, 0.4);
    const planeEdges = new THREE.EdgesGeometry(planeGeom);
    const planeMat = new THREE.LineBasicMaterial({ color: 0xf59e0b });
    const planes: THREE.LineSegments[] = [];
    for (let i = 0; i < 8; i++) {
      const plane = new THREE.LineSegments(planeEdges, planeMat);
      plane.position.x = (Math.random() - 0.5) * 10;
      plane.position.y = (Math.random() - 0.5) * 8;
      plane.position.z = (Math.random() - 0.5) * 5;
      scene.add(plane);
      planes.push(plane);
    }

    const animate = () => {
      requestAnimationFrame(animate);
      cubes.forEach((c, i) => {
        c.rotation.x += 0.01;
        c.rotation.y += 0.01;
        c.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
      });
      planes.forEach((p, i) => {
        p.rotation.z += 0.005;
        p.position.x += Math.cos(Date.now() * 0.0005 + i) * 0.001;
      });
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />;
};

const Hero: React.FC = () => {
  const [visibleLinesCount, setVisibleLinesCount] = useState(1);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  const fullText = useMemo(() => [
    "> INITIATING SECURE RELAY...",
    "> KERNEL HANDSHAKE... [GRANTED]",
    "> CONNECTING TO POSTGRES_CLUSTER_01... [OK]",
    "> VERIFYING SMART CONTRACT INTEGRITY... [SECURE]",
    "> LOADING DISTRIBUTED LEDGER... [SYNCED]",
    "> DEPLOYING SCALABLE BACKEND NODES... [OK]",
    "> HANDSHAKE COMPLETE. WELCOME TO NEXUS_v4."
  ], []);

  useEffect(() => {
    // Reveal lines one by one after typing finishes (roughly)
    const interval = setInterval(() => {
      setVisibleLinesCount(prev => (prev < fullText.length ? prev + 1 : prev));
    }, 1200);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-[#020202]">
      <ThreeScene />
      
      {/* Decorative High-End FinTech Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>

      <motion.div 
        style={{ opacity, y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-7xl w-full relative z-10 text-center space-y-12"
      >
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center space-y-6"
        >
          <div className="inline-flex items-center space-x-3 px-6 py-2 bg-blue-500/5 border border-blue-500/20 rounded-full backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.4em] font-black">
              System Security: Level A // Identity: Eliezer James
            </span>
          </div>
          
          <h1 className="text-6xl md:text-[9rem] font-black tracking-tighter leading-[0.8] uppercase select-none">
            Secure<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-amber-500 glitch-text italic">Nexus.</span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-2xl text-gray-400 max-w-4xl mx-auto font-light leading-relaxed mono tracking-tight"
        >
          Architecting Multi-Chain Protocols & Scalable Fintech Infrastructure.
        </motion.p>

        {/* Command Center Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-5xl mx-auto pt-8">
          {/* Main Terminal */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-8 rounded-3xl overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] bg-[#050505]/90 backdrop-blur-3xl relative"
          >
            <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
              </div>
              <div className="flex items-center space-x-3 opacity-50">
                <Database className="w-3 h-3 text-blue-500" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-black"> Eliezer@SecureCore / TTY1</span>
              </div>
              <div className="w-10"></div>
            </div>
            <div className="p-8 text-left space-y-3 h-72 overflow-y-auto scrollbar-hide">
              {fullText.slice(0, visibleLinesCount).map((line, idx) => (
                <TypewriterLine key={idx} text={line} delay={idx * 100} />
              ))}
              <motion.div 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-blue-500 ml-10 translate-y-1"
              />
            </div>
          </motion.div>

          {/* HUD Sidebar */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="lg:col-span-4 flex flex-col gap-4"
          >
            <div className="flex-1 p-6 bg-[#080808] border border-white/5 rounded-3xl flex flex-col justify-between group hover:border-blue-500/30 transition-colors">
              <div className="flex items-center justify-between">
                <ShieldCheck className="w-6 h-6 text-blue-500" />
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-black">Auth Integrity</span>
              </div>
              <div className="space-y-4">
                <div className="text-4xl font-black mono text-white">99.9%</div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "99.9%" }}
                    className="h-full bg-blue-600 shadow-[0_0_10px_#2563eb]"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 bg-[#080808] border border-white/5 rounded-3xl flex flex-col justify-between group hover:border-amber-500/30 transition-colors">
              <div className="flex items-center justify-between">
                <Activity className="w-6 h-6 text-amber-500" />
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-black">Net Throughput</span>
              </div>
              <div className="flex items-end justify-between">
                <div className="flex space-x-1.5 items-end h-12">
                  {[40, 70, 45, 90, 60, 80].map((h, i) => (
                    <motion.div 
                      key={i}
                      animate={{ height: [`${h}%`, `${Math.max(20, h - 20 + Math.random() * 40)}%`] }}
                      transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                      className="w-1.5 bg-amber-500/20 rounded-full"
                    />
                  ))}
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold mono text-white">22ms</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16"
        >
          <motion.a 
            whileHover={{ scale: 1.05, shadow: "0 0 50px rgba(59,130,246,0.3)" }}
            whileTap={{ scale: 0.95 }}
            href="#audit" 
            className="group relative px-12 py-6 bg-blue-600 text-white font-black uppercase text-xs tracking-[0.4em] rounded-2xl overflow-hidden shadow-2xl"
          >
            <span className="relative z-10 flex items-center">
              <Lock className="w-4 h-4 mr-3" />
              Initialize Audit
            </span>
            <div className="absolute inset-0 bg-blue-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
          </motion.a>
          
          <motion.a 
            whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.95 }}
            href="#projects" 
            className="px-12 py-6 bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-[0.4em] rounded-2xl flex items-center transition-all group"
          >
            <span>Telemetry</span>
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
