"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BrainCircuit, Mic, Clock, ArrowRight, ArrowLeft, Send, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';

const questions = [
    {
        id: 1,
        question: "Tell me about a time you solved a complex technical challenge under significant pressure.",
        context: "The recruiter is looking for your debugging process and composure."
    },
    {
        id: 2,
        question: "How do you handle architectural disagreements within a distributed engineering team?",
        context: "Assessing conflict resolution and technical trade-off logic."
    }
];

export default function SimulatorPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsSubmitting(true);
        }
    };

    return (
        <main className="min-h-screen pt-40 pb-20 bg-transparent px-4 relative overflow-hidden">
            <Navbar />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="flex items-center justify-between mb-12">
                    <Link href="/dashboard" className="flex items-center gap-3 text-secondary hover:text-primary transition-all group">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center shadow-sm group-hover:shadow-3d transition-all">
                            <ArrowLeft size={20} />
                        </div>
                        <span className="font-black uppercase tracking-widest text-xs">Command Center</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-slate-900 border border-white/5 shadow-3d">
                            <Clock size={16} className="text-primary" />
                            <span className="text-xs font-black text-foreground uppercase tracking-widest">08:45 Left</span>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <div className="flex gap-2 mb-6">
                        {questions.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${i <= currentStep ? 'bg-primary' : 'bg-white/5'}`}
                            />
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        whileHover={{ rotateX: 1, rotateY: 1 }}
                        className="perspective-1000"
                    >
                        <Card className="p-12 border-white/5 shadow-3d relative overflow-hidden bg-slate-900/50 backdrop-blur-3xl premium-card transform-gpu">
                            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                                <BrainCircuit size={240} />
                            </div>

                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-10">
                                    <Sparkles size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Neural Question {currentStep + 1}</span>
                                </div>

                                <h2 className="text-3xl md:text-5xl font-black text-foreground mb-12 tracking-tighter leading-[1.1]">
                                    {questions[currentStep].question}
                                </h2>

                                <div className="space-y-8">
                                    <div className="p-8 rounded-[2rem] bg-indigo-500/5 border border-primary/10 mb-12">
                                        <p className="text-sm font-bold text-secondary italic leading-relaxed">
                                            💡 {questions[currentStep].context}
                                        </p>
                                    </div>

                                    <div className="relative group">
                                        <textarea
                                            placeholder="Synthesize your response..."
                                            className="w-full h-48 p-8 rounded-[2rem] bg-white/5 border border-white/10 focus:border-primary focus:bg-white/10 focus:ring-8 focus:ring-primary/5 transition-all outline-none resize-none font-bold text-lg text-foreground shadow-inner"
                                            value={answers[questions[currentStep].id] || ''}
                                            onChange={(e) => setAnswers({ ...answers, [questions[currentStep].id]: e.target.value })}
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8">
                                        <button className="flex items-center gap-3 text-secondary font-black uppercase tracking-widest text-xs hover:text-primary transition-all group">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-all">
                                                <Mic size={20} />
                                            </div>
                                            Begin Voice Input
                                        </button>

                                        <Button
                                            size="lg"
                                            onClick={handleNext}
                                            className="h-20 px-12 text-lg shadow-3d font-black uppercase tracking-widest group bg-primary"
                                        >
                                            Submit Response
                                            <Send className="ml-3 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" size={20} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </AnimatePresence>
            </div>
        </main>
    );
}
