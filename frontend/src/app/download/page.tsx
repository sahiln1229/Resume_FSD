"use client";

import { motion } from 'framer-motion';
import { Download, FileText, CheckCircle2, ArrowLeft, Copy, Share2, Sparkles, Wand2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';

export default function DownloadPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-background px-4">
            <Navbar />
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-start justify-between mb-12 gap-6">
                    <div>
                        <Link href="/dashboard" className="flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors mb-6">
                            <ArrowLeft size={18} />
                            Return to Dashboard
                        </Link>
                        <h1 className="text-4xl font-extrabold text-secondary mb-3">Your Enhanced Resume</h1>
                        <p className="text-foreground/60">Optimized for ATS filters and professional excellence.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button size="lg" className="gap-2 shadow-premium">
                            <Download size={20} />
                            Download PDF
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Preview Panel */}
                    <div className="lg:col-span-2">
                        <Card className="p-0 border-none shadow-premium bg-white overflow-hidden min-h-[800px]">
                            <div className="p-12 space-y-8">
                                {/* Header Section */}
                                <div className="text-center pb-8 border-b border-border">
                                    <h2 className="text-3xl font-black text-secondary uppercase tracking-tight">John Doe</h2>
                                    <p className="text-primary font-bold mt-1">Senior Software Engineer</p>
                                    <p className="text-foreground/50 text-sm mt-3">San Francisco, CA • john.doe@example.com • linkedin.com/in/johndoe</p>
                                </div>

                                {/* Experience Preview */}
                                <div className="space-y-6">
                                    <h3 className="text-sm font-black text-secondary uppercase tracking-widest border-l-4 border-primary pl-4">Professional Experience</h3>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-secondary">Senior Frontend Engineer</h4>
                                                <p className="text-sm text-foreground/70">TechCorp Solutions</p>
                                            </div>
                                            <span className="text-xs font-bold text-foreground/40 uppercase">2021 – Present</span>
                                        </div>
                                        <ul className="space-y-3">
                                            {[
                                                "Architected a high-performance frontend using Next.js 15, achieving a 40% reduction in Core Web Vitals metrics across enterprise applications.",
                                                "Spearheaded the migration of legacy systems to a modern TypeScript codebase, improving developer velocity and reducing bug count by 25%.",
                                                "Leveraged React Server Components to optimize data fetching, resulting in 30% faster page transitions."
                                            ].map((bullet, i) => (
                                                <li key={i} className="flex gap-4 group">
                                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                                    <p className="text-sm text-secondary leading-relaxed">{bullet}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Skills Preview */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-black text-secondary uppercase tracking-widest border-l-4 border-primary pl-4">Technical Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL", "AWS", "Framer Motion"].map((skill, i) => (
                                            <span key={i} className="px-3 py-1 rounded-md bg-background border border-border text-xs font-bold text-secondary">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Actions & Insights */}
                    <div className="space-y-6">
                        <Card className="bg-secondary text-white border-none relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Wand2 size={60} />
                            </div>
                            <h4 className="font-bold mb-4 flex items-center gap-2">
                                <Sparkles size={16} className="text-accent" />
                                AI Enhancements Made
                            </h4>
                            <ul className="space-y-4">
                                {[
                                    "Used high-impact action verbs",
                                    "Quantified project outcomes",
                                    "Fixed 3 structural errors",
                                    "Optimized for 12 keywords"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                                        <CheckCircle2 size={16} className="text-accent" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        <Card className="space-y-4">
                            <h4 className="font-bold text-secondary">Quick Actions</h4>
                            <Button variant="outline" className="w-full justify-start gap-3">
                                <Copy size={18} />
                                Copy Raw Text
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3">
                                <Share2 size={18} />
                                Share Link
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-3 text-foreground/50">
                                <FileText size={18} />
                                Customize Template
                            </Button>
                        </Card>

                        <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                            <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">Pro Tip</p>
                            <p className="text-sm text-secondary">
                                Tailoring your resume for each specific job increases your interview rate by up to 60%. Use our Dashboard to tweak keywords for every application.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
