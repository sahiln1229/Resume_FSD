"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { FloatingResume, FloatingIcon } from '@/components/3d/HeroScene';
import { Sparkles, Brain, Zap, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="text-left"
                >
                    <motion.div
                        variants={item}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-8"
                    >
                        <Sparkles size={16} />
                        <span className="text-xs font-black uppercase tracking-widest">Next-Gen Career Intelligence</span>
                    </motion.div>

                    <motion.h1
                        variants={item}
                        className="text-6xl md:text-8xl font-black text-foreground mb-8 tracking-tighter leading-[0.9]"
                    >
                        ELEVATE YOUR <br />
                        <span className="text-gradient">PROFESSIONAL</span> <br />
                        NARRATIVE
                    </motion.h1>

                    <motion.p
                        variants={item}
                        className="text-xl text-secondary max-w-lg mb-12 font-medium leading-relaxed"
                    >
                        Our specialized neural engine analyzes your experience against elite ATS filters and human intuition to secure your place in high-performance organizations.
                    </motion.p>

                    <motion.div variants={item} className="flex flex-col sm:flex-row gap-6">
                        <Link href="/upload">
                            <Button size="lg" className="h-20 px-12 text-lg shadow-3d font-black uppercase tracking-widest group">
                                Start Diagnostic
                                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button variant="outline" size="lg" className="h-20 px-12 text-lg font-black uppercase tracking-widest border-border/40 bg-white/5 backdrop-blur-md">
                                Analytics Portal
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative h-[600px] lg:h-[800px] hidden lg:block"
                >
                    <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full" />
                    <Canvas className="z-10 bg-transparent">
                        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={3} color="#3B82F6" />
                        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={3} color="#06B6D4" />

                        <FloatingResume />

                        <FloatingIcon position={[3, 2, 0]} color="#3B82F6" icon={Brain} delay={0} label="Neural" />
                        <FloatingIcon position={[-3, -2, 2]} color="#06B6D4" icon={Target} delay={1} label="ATS Sync" />
                        <FloatingIcon position={[3, -2, -2]} color="#3B82F6" icon={Zap} delay={2} label="Optimize" />

                        <OrbitControls enableZoom={false} enablePan={false} />
                    </Canvas>
                </motion.div>
            </div>
        </section>
    );
};
