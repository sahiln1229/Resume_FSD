"use client";

import { motion } from 'framer-motion';
import { Zap, Brain, Target, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import PerspectiveCard from '@/components/ui/PerspectiveCard';

const features = [
    {
        title: "Deep Analysis",
        description: "Cognitive models verify your narrative against 50+ ATS protocols for maximum visibility.",
        icon: Brain,
        color: "text-blue-500"
    },
    {
        title: "ATS Interface",
        description: "Synchronize your skill set with high-tier keyword matrices tailored for global performance.",
        icon: Target,
        color: "text-cyan-500"
    },
    {
        title: "Velocity Logic",
        description: "Real-time linguistic refinement to ensure your profile resonates with elite human recruiters.",
        icon: Zap,
        color: "text-blue-400"
    },
    {
        title: "Market Insight",
        description: "Comprehensive benchmarking against Tier-1 industry standards and competitor behavior.",
        icon: BarChart3,
        color: "text-indigo-400"
    }
];

export const Features = () => {
    return (
        <section id="features" className="py-24 relative overflow-hidden bg-transparent">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/5 text-accent border border-accent/10 mb-6"
                    >
                        <Zap size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Core Infrastructure</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tighter"
                    >
                        Cognitive <span className="text-gradient">Performance</span>
                    </motion.h2>
                    <p className="text-lg text-secondary max-w-2xl mx-auto font-medium">
                        Sophisticated AI protocols engineered for rapid deployment and precise market alignment.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, type: "spring", damping: 20 }}
                        >
                            <PerspectiveCard className="h-full">
                                <div className="premium-card p-10 group h-full bg-card/40 backdrop-blur-xl border-border shadow-3d hover:shadow-hover">
                                    <div className={cn(
                                        "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12",
                                        "bg-white/5 border border-border shadow-sm",
                                        feature.color
                                    )}>
                                        <feature.icon size={32} />
                                    </div>
                                    <h3 className="text-2xl font-black text-foreground mb-4 tracking-tight">{feature.title}</h3>
                                    <p className="text-secondary font-medium leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </PerspectiveCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
