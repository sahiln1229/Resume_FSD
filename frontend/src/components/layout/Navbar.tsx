"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { FileText } from 'lucide-react';

export const Navbar = () => {
    return (
        <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 glass rounded-3xl border border-white/10 shadow-3d">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-premium">
                        <FileText size={24} />
                    </div>
                    <span className="text-2xl font-black text-foreground tracking-tighter">Resume<span className="text-primary">AI</span></span>
                </Link>

                <div className="hidden md:flex items-center gap-10">
                    <Link href="/#features" className="text-sm font-bold uppercase tracking-widest text-secondary hover:text-primary transition-all">Features</Link>
                    <Link href="/#how-it-works" className="text-sm font-bold uppercase tracking-widest text-secondary hover:text-primary transition-all">Process</Link>
                    <Link href="/dashboard" className="text-sm font-bold uppercase tracking-widest text-secondary hover:text-primary transition-all">Dashboard</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/upload">
                        <Button size="lg" className="h-12 px-8 shadow-3d font-black uppercase tracking-widest text-[10px]">
                            Launch App
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
