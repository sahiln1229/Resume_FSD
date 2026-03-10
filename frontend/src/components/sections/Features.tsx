"use client";

import { motion } from 'framer-motion';
import { Zap, Brain, Target, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
    {
        title: "AI Analysis",
        description: "Deep-learning models scan your resume against 50+ ATS parameters for maximum placement potential.",
        icon: Brain,
        color: "text-blue-600"
    },
    {
        title: "ATS Optimization",
        description: "Identify and bridge skill gaps with intelligent keyword suggestions tailored to specific job roles.",
        icon: Target,
        color: "text-cyan-600"
    },
    {
        title: "Neural Feedback",
        description: "Get context-aware grammar and styling improvements that read naturally to human recruiters.",
        icon: Zap,
        color: "text-amber-600"
    },
    {
        title: "Market Benchmarking",
        description: "See how your experience stacks up against industry standards and leading competitors in your field.",
        icon: BarChart3,
        color: "text-indigo-600"
    }
];

export const Features = () => {
    return (
        <section id="features" className="py-24 relative overflow-hidden bg-transparent">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary border border-primary/10 mb-6"
                    >
                        <Zap size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Enterprise Capabilities</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tighter"
                    >
                        Master the <span className="text-gradient">Hiring Pipeline</span>
                    </motion.h2>
                    <p className="text-lg text-secondary max-w-2xl mx-auto font-medium">
                        Sophisticated AI tools designed to give you a definitive edge in the most competitive job markets.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -12, rotateX: 2, rotateY: 2 }}
                            className="premium-card p-10 group h-full bg-slate-900/40 backdrop-blur-xl border-white/5 shadow-3d hover:shadow-premium"
                        >
                            <div className={cn(
                                "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12",
                                "bg-white/5 border border-white/10 shadow-sm",
                                feature.color
                            )}>
                                <feature.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-foreground mb-4 tracking-tight">{feature.title}</h3>
                            <p className="text-secondary font-medium leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
