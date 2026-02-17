
import React, { useRef, useEffect } from 'react';
import { TrendingUp, ArrowUpRight, CheckCircle2, Zap, Globe } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { CASE_STUDIES } from '../constants';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  }
};

// A dedicated 3D component for the blockchain visualization
const BlockchainFlowViz: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;
        const container = mountRef.current;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        const nodes = [
            new THREE.Vector3(-2, 1, 0),
            new THREE.Vector3(2, 1, 0),
            new THREE.Vector3(0, -1.5, 0)
        ];

        // Nodes
        const nodeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xF59E0B });
        nodes.forEach(pos => {
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
            node.position.copy(pos);
            scene.add(node);
        });

        // Paths
        const curves = [
            new THREE.CatmullRomCurve3([nodes[0], new THREE.Vector3(0, 1.5, 0), nodes[1]]),
            new THREE.CatmullRomCurve3([nodes[1], new THREE.Vector3(1.5, -0.5, 0), nodes[2]]),
            new THREE.CatmullRomCurve3([nodes[2], new THREE.Vector3(-1.5, -0.5, 0), nodes[0]])
        ];

        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x3B82F6, transparent: true, opacity: 0.3 });
        curves.forEach(curve => {
            const points = curve.getPoints(50);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const curveObject = new THREE.Line(geometry, lineMaterial);
            scene.add(curveObject);
        });
        
        // Packets
        const packetGeometry = new THREE.SphereGeometry(0.08, 8, 8);
        const packetMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const packets = curves.map(() => new THREE.Mesh(packetGeometry, packetMaterial));
        packets.forEach(p => scene.add(p));

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);

            const elapsedTime = clock.getElapsedTime();

            packets.forEach((packet, i) => {
                const time = (elapsedTime * 0.2 + i * 0.33) % 1;
                const point = curves[i].getPointAt(time);
                packet.position.copy(point);
            });
            
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            if (!container) return;
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if(container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };

    }, []);

    return <div ref={mountRef} className="absolute inset-0 z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />;
};


const CaseStudies: React.FC = () => {
  return (
    <section id="projects" className="py-48 px-6 bg-[#020202]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-48 text-center space-y-8"
        >
          <h2 className="text-xs font-mono text-amber-500 uppercase tracking-[0.8em] font-black">Strategic Operations</h2>
          <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">High-Value Systems</h3>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-80"
        >
          {CASE_STUDIES.map((study, idx) => (
            <motion.div 
              key={study.id} 
              variants={itemVariants}
              className={`flex flex-col lg:flex-row items-center gap-32 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 space-y-12">
                <div className="space-y-10">
                  <div className="inline-flex items-center space-x-3 px-6 py-2 bg-amber-500/5 border border-amber-500/20 rounded-full">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span className="text-[10px] font-mono text-amber-500 uppercase tracking-[0.2em] font-black">System Verification: 100%</span>
                  </div>
                  
                  <h4 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.8]">
                    {study.title}
                  </h4>
                  
                  <p className="text-gray-500 text-2xl leading-relaxed italic border-l-2 border-blue-500/40 pl-10 font-light max-w-xl">
                    &ldquo;{study.context}&rdquo;
                  </p>

                  <div className="p-12 bg-[#050505] border border-white/10 rounded-[3rem] shadow-4xl backdrop-blur-md relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 group-hover:w-full group-hover:opacity-5 transition-all duration-700"></div>
                    <div className="flex items-center space-x-4 mb-8">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                      <span className="text-xs font-mono uppercase font-black text-emerald-500 tracking-[0.3em]">Key Infrastructure Impact</span>
                    </div>
                    <p className="text-white text-3xl font-black leading-tight tracking-tighter">
                      {study.impact}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-6">
                    {study.tech.map(t => (
                      <span key={t} className="px-7 py-3 bg-white/5 rounded-2xl text-[10px] font-mono text-gray-400 border border-white/10 uppercase tracking-widest font-black transition-all hover:border-blue-500 hover:text-white">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-8 pt-12">
                    <button className="group flex items-center space-x-4 text-white font-black uppercase text-[10px] tracking-[0.5em] hover:text-blue-500 transition-colors">
                      <span>Repository Protocol</span>
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                    <div className="h-px flex-1 bg-white/10"></div>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full relative group">
                {/* Dynamic 3D HUD Interface */}
                <div className="absolute -inset-10 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-[5rem] blur-[100px] opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                
                <div className="relative aspect-[4/3] rounded-[4rem] bg-[#030303] border border-white/10 overflow-hidden shadow-5xl flex flex-col group">
                   {/* HUD Content */}
                   <div className="p-10 flex justify-between items-start z-20 relative">
                      <div className="space-y-3">
                        <div className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.4em] font-black">Cluster Analysis</div>
                        <div className="text-3xl font-black mono text-white leading-none">0x{Math.floor(Math.random()*0xFFFFFF).toString(16).toUpperCase()}</div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className={`font-mono text-3xl font-black flex items-center justify-end ${study.id === 'aqua' ? 'text-red-500' : 'text-emerald-500'}`}>
                           {study.id === 'aqua' ? '-' : '+'}{study.id === 'aqua' ? '98%' : '450%'}
                        </div>
                        <div className="text-[9px] font-mono text-gray-600 uppercase tracking-[0.3em] font-black">Load Optimization</div>
                      </div>
                   </div>

                   {/* Tech Background Suggestion */}
                   <div className="absolute inset-0 z-0">
                     <img 
                       src={study.id === 'streal' 
                          ? 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2832&auto=format&fit=crop' 
                          : study.id === 'jamforte'
                            ? 'https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2940&auto=format&fit=crop'
                            : 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2940&auto=format&fit=crop'
                       } 
                       alt={study.title}
                       className="w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-[2s] grayscale hover:grayscale-0"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent"></div>
                   </div>
                   
                   {/* Conditionally render the 3D visualization for the Streal project */}
                   {study.id === 'streal' && <BlockchainFlowViz />}
                   
                   <div className="mt-auto h-64 w-full z-10 p-10 flex flex-col justify-end">
                      <div className="flex justify-between items-end mb-4">
                        <span className="text-[9px] font-mono text-gray-500 uppercase font-black">Performance Vector</span>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-1 h-3 bg-blue-500/40 rounded-full"></div>
                          ))}
                        </div>
                      </div>
                      <div className="h-40 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={study.visualData?.map((v, i) => ({ value: v, time: i }))}>
                            <defs>
                              <linearGradient id={`color-${study.id}`} x1="0" y1="0" x2="0" y2="100%">
                                <stop offset="5%" stopColor={study.color} stopOpacity={0.4}/>
                                <stop offset="95%" stopColor={study.color} stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <Area 
                              type="monotone" 
                              dataKey="value" 
                              stroke={study.color} 
                              fillOpacity={1} 
                              fill={`url(#color-${study.id})`} 
                              strokeWidth={6}
                              animationDuration={3000}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                   </div>
                </div>

                {/* Status Indicator Bubble */}
                <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-[#050505] border border-white/10 rounded-[2.5rem] p-10 hidden xl:flex flex-col justify-between shadow-5xl animate-bounce">
                    <Globe className="w-10 h-10 text-blue-500" />
                    <div className="space-y-2">
                      <div className="text-[9px] font-mono text-gray-500 uppercase font-black tracking-widest">Global Status</div>
                      <div className="text-lg font-black uppercase tracking-tighter">Cluster Live</div>
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies;
