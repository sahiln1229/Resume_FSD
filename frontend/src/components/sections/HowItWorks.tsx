"use client";

import { motion } from 'framer-motion';
import { Upload, Cpu, FileCheck, Award, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import PerspectiveCard from '@/components/ui/PerspectiveCard';

const steps = [
    {
        icon: Upload,
        title: "Load Source",
        description: "Deploy your raw professional data to our diagnostic array.",
        color: "text-blue-500",
    },
    {
        icon: Cpu,
        title: "Neural Scan",
        description: "Models synchronize your experience with market demands.",
        color: "text-cyan-500",
    },
    {
        icon: FileCheck,
        title: "Refinement",
        description: "Execute context-aware logic to bridge narrative gaps.",
        color: "text-blue-400",
    },
    {
        icon: Award,
        title: "Deployment",
        description: "Finalize profile with high-integrity interview simulations.",
        color: "text-accent",
    }
];

export const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-32 bg-transparent relative overflow-hidden border-y border-border">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/5 text-accent border border-accent/10 mb-6"
                    >
                        <Zap size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Optimized Deployment</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tighter"
                    >
                        Precision <span className="text-gradient">Logic</span>
                    </motion.h2>
                    <p className="text-lg text-secondary max-w-2xl mx-auto font-medium">
                        Our engineering pipeline ensures consistent high-performance results for every career trajectory.
                    </p>
                </div>

                <div className="relative">
                    <div className="hidden lg:block absolute top-[60px] left-0 w-full h-[1px] bg-border z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, type: "spring", damping: 15 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <PerspectiveCard className="w-full">
                                    <div className="flex flex-col items-center">
                                        <div className="relative mb-10">
                                            <div className={cn(
                                                "w-24 h-24 rounded-3xl flex items-center justify-center shadow-3d transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative z-10 bg-card border border-border",
                                                step.color
                                            )}>
                                                <step.icon size={44} />
                                            </div>
                                            <div className="absolute -top-3 -right-3 w-10 h-10 rounded-2xl bg-accent text-white flex items-center justify-center font-black shadow-3d text-sm z-20 border-2 border-background">
                                                {i + 1}
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-black text-foreground mb-4 tracking-tight group-hover:text-accent transition-colors">{step.title}</h3>
                                        <p className="text-secondary font-medium leading-relaxed px-4">{step.description}</p>
                                    </div>
                                </PerspectiveCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
