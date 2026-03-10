"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import {
    BarChart3,
    Target,
    Brain,
    Zap,
    CheckCircle2,
    TrendingUp,
    AlertCircle,
    Download
} from 'lucide-react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    ResponsiveContainer
} from 'recharts';

const data = [
    { subject: 'ATS Score', A: 85, fullMark: 100 },
    { subject: 'Keywords', A: 92, fullMark: 100 },
    { subject: 'Grammar', A: 78, fullMark: 100 },
    { subject: 'Structure', A: 95, fullMark: 100 },
    { subject: 'Impact', A: 82, fullMark: 100 },
];

export default function DashboardPage() {
    return (
        <main className="min-h-screen pt-40 pb-20 px-6 relative overflow-hidden bg-transparent">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 text-primary mb-4"
                        >
                            <TrendingUp size={20} />
                            <span className="text-sm font-black uppercase tracking-[0.3em]">Analysis Complete</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black text-foreground tracking-tighter"
                        >
                            YOUR <span className="text-gradient">PROFILE</span>
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex gap-4"
                    >
                        <button className="h-16 px-8 rounded-2xl bg-white/5 border border-white/10 text-foreground font-bold hover:bg-white/10 transition-all flex items-center gap-3">
                            <Download size={20} />
                            Export PDF
                        </button>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <Card className="lg:col-span-2 p-10 premium-card bg-slate-900/50 backdrop-blur-xl border-white/5">
                        <div className="flex items-center justify-between mb-12">
                            <h3 className="text-2xl font-black text-foreground tracking-tight">Technical Proficiency</h3>
                            <div className="px-4 py-2 rounded-xl bg-primary/10 text-primary text-xs font-black uppercase tracking-widest">Global Ranking: Top 2%</div>
                        </div>
                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                                    <PolarGrid stroke="rgba(255,255,255,0.05)" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 'bold' }} />
                                    <Radar
                                        name="Score"
                                        dataKey="A"
                                        stroke="#2563EB"
                                        fill="#2563EB"
                                        fillOpacity={0.3}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card className="p-10 premium-card flex flex-col items-center justify-center text-center bg-slate-900/50 backdrop-blur-xl border-white/5">
                        <h3 className="text-xl font-black text-secondary uppercase tracking-[0.2em] mb-12">Aggregate Score</h3>
                        <div className="relative w-64 h-64 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="128"
                                    cy="128"
                                    r="110"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    className="text-white/5"
                                />
                                <circle
                                    cx="128"
                                    cy="128"
                                    r="110"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    strokeDasharray={2 * Math.PI * 110}
                                    strokeDashoffset={2 * Math.PI * 110 * (1 - 0.85)}
                                    className="text-primary"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-7xl font-black text-foreground">85</span>
                                <span className="text-sm font-black text-secondary tracking-widest">/ 100</span>
                            </div>
                        </div>
                        <p className="mt-12 text-secondary font-medium leading-relaxed">
                            Your resume exceeds <span className="text-foreground font-bold">85%</span> of industry benchmarks for this role.
                        </p>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { title: "Keywords", value: "92%", icon: Target, status: "Optimal" },
                        { title: "Impact", value: "High", icon: Zap, status: "Advanced" },
                        { title: "Network", value: "Strong", icon: Brain, status: "Sync" },
                        { title: "Market", value: "Tier 1", icon: BarChart3, status: "High" }
                    ].map((stat, i) => (
                        <Card key={i} className="p-8 premium-card bg-slate-900/50 backdrop-blur-xl border-white/5 group">
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <stat.icon size={24} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{stat.status}</span>
                            </div>
                            <h4 className="text-sm font-black text-secondary uppercase tracking-widest mb-1">{stat.title}</h4>
                            <div className="text-3xl font-black text-foreground">{stat.value}</div>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    );
}
