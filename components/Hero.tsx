
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Terminal, Lock, ChevronRight, Activity, ShieldCheck } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

const GlitchedPrompt: React.FC = () => {
    const [isGlitching, setIsGlitching] = useState(false);
    useEffect(() => {
        let timeoutId: number;
        const triggerGlitch = () => {
            if (Math.random() < 0.1) {
                setIsGlitching(true);
                setTimeout(() => setIsGlitching(false), 150);
            }
            timeoutId = window.setTimeout(triggerGlitch, 500 + Math.random() * 1000);
        };
        timeoutId = window.setTimeout(triggerGlitch, 2000);
        return () => clearTimeout(timeoutId);
    }, []);
    return <span className={`select-none font-mono text-xs mt-1 ${isGlitching ? 'prompt-glitch-active' : 'opacity-20'}`}>#</span>;
};

const TypewriterLine: React.FC<{ text: string; delay: number; onComplete?: () => void }> = ({ text, delay, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    let timeout: number;
    let i = 0;
    const startTimeout = window.setTimeout(() => {
      const type = () => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
          const randomDelay = 20 + Math.random() * 60;
          timeout = window.setTimeout(type, randomDelay);
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
  }, [text, delay, onComplete]);
  
  const getLineStyle = (t: string) => {
    if (t.includes('[OK]')) return 'text-emerald-400';
    if (t.includes('[SECURE]')) return 'text-blue-400';
    if (t.includes('[GRANTED]')) return 'text-amber-400';
    return 'text-gray-300';
  };
  return (
    <div className={`flex items-start space-x-3 mb-2 ${getLineStyle(text)}`}>
      <GlitchedPrompt />
      <span className="font-mono text-sm tracking-tight leading-relaxed">{displayedText}</span>
    </div>
  );
};

const TechLogoScene: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!mountRef.current) return;
        const container = mountRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 10;
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const logoGroup = new THREE.Group();
        scene.add(logoGroup);
        
        const material = new THREE.MeshStandardMaterial({ roughness: 0.4, metalness: 0.8 });

        // Ethereum
        const ethTop = new THREE.ConeGeometry(0.8, 1, 4);
        const ethBottom = new THREE.ConeGeometry(0.8, 1, 4);
        const ethLogo = new THREE.Group();
        const ethTopMesh = new THREE.Mesh(ethTop, material.clone());
        ethTopMesh.material.color.set(0x7F8C8D);
        ethTopMesh.rotation.y = Math.PI / 4;
        const ethBottomMesh = new THREE.Mesh(ethBottom, material.clone());
        ethBottomMesh.material.color.set(0x34495E);
        ethBottomMesh.rotation.x = Math.PI;
        ethBottomMesh.rotation.y = Math.PI / 4;
        ethBottomMesh.position.y = -1;
        ethLogo.add(ethTopMesh, ethBottomMesh);
        ethLogo.scale.set(0.8,0.8,0.8);
        logoGroup.add(ethLogo);

        // Python
        const pythonCurve = new THREE.TorusGeometry(0.8, 0.2, 16, 50);
        const pythonBlue = new THREE.Mesh(pythonCurve, material.clone());
        pythonBlue.material.color.set(0x306998);
        pythonBlue.position.x = 0.6;
        const pythonYellow = new THREE.Mesh(pythonCurve, material.clone());
        pythonYellow.material.color.set(0xFFD43B);
        pythonYellow.position.x = -0.6;
        const pythonLogo = new THREE.Group();
        pythonLogo.add(pythonBlue, pythonYellow);
        pythonLogo.rotation.z = Math.PI / 4;
        logoGroup.add(pythonLogo);

        // NestJS
        const nestShape = new THREE.Shape();
        const size = 1;
        nestShape.moveTo(-size, 0);
        nestShape.lineTo(-size/2, size * Math.sqrt(3)/2);
        nestShape.lineTo(size/2, size * Math.sqrt(3)/2);
        nestShape.lineTo(size, 0);
        nestShape.lineTo(size/2, -size * Math.sqrt(3)/2);
        nestShape.lineTo(-size/2, -size * Math.sqrt(3)/2);
        nestShape.lineTo(-size, 0);
        const nestGeom = new THREE.ExtrudeGeometry(nestShape, { depth: 0.2, bevelEnabled: false });
        const nestLogo = new THREE.Mesh(nestGeom, material.clone());
        nestLogo.material.color.set(0xE0234E);
        logoGroup.add(nestLogo);

        // Solana
        const solanaCurve = new THREE.CatmullRomCurve3([
             new THREE.Vector3(-1, 1, 0), new THREE.Vector3(0, 0.5, 0), new THREE.Vector3(1, 1, 0),
             new THREE.Vector3(0.5, 0, 0), new THREE.Vector3(-0.5, 0, 0),
             new THREE.Vector3(-1, -1, 0), new THREE.Vector3(0, -0.5, 0), new THREE.Vector3(1, -1, 0)
        ]);
        const solanaGeom = new THREE.TubeGeometry(solanaCurve, 64, 0.2, 8, false);
        const solanaLogo = new THREE.Mesh(solanaGeom, material.clone());
        solanaLogo.material.color.set(0x9945FF);
        logoGroup.add(solanaLogo);

        // Solidity
        const solidityShape = new THREE.Shape();
        solidityShape.moveTo(0.5, 1);
        solidityShape.bezierCurveTo(1.5, 1, 1.5, -0.5, 0.5, -0.5);
        solidityShape.lineTo(-0.5, -1);
        solidityShape.bezierCurveTo(-1.5, -1, -1.5, 0.5, -0.5, 0.5);
        solidityShape.lineTo(0.5, 1);
        const solidityGeom = new THREE.ExtrudeGeometry(solidityShape, { depth: 0.2, bevelEnabled: true, bevelSize: 0.1, bevelSegments: 2 });
        const solidityLogo = new THREE.Mesh(solidityGeom, material.clone());
        solidityLogo.material.color.set(0x363636);
        logoGroup.add(solidityLogo);

        const logos = [ethLogo, pythonLogo, nestLogo, solanaLogo, solidityLogo];
        logos.forEach((logo, i) => {
            const angle = (i / logos.length) * Math.PI * 2;
            const radius = 4.5;
            logo.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, (Math.random() - 0.5) * 4);
            logo.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        });

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 100);
        scene.add(pointLight);
        
        const mouse = new THREE.Vector2();
        const onMouseMove = (event: MouseEvent) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', onMouseMove);
        
        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();
            
            logos.forEach((logo, i) => {
                logo.rotation.y += 0.005 * (i % 2 === 0 ? 1 : -1);
                logo.rotation.x += 0.002;
            });
            logoGroup.rotation.y += (mouse.x * 0.2 - logoGroup.rotation.y) * 0.05;
            logoGroup.rotation.x += (-mouse.y * 0.2 - logoGroup.rotation.x) * 0.05;
            
            pointLight.position.x = mouse.x * 10;
            pointLight.position.y = mouse.y * 10;
            pointLight.position.z = 5;

            renderer.render(scene, camera);
        };
        animate();
        
        const handleResize = () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMouseMove);
            if(container && container.contains(renderer.domElement)) {
               container.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);
    return <div ref={mountRef} className="absolute inset-0 z-0 opacity-50" />;
};


const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  const [linesToRender, setLinesToRender] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const currentLineIndexRef = useRef(0);

  const terminalContent = useMemo(() => [
    "> INITIATING SECURE RELAY...",
    "> KERNEL HANDSHAKE... [GRANTED]",
    "> CONNECTING TO POSTGRES_CLUSTER_01... [OK]",
    "> VERIFYING SMART CONTRACT INTEGRITY... [SECURE]",
    "> LOADING DISTRIBUTED LEDGER... [SYNCED]",
    "> DEPLOYING SCALABLE BACKEND NODES... [OK]",
    "> HANDSHAKE COMPLETE. WELCOME."
  ], []);
  
  const handleTypingComplete = () => {
    if (currentLineIndexRef.current < terminalContent.length - 1) {
        currentLineIndexRef.current += 1;
        setLinesToRender(prev => [...prev, terminalContent[currentLineIndexRef.current]]);
    } else {
        setIsTyping(false);
    }
  };

  useEffect(() => {
    currentLineIndexRef.current = 0;
    setLinesToRender([terminalContent[0]]);
    setIsTyping(true);
  }, [terminalContent]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-[#020202]">
      <TechLogoScene />
      
      <motion.div 
        style={{ opacity, scale, y }}
        className="max-w-7xl w-full relative z-10 flex flex-col items-center justify-center pt-20"
      >
        <div className="text-center">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 flex flex-col items-center"
            >
                <div className="inline-flex items-center space-x-3 px-6 py-2 bg-blue-500/5 border border-blue-500/20 rounded-full backdrop-blur-xl">
                    <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.4em] font-black">
                    Kernel Identity: Eliezer James // Tier 1 Node
                    </span>
                </div>
                
                <p className="text-lg md:text-xl text-gray-400 max-w-4xl font-light mono tracking-tight pt-16">
                    Engineering High-Performance Backend & Financial Ecosystems.
                </p>
            </motion.div>
        </div>

        <div className="mt-16 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="lg:col-span-3 bg-[#050505]/90 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] backdrop-blur-3xl relative"
          >
            <div className="px-8 py-5 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/30"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/30"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/30"></div>
              </div>
              <div className="flex items-center space-x-3 opacity-60">
                <Terminal className="w-4 h-4 text-blue-500" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">SecureNexus_Shell_v4.2</span>
              </div>
              <div className="w-10"></div>
            </div>
            <div className="p-10 text-left h-72 overflow-y-auto scrollbar-hide">
              {linesToRender.map((line, index) => (
                <TypewriterLine
                  key={index}
                  text={line}
                  delay={0}
                  onComplete={index === linesToRender.length - 1 ? handleTypingComplete : undefined}
                />
              ))}
              {!isTyping && (
                <motion.div 
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2.5 h-5 bg-blue-500 ml-8 translate-y-1 shadow-[0_0_10px_#3b82f6]"
                />
              )}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="p-8 bg-white/[0.03] border border-white/10 rounded-[2.5rem] flex flex-col justify-between flex-1 group hover:border-blue-500/30 transition-all">
              <div className="flex items-center justify-between">
                <ShieldCheck className="w-7 h-7 text-blue-500" />
                <span className="text-[10px] font-mono text-gray-500 uppercase font-black tracking-widest">Auth Status</span>
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-black mono text-white">99.9%</div>
                <div className="text-[9px] font-mono text-blue-400 uppercase tracking-widest font-bold">Encrypted Handshake</div>
              </div>
            </div>
            <div className="p-8 bg-white/[0.03] border border-white/10 rounded-[2.5rem] flex flex-col justify-between flex-1 group hover:border-amber-500/30 transition-all">
              <div className="flex items-center justify-between">
                <Activity className="w-7 h-7 text-amber-500" />
                <span className="text-[10px] font-mono text-gray-500 uppercase font-black tracking-widest">Net Latency</span>
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-black mono text-emerald-500">14ms</div>
                <div className="text-[9px] font-mono text-emerald-600 uppercase tracking-widest font-bold">Global Cluster Sync</div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="flex flex-col sm:flex-row items-center gap-8 mt-16"
        >
          <motion.a 
            whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(59,130,246,0.4)" }}
            whileTap={{ scale: 0.95 }}
            href="#audit" 
            className="group relative px-14 py-7 bg-blue-600 text-white font-black uppercase text-xs tracking-[0.4em] rounded-[1.5rem] overflow-hidden shadow-2xl transition-transform"
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
            className="px-14 py-7 bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-[0.4em] rounded-[1.5rem] flex items-center group transition-all"
          >
            <span>Telemetry Log</span>
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
