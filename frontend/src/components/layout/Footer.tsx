"use client";

import Link from 'next/link';
import { FileText, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-transparent border-t border-white/5 py-24 relative overflow-hidden">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1 bg-primary/20 blur-xl" />

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-8 group">
                            <div className="w-10 h-10 bg-primary/20 text-primary border border-white/10 rounded-xl flex items-center justify-center shadow-premium group-hover:rotate-12 transition-all duration-500">
                                <FileText size={20} />
                            </div>
                            <span className="text-2xl font-black text-secondary tracking-tighter">Resume<span className="text-primary">AI</span></span>
                        </Link>
                        <p className="text-foreground/60 max-w-sm text-lg leading-relaxed font-medium">
                            The elite diagnostic engine for modern careers. Engineered for speed, precision, and global performance.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-black text-secondary mb-8 uppercase tracking-[0.2em] text-sm">Deployment</h4>
                        <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
                            <li><Link href="/upload" className="text-foreground/30 hover:text-primary transition-colors">Resume Scan</Link></li>
                            <li><Link href="/simulator" className="text-foreground/30 hover:text-accent transition-colors">Neural Coach</Link></li>
                            <li><Link href="/dashboard" className="text-foreground/30 hover:text-secondary transition-colors">Analytics</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-secondary mb-8 uppercase tracking-[0.2em] text-sm">Network</h4>
                        <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
                            <li><Link href="#" className="text-foreground/30 hover:text-primary transition-colors">Open Source</Link></li>
                            <li><Link href="#" className="text-foreground/30 hover:text-primary transition-colors">Security</Link></li>
                            <li><Link href="#" className="text-foreground/30 hover:text-primary transition-colors">Legal</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-8">
                    <p className="text-xs font-black text-foreground/20 uppercase tracking-[0.3em]">
                        © 2024 AI ARCHIVE • ALL RIGHTS RESERVED
                    </p>
                    <div className="flex items-center gap-10">
                        <Link href="#" className="text-foreground/20 hover:text-primary hover:scale-125 transition-all duration-500"><Github size={22} /></Link>
                        <Link href="#" className="text-foreground/20 hover:text-accent hover:scale-125 transition-all duration-500"><Twitter size={22} /></Link>
                        <Link href="#" className="text-foreground/20 hover:text-primary hover:scale-125 transition-all duration-500"><Linkedin size={22} /></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
