"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import {
    BarChart3,
    Brain,
    TrendingUp,
    Download,
    Sparkles,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Search,
    Type,
    Layout,
    Check,
    X,
    MessageSquare
} from 'lucide-react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    ResponsiveContainer
} from 'recharts';
import { Navbar } from '@/components/layout/Navbar';
import PerspectiveCard from '@/components/ui/PerspectiveCard';
import Magnetic from '@/components/ui/Magnetic';
import Scene3D from '@/components/3d/Scene3D';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const data = [
    { subject: 'ATS Score', A: 85, fullMark: 100 },
    { subject: 'Keywords', A: 92, fullMark: 100 },
    { subject: 'Grammar', A: 78, fullMark: 100 },
    { subject: 'Structure', A: 95, fullMark: 100 },
    { subject: 'Impact', A: 82, fullMark: 100 },
];

const improvedBullets = [
    {
        original: "Managed a team of developers to build web apps.",
        improved: "Orchestrated a high-performance team of 8 engineers, delivering 4 mission-critical web applications with a 25% increase in deployment velocity.",
        impact: "Leadership & Scalability"
    },
    {
        original: "Used React to create responsive user interfaces.",
        improved: "Optimized frontend architecture using Next.js and Tailwind CSS, achieving a 40% improvement in First Contentful Paint across all mobile platforms.",
        impact: "Performance Optimization"
    }
];

const grammarFixes = [
    { error: "Experience in building...", correction: "Proven track record in architecting...", type: "Tone" },
    { error: "Responsible for managing...", correction: "Spearheaded management of...", type: "Action Verb" },
];

const sectionFeedback = [
    { section: "Experience", score: 88, feedback: "Highly quantitative and impact-driven. Minor formatting issues in early roles.", status: "Strong" },
    { section: "Education", score: 95, feedback: "Clearly presented with relevant honors. Perfect layout.", status: "Elite" },
    { section: "Skills", score: 72, feedback: "Good categorization, but missing several keywords found in Tier-1 descriptions.", status: "Improve" },
];

export default function DashboardPage() {
    const scoreRef = useRef(null);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        gsap.fromTo(scoreRef.current,
            { innerText: 0 },
            {
                innerText: 85,
                duration: 2,
                snap: { innerText: 1 },
                ease: "power2.out",
                scrollTrigger: {
                    trigger: scoreRef.current,
                    start: "top 80%",
                }
            }
        );
    }, []);

    return (
        <main className="min-h-screen pt-40 pb-20 px-6 relative overflow-hidden bg-transparent">
            <Scene3D />
            <Navbar />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 text-accent mb-4"
                        >
                            <Sparkles size={20} />
                            <span className="text-sm font-black uppercase tracking-[0.3em]">Neural Verification Complete</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black text-foreground tracking-tighter"
                        >
                            DASHBOARD <span className="text-gradient">ANALYSIS</span>
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex gap-4"
                    >
                        <Magnetic>
                            <Link href="/interview">
                                <button className="h-16 px-8 rounded-2xl bg-accent hover:bg-accent/90 text-white font-black uppercase tracking-widest transition-all flex items-center gap-3 shadow-3d group">
                                    <MessageSquare size={20} />
                                    Interview Me
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </Magnetic>
                    </motion.div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column - Score & Matrix */}
                    <div className="lg:col-span-4 space-y-8">
                        <PerspectiveCard>
                            <Card className="p-10 premium-card bg-card/60 backdrop-blur-3xl border-white/10 shadow-3d relative overflow-hidden group">
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/20 rounded-full blur-[100px] group-hover:bg-accent/40 transition-colors" />
                                <h3 className="text-xs font-black text-secondary tracking-[0.3em] uppercase mb-12">Resume Integrity Score</h3>
                                <div className="relative w-full aspect-square flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                                        <motion.circle
                                            initial={{ strokeDashoffset: '264%' }}
                                            whileInView={{ strokeDashoffset: `${264 * (1 - 0.85)}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 2, ease: "easeOut" }}
                                            cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="8" fill="transparent"
                                            strokeDasharray="264%" className="text-accent"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span ref={scoreRef} className="text-7xl font-black text-foreground">85</span>
                                        <span className="text-[10px] font-black text-secondary tracking-[0.5em] uppercase">Status: Elite</span>
                                    </div>
                                </div>
                            </Card>
                        </PerspectiveCard>

                        <PerspectiveCard>
                            <Card className="p-8 premium-card bg-card/60 backdrop-blur-3xl border-white/10 shadow-3d">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xs font-black text-secondary tracking-[.3em] uppercase">Skill Gap Matrix</h3>
                                    <Brain className="text-accent" size={16} />
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-between">
                                        <span className="text-xs font-black text-green-500 uppercase tracking-widest">Matched Skills</span>
                                        <span className="text-sm font-black text-foreground">14</span>
                                    </div>
                                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-between">
                                        <span className="text-xs font-black text-red-500 uppercase tracking-widest">Missing Skills</span>
                                        <span className="text-sm font-black text-foreground">6</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-6">
                                        {['System Design', 'CI/CD', 'GraphQL', 'Redis', 'WebSockets', 'Kubernetes'].map((skill) => (
                                            <span key={skill} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black text-secondary uppercase tracking-widest hover:border-accent/40 transition-colors">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </PerspectiveCard>
                    </div>

                    {/* Right Column - Analysis Tabs */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="flex gap-2 p-1.5 glass rounded-2xl border-white/10 w-fit">
                            {['bullets', 'grammar', 'feedback'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={cn(
                                        "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500",
                                        activeTab === tab ? "bg-accent text-white shadow-3d" : "text-secondary hover:text-foreground"
                                    )}
                                >
                                    {tab === 'bullets' ? 'Bullet Optimizer' : tab === 'grammar' ? 'Grammar Fixes' : 'Section Feedback'}
                                </button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <PerspectiveCard>
                                    <Card className="p-10 premium-card bg-card/60 backdrop-blur-3xl border-white/10 shadow-3d min-h-[600px]">
                                        {activeTab === 'bullets' && (
                                            <div className="space-y-12">
                                                <div className="flex items-center gap-4 mb-8">
                                                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                                                        <TrendingUp size={24} />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-black text-foreground tracking-tight">Impact Optimization</h3>
                                                        <p className="text-xs font-black text-secondary tracking-widest uppercase">Converting activities to achievements</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-8">
                                                    {improvedBullets.map((item, i) => (
                                                        <div key={i} className="space-y-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="px-2 py-1 rounded bg-accent/10 border border-accent/20 text-[8px] font-black text-accent uppercase tracking-widest">
                                                                    {item.impact}
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 border-dashed">
                                                                <div>
                                                                    <div className="text-[10px] font-black text-red-500/50 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                                        <X size={10} /> Original
                                                                    </div>
                                                                    <p className="text-sm font-medium text-secondary">{item.original}</p>
                                                                </div>
                                                                <div className="relative">
                                                                    <div className="text-[10px] font-black text-green-500/50 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                                        <CheckCircle2 size={10} /> Improved
                                                                    </div>
                                                                    <p className="text-sm font-bold text-foreground leading-relaxed">{item.improved}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === 'grammar' && (
                                            <div className="space-y-12">
                                                <div className="flex items-center gap-4 mb-8">
                                                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                                                        <Type size={24} />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-black text-foreground tracking-tight">Linguistic Diagnostics</h3>
                                                        <p className="text-xs font-black text-secondary tracking-widest uppercase">Syntax, Tone & Veracity Check</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    {grammarFixes.map((item, i) => (
                                                        <div key={i} className="flex items-start gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 group hover:border-accent/40 transition-colors">
                                                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-secondary-accent shrink-0 font-black">
                                                                {i + 1}
                                                            </div>
                                                            <div className="space-y-3 flex-1">
                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-[10px] font-black text-accent uppercase tracking-widest">{item.type}</span>
                                                                    <div className="h-px bg-white/10 flex-1" />
                                                                </div>
                                                                <div className="flex flex-col md:flex-row gap-6 md:items-center">
                                                                    <p className="text-sm text-secondary/60 line-through italic">{item.error}</p>
                                                                    <ArrowRight className="text-accent shrink-0 hidden md:block" size={16} />
                                                                    <p className="text-sm font-bold text-foreground uppercase tracking-tight">{item.correction}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === 'feedback' && (
                                            <div className="space-y-12">
                                                <div className="flex items-center gap-4 mb-8">
                                                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                                                        <Layout size={24} />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-black text-foreground tracking-tight">Section Feedback</h3>
                                                        <p className="text-xs font-black text-secondary tracking-widest uppercase">Structural Quality Analysis</p>
                                                    </div>
                                                </div>
                                                <div className="grid gap-6">
                                                    {sectionFeedback.map((item, i) => (
                                                        <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group">
                                                            <div className="absolute top-0 right-0 p-8">
                                                                <div className="text-4xl font-black text-white/5 group-hover:text-accent/10 transition-colors">{item.score}%</div>
                                                            </div>
                                                            <div className="flex items-center gap-3 mb-4">
                                                                <span className="text-[10px] font-black uppercase tracking-widest text-accent">Section: {item.section}</span>
                                                                <div className={cn(
                                                                    "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest",
                                                                    item.status === 'Strong' ? "bg-green-500/10 text-green-500" :
                                                                        item.status === 'Elite' ? "bg-accent/10 text-accent" : "bg-red-500/10 text-red-500"
                                                                )}>
                                                                    {item.status}
                                                                </div>
                                                            </div>
                                                            <p className="text-sm font-medium text-secondary max-w-2xl leading-relaxed">
                                                                {item.feedback}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </Card>
                                </PerspectiveCard>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </main>
    );
}
