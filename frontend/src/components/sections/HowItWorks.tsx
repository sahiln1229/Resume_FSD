"use client";

import { motion } from 'framer-motion';
import { Upload, Cpu, FileCheck, Award, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
    {
        icon: Upload,
        title: "Initialize Scan",
        description: "Upload your source materials to our neural diagnostic engine.",
        color: "text-blue-600",
    },
    {
        icon: Cpu,
        title: "AI Analysis",
        description: "Deep-learning models scan for keywords, gaps, and style.",
        color: "text-cyan-600",
    },
    {
        icon: FileCheck,
        title: "Neural Feedback",
        description: "Review context-aware improvements and export your profile.",
        color: "text-indigo-600",
    },
    {
        icon: Award,
        title: "Master Interview",
        description: "Refine your performance with our real-time AI interview coach.",
        color: "text-emerald-600",
    }
];

export const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-32 bg-transparent relative overflow-hidden border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary border border-primary/10 mb-6"
                    >
                        <Zap size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Optimized Process</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tighter"
                    >
                        Precision <span className="text-gradient">Workflow</span>
                    </motion.h2>
                    <p className="text-lg text-secondary max-w-2xl mx-auto font-medium">
                        Our specialized engineering pipeline ensures your profile is optimized for elite-tier ATS filters and human recruiters alike.
                    </p>
                </div>

                <div className="relative">
                    <div className="hidden lg:block absolute top-[52px] left-0 w-full h-[2px] bg-white/5 -translate-y-1/2 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="relative mb-10">
                                    <div className={cn(
                                        "w-24 h-24 rounded-3xl flex items-center justify-center shadow-3d transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative z-10 bg-slate-900/50 backdrop-blur-xl border border-white/10",
                                        step.color
                                    )}>
                                        <step.icon size={44} />
                                    </div>
                                    <div className="absolute -top-3 -right-3 w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-black shadow-3d text-sm z-20 border-2 border-slate-900">
                                        {i + 1}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-foreground mb-4 tracking-tight group-hover:text-primary transition-colors">{step.title}</h3>
                                <p className="text-secondary font-medium leading-relaxed pr-4 pl-4">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
