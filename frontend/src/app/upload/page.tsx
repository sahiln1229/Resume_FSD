"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Navbar } from '@/components/layout/Navbar';
import Scene3D from '@/components/3d/Scene3D';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = () => setIsDragging(false);

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) setFile(droppedFile);
    };

    const handleUpload = () => {
        setIsProcessing(true);
        setTimeout(() => {
            router.push('/dashboard');
        }, 2000);
    };

    return (
        <main className="min-h-screen pt-40 pb-20 px-4 relative overflow-hidden bg-transparent">
            <Scene3D />

            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black text-foreground mb-6 tracking-tighter"
                    >
                        INITIALIZE <span className="text-gradient">SCAN</span>
                    </motion.h1>
                    <p className="text-lg text-secondary font-medium uppercase tracking-[0.2em]">
                        Deploy your narrative to our neural engine
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="p-0 overflow-hidden premium-card bg-slate-900/50 backdrop-blur-3xl border-white/5 shadow-3d">
                        <div
                            className={cn(
                                "p-20 border-4 border-dashed transition-all duration-700 flex flex-col items-center justify-center text-center relative",
                                isDragging ? "border-primary bg-primary/10 scale-[0.98]" : "border-white/5 bg-transparent hover:border-primary/20",
                                file ? "border-none" : ""
                            )}
                            onDragOver={onDragOver}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}
                        >
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => e.target.files && setFile(e.target.files[0])}
                            />

                            {!file ? (
                                <div className="group">
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        className="w-32 h-32 rounded-3xl bg-slate-800 border border-white/10 flex items-center justify-center mb-10 mx-auto shadow-3d group-hover:scale-110 group-hover:rotate-6 transition-all duration-700"
                                    >
                                        <Upload size={52} className="text-primary" />
                                    </motion.div>
                                    <h3 className="text-2xl font-black text-foreground mb-4 tracking-tight">Drop your resume here</h3>
                                    <p className="text-secondary font-bold uppercase tracking-widest text-xs">Awaiting Source Upload (PDF, DOCX)</p>
                                </div>
                            ) : (
                                <div className="w-full">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center justify-between p-12 bg-slate-50 rounded-3xl mb-12 border border-slate-100 shadow-inner"
                                    >
                                        <div className="flex items-center gap-10">
                                            <div className="w-24 h-24 bg-slate-800 text-primary rounded-2xl flex items-center justify-center shadow-3d border border-white/10">
                                                <FileText size={48} />
                                            </div>
                                            <div className="text-left">
                                                <h4 className="text-xl font-black text-foreground mb-1">{file.name}</h4>
                                                <p className="text-sm font-bold text-secondary uppercase tracking-widest">{(file.size / 1024 / 1024).toFixed(2)} MB • READY</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setFile(null)}
                                            className="w-16 h-16 flex items-center justify-center bg-white/5 text-slate-400 hover:text-red-500 rounded-2xl transition-all duration-500 shadow-sm border border-white/5 group"
                                        >
                                            <X size={32} className="group-hover:rotate-90 transition-transform" />
                                        </button>
                                    </motion.div>

                                    <Button
                                        size="lg"
                                        onClick={handleUpload}
                                        disabled={isProcessing}
                                        className="w-full h-24 text-2xl font-black uppercase tracking-[0.2em] shadow-3d group relative overflow-hidden"
                                    >
                                        {isProcessing ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            >
                                                <X className="rotate-45" />
                                            </motion.div>
                                        ) : (
                                            <>
                                                Initialize Neural Sync
                                                <ArrowRight className="ml-4 group-hover:translate-x-3 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Card>
                </motion.div>
            </div>
        </main>
    );
}
