"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageSquare,
    Send,
    User,
    Bot,
    RefreshCcw,
    Brain,
    Sparkles,
    Zap,
    Target
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Navbar } from '@/components/layout/Navbar';
import Scene3D from '@/components/3d/Scene3D';
import Magnetic from '@/components/ui/Magnetic';
import PerspectiveCard from '@/components/ui/PerspectiveCard';

const initialMessages = [
    { id: 1, role: 'assistant', text: "Neural uplink established. I have analyzed your profile. Tell me about a time you resolved a critical structural integrity issue in a high-velocity project." },
];

export default function SimulatorPage() {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        const newMessages = [
            ...messages,
            { id: Date.now(), role: 'user', text: input },
            { id: Date.now() + 1, role: 'assistant', text: "Analyzing response... Cognitive patterns suggest high competency in structural logic. Processing follow-up query..." }
        ];
        setMessages(newMessages);
        setInput('');
    };

    return (
        <main className="min-h-screen pt-40 pb-20 px-6 relative overflow-hidden bg-transparent">
            <Scene3D />
            <Navbar />

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
                {/* Left Panel: Stats */}
                <div className="lg:col-span-1 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 text-accent mb-4">
                            <Sparkles size={20} />
                            <span className="text-sm font-black uppercase tracking-[0.3em]">Simulation Active</span>
                        </div>
                        <h1 className="text-5xl font-black text-foreground tracking-tighter">NEURAL <span className="text-gradient">DRILL</span></h1>
                    </motion.div>

                    {[
                        { label: "Stability", value: "94%", icon: Target, color: "text-blue-500" },
                        { label: "Confidence", value: "88%", icon: Brain, color: "text-cyan-500" },
                        { label: "Velocity", value: "Advanced", icon: Zap, color: "text-blue-400" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <PerspectiveCard>
                                <Card className="p-8 premium-card bg-card/40 backdrop-blur-xl border-border">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-border flex items-center justify-center ${stat.color}`}>
                                                <stat.icon size={28} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-secondary uppercase tracking-widest mb-1">{stat.label}</p>
                                                <p className="text-2xl font-black text-foreground">{stat.value}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </PerspectiveCard>
                        </motion.div>
                    ))}
                </div>

                {/* Right Panel: Chat */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-2 h-[700px]"
                >
                    <Card className="h-full premium-card flex flex-col bg-card/40 backdrop-blur-3xl border-border shadow-3d">
                        <div className="p-8 border-b border-border flex items-center justify-between bg-white/5">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent border border-accent/20 shadow-premium">
                                    <Bot size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-foreground tracking-tight">AI Interview Protocol</h2>
                                    <p className="text-sm font-bold text-secondary-accent uppercase tracking-widest">Model: CV-GPT Elite v4</p>
                                </div>
                            </div>
                            <Magnetic>
                                <button className="p-4 rounded-xl bg-white/5 text-secondary hover:text-accent border border-border transition-all">
                                    <RefreshCcw size={20} />
                                </button>
                            </Magnetic>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 space-y-10">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex gap-6 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-3d border border-border shrink-0 ${msg.role === 'assistant' ? 'bg-primary text-accent' : 'bg-accent text-white'
                                            }`}>
                                            {msg.role === 'assistant' ? <Bot size={24} /> : <User size={24} />}
                                        </div>
                                        <div className={`p-8 rounded-3xl font-medium leading-relaxed ${msg.role === 'assistant'
                                                ? 'bg-white/5 text-foreground border border-border rounded-tl-none'
                                                : 'bg-accent/80 text-white shadow-premium rounded-tr-none'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="p-8 bg-white/5 border-t border-border">
                            <div className="relative flex items-center">
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Enter response..."
                                    className="w-full bg-background/50 border border-border rounded-3xl p-8 pr-24 focus:ring-2 focus:ring-accent focus:border-transparent outline-none resize-none text-foreground font-medium placeholder:text-secondary/50 placeholder:font-black placeholder:uppercase placeholder:tracking-widest"
                                    rows={1}
                                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                                />
                                <div className="absolute right-4">
                                    <Magnetic>
                                        <button
                                            onClick={handleSend}
                                            className="w-16 h-16 bg-accent text-white rounded-2xl flex items-center justify-center hover:bg-accent/90 transition-all shadow-3d"
                                        >
                                            <Send size={24} />
                                        </button>
                                    </Magnetic>
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </main>
    );
}
