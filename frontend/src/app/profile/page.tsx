"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Mail,
    Briefcase,
    GraduationCap,
    Calendar,
    Building2,
    Upload,
    CheckCircle2,
    ArrowRight,
    Camera,
    FileText,
    Sparkles,
    ShieldCheck,
    Save,
    Linkedin,
    Wand2,
    Loader2
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Navbar } from '@/components/layout/Navbar';
import Scene3D from '@/components/3d/Scene3D';
import Magnetic from '@/components/ui/Magnetic';
import PerspectiveCard from '@/components/ui/PerspectiveCard';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

interface ProfileData {
    name: string;
    age: string;
    email: string;
    college: string;
    officeName: string;
    degree: string;
    qualification: string;
    profileImage: string | null;
    certificate: string | null;
    linkedinSummary: string;
}

const initialData: ProfileData = {
    name: '',
    age: '',
    email: '',
    college: '',
    officeName: '',
    degree: '',
    qualification: '',
    profileImage: null,
    certificate: null,
    linkedinSummary: '',
};

const InputField = ({ label, icon: Icon, placeholder, value, onChange, type = "text" }: any) => (
    <div className="space-y-2">
        <label className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] ml-2">{label}</label>
        <div className="relative">
            <Icon className="absolute left-6 top-1/2 -translate-y-1/2 text-accent/50" size={18} />
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-foreground font-medium transition-all hover:bg-white/10"
            />
        </div>
    </div>
);

export default function ProfilePage() {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(true);
    const [data, setData] = useState<ProfileData>(initialData);
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'personal' | 'academic' | 'professional' | 'linkedin'>('personal');
    const [isGeneratingLinkedin, setIsGeneratingLinkedin] = useState(false);
    const [linkedinError, setLinkedinError] = useState<string>('');

    // Load data from backend on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                if (!token) return;

                const response = await axios.get('http://localhost:5000/api/user/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const backendData = response.data;
                const authInfoStr = localStorage.getItem('auth_user_info');
                const authUser = authInfoStr ? JSON.parse(authInfoStr) : {};

                setData({
                    ...initialData,
                    name: backendData.name || authUser.name || '',
                    email: backendData.email || authUser.email || '',
                    age: backendData.phone || '', // Using phone as age for now
                    college: backendData.location || '',
                    linkedinSummary: backendData.aboutMe || '',
                    profileImage: backendData.profileImage 
                        ? `http://localhost:5000/api/user/public/profile-image/${backendData._id}?v=${Date.now()}` 
                        : null
                });
                
                if (backendData.name) setIsEditing(false);
            } catch (err) {
                console.error('Fetch profile error:', err);
            }
        };

        fetchProfile();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                router.push('/login');
                return;
            }

            // 1. Save text data
            const profilePayload = {
                name: data.name,
                phone: data.age, // Mapping age field from UI to backend phone/age
                location: data.college, // Mapping college to location for demo
                aboutMe: data.linkedinSummary,
                skills: [],
                socialLinks: { linkedin: '', github: '', portfolio: '' }
            };

            await axios.put('http://localhost:5000/api/user/profile', profilePayload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            localStorage.setItem('user_profile_data', JSON.stringify(data));
            setIsEditing(false);
            router.push('/');
        } catch (err) {
            console.error('Save profile error:', err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            // Local preview
            const reader = new FileReader();
            reader.onload = (event) => {
                setData(prev => ({ ...prev, profileImage: event.target?.result as string }));
            };
            reader.readAsDataURL(file);

            // Upload to backend
            try {
                const token = localStorage.getItem('auth_token');
                const formData = new FormData();
                formData.append('profileImage', file);

                await axios.post('http://localhost:5000/api/user/profile-image', formData, {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } catch (err) {
                console.error('Image upload error:', err);
            }
        }
    };

    const handleCertificateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData({ ...data, certificate: e.target.files[0].name });
        }
    };

    const generateLinkedinSummaryFromResume = async () => {
        try {
            setIsGeneratingLinkedin(true);
            setLinkedinError('');
            const resumeId = localStorage.getItem('currentResumeId');
            if (!resumeId) {
                setLinkedinError('Please upload a resume first to generate LinkedIn summary');
                return;
            }
            const response = await axios.get(`http://localhost:5000/api/resumeAnalysis/${resumeId}`);
            const aiResult = response.data.aiAnalysisResult?.linkedinSummary;
            if (aiResult) {
                setData({ ...data, linkedinSummary: aiResult });
                setLinkedinError('');
            } else {
                setLinkedinError('No LinkedIn summary found in resume analysis');
            }
        } catch (err) {
            setLinkedinError('Failed to fetch LinkedIn summary from resume analysis');
            console.error('LinkedIn summary fetch error:', err);
        } finally {
            setIsGeneratingLinkedin(false);
        }
    };

    return (
        <main className="min-h-screen pt-40 pb-20 px-6 relative overflow-hidden bg-transparent">
            <Scene3D />
            <Navbar />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 mb-8"
                    >
                        <ShieldCheck size={16} />
                        <span className="text-xs font-black uppercase tracking-widest">Neural Identity Management</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black text-foreground mb-4 tracking-tighter"
                    >
                        {isEditing ? 'UPDATE' : 'PROFILE'} <span className="text-gradient">MATRIX</span>
                    </motion.h1>
                    <p className="text-secondary font-medium">
                        Synchronize your professional parameters across the neural network.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar / Profile Image */}
                    <div className="space-y-8">
                        <PerspectiveCard>
                            <Card className="p-8 premium-card bg-card/40 backdrop-blur-3xl border-border text-center overflow-hidden h-full flex flex-col items-center">
                                <div className="relative group mb-8">
                                    <div className="w-32 h-32 rounded-3xl overflow-hidden border-2 border-accent/20 shadow-3d relative">
                                        {data.profileImage ? (
                                            <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-accent/5 flex items-center justify-center text-accent">
                                                <User size={48} />
                                            </div>
                                        )}
                                        {isEditing && (
                                            <label className="absolute inset-0 bg-accent/80 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all duration-300">
                                                <Camera size={24} className="text-white" />
                                                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                                            </label>
                                        )}
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-xl flex items-center justify-center border-2 border-[#0B1120] text-white shadow-lg">
                                        <Sparkles size={14} />
                                    </div>
                                </div>

                                <h3 className="text-xl font-black text-foreground truncate w-full px-2">
                                    {data.name || 'John Doe'}
                                </h3>
                                <p className="text-xs font-black text-secondary tracking-widest uppercase mb-6">Level 0: Initializing Access</p>

                                <div className="w-full h-[2px] bg-white/5 mb-6" />

                                <div className="space-y-4 w-full text-left">
                                    <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                                        <span className="text-secondary">Integrity</span>
                                        <span className="text-accent">85%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '85%' }}
                                            className="h-full bg-gradient-to-r from-primary to-accent"
                                        />
                                    </div>
                                </div>
                            </Card>
                        </PerspectiveCard>
                    </div>

                    {/* Main Form Area */}
                    <div className="lg:col-span-2">
                        <PerspectiveCard>
                            <Card className="p-10 premium-card bg-card/60 backdrop-blur-3xl border-border h-full">
                                {isEditing ? (
                                    <div className="space-y-8">
                                        {/* Tabs */}
                                        <div className="flex gap-4 p-1.5 bg-white/5 rounded-2xl border border-white/5 mb-8">
                                            {(['personal', 'academic', 'professional', 'linkedin'] as const).map((tab) => (
                                                <button
                                                    key={tab}
                                                    onClick={() => setActiveTab(tab)}
                                                    className={`flex-1 h-12 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === tab
                                                        ? 'bg-accent text-white shadow-lg'
                                                        : 'text-secondary hover:text-foreground hover:bg-white/5'
                                                        }`}
                                                >
                                                    {tab === 'linkedin' ? (
                                                        <span className="flex items-center justify-center gap-1">
                                                            <Linkedin size={13} /> {tab}
                                                        </span>
                                                    ) : (
                                                        tab
                                                    )}
                                                </button>
                                            ))}
                                        </div>

                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeTab}
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                className="space-y-6"
                                            >
                                                {activeTab === 'personal' && (
                                                    <>
                                                        <InputField
                                                            label="Full Identity"
                                                            icon={User}
                                                            placeholder="Enter your name"
                                                            value={data.name}
                                                            onChange={(val: string) => setData({ ...data, name: val })}
                                                        />
                                                        <div className="grid grid-cols-2 gap-6">
                                                            <InputField
                                                                label="Age / Cycle"
                                                                icon={Calendar}
                                                                placeholder="Years"
                                                                value={data.age}
                                                                onChange={(val: string) => setData({ ...data, age: val })}
                                                            />
                                                            <InputField
                                                                label="Neural Address"
                                                                icon={Mail}
                                                                placeholder="Email"
                                                                value={data.email}
                                                                onChange={(val: string) => setData({ ...data, email: val })}
                                                            />
                                                        </div>
                                                    </>
                                                )}

                                                {activeTab === 'academic' && (
                                                    <>
                                                        <InputField
                                                            label="Learning Node"
                                                            icon={Building2}
                                                            placeholder="College / University Name"
                                                            value={data.college}
                                                            onChange={(val: string) => setData({ ...data, college: val })}
                                                        />
                                                        <InputField
                                                            label="Specialization"
                                                            icon={GraduationCap}
                                                            placeholder="Qualification / Field"
                                                            value={data.qualification}
                                                            onChange={(val: string) => setData({ ...data, qualification: val })}
                                                        />
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] ml-2">Verification Artifact</label>
                                                            <label className="w-full h-14 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-3 cursor-pointer hover:border-accent/40 transition-all text-secondary hover:text-accent">
                                                                {data.certificate ? (
                                                                    <div className="flex items-center gap-2">
                                                                        <CheckCircle2 size={18} className="text-green-500" />
                                                                        <span className="text-[10px] font-black uppercase tracking-widest truncate max-w-[200px]">{data.certificate}</span>
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        <Upload size={18} />
                                                                        <span className="text-[10px] font-black uppercase tracking-widest">Upload Certificate</span>
                                                                    </>
                                                                )}
                                                                <input type="file" className="hidden" onChange={handleCertificateUpload} />
                                                            </label>
                                                        </div>
                                                    </>
                                                )}

                                                {activeTab === 'professional' && (
                                                    <>
                                                        <InputField
                                                            label="Current Collective"
                                                            icon={Briefcase}
                                                            placeholder="Office / Company Name"
                                                            value={data.officeName}
                                                            onChange={(val: string) => setData({ ...data, officeName: val })}
                                                        />
                                                        <InputField
                                                            label="Professional Rank"
                                                            icon={FileText}
                                                            placeholder="Degree / Designation"
                                                            value={data.degree}
                                                            onChange={(val: string) => setData({ ...data, degree: val })}
                                                        />
                                                    </>
                                                )}

                                                {activeTab === 'linkedin' && (
                                                    <div className="space-y-6">
                                                        <div>
                                                            <label className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] ml-2 mb-4 flex items-center gap-2">
                                                                <Linkedin size={14} className="text-accent" /> LinkedIn Professional Summary
                                                            </label>
                                                            <textarea
                                                                value={data.linkedinSummary}
                                                                onChange={(e) => setData({ ...data, linkedinSummary: e.target.value })}
                                                                placeholder="Your LinkedIn summary will appear here. Click 'Generate from Resume' to auto-populate or write/edit it manually."
                                                                className="w-full h-48 p-6 rounded-2xl bg-white/5 border border-white/10 focus:border-accent/50 focus:ring-2 focus:ring-accent/30 outline-none text-foreground font-medium resize-none transition-all hover:bg-white/8"
                                                            />
                                                            <p className="text-xs text-secondary mt-2 ml-2">
                                                                Pro tip: LinkedIn summaries work best at 120-220 characters. Current: {data.linkedinSummary.length} characters
                                                            </p>
                                                        </div>

                                                        {linkedinError && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: -10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className="p-4 rounded-xl bg-red-500/10 border border-red-500/30"
                                                            >
                                                                <p className="text-xs font-black text-red-400 uppercase tracking-widest">{linkedinError}</p>
                                                            </motion.div>
                                                        )}

                                                        <button
                                                            onClick={generateLinkedinSummaryFromResume}
                                                            disabled={isGeneratingLinkedin}
                                                            className="w-full h-14 px-6 rounded-2xl bg-accent/20 border border-accent/50 text-accent font-black uppercase tracking-widest text-xs hover:bg-accent/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                                        >
                                                            {isGeneratingLinkedin ? (
                                                                <>
                                                                    <Loader2 size={16} className="animate-spin" />
                                                                    Generating...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Wand2 size={16} />
                                                                    Generate from Resume Analysis
                                                                </>
                                                            )}
                                                        </button>

                                                        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                                                            <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-2">📌 LinkedIn Best Practices</p>
                                                            <ul className="text-xs text-secondary space-y-1">
                                                                <li>• Use 1-2 sentences for maximum impact</li>
                                                                <li>• Highlight your unique value proposition</li>
                                                                <li>• Include keywords relevant to your industry</li>
                                                                <li>• Be authentic and professional</li>
                                                                <li>• Update regularly as you progress</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                )}
                                            </motion.div>
                                        </AnimatePresence>

                                        <div className="pt-8">
                                            <Magnetic>
                                                <Button
                                                    onClick={handleSave}
                                                    disabled={isSaving}
                                                    className="w-full h-18 text-lg font-black uppercase tracking-[0.2em] shadow-3d group bg-accent hover:bg-accent/90"
                                                >
                                                    {isSaving ? 'Synchronizing...' : 'Save Matrix Data'}
                                                    {!isSaving && <Save className="ml-3 group-hover:scale-110 transition-transform" size={20} />}
                                                </Button>
                                            </Magnetic>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-12">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-2xl font-black text-foreground tracking-tight">Access Results</h3>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setIsEditing(true);
                                                    setActiveTab('personal');
                                                }}
                                                className="rounded-xl border-accent/20 text-accent hover:bg-accent/5"
                                            >
                                                Edit Profile
                                            </Button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-6">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black text-secondary uppercase tracking-widest">Neural ID</p>
                                                    <p className="text-xl font-bold text-foreground">{data.name}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black text-secondary uppercase tracking-widest">Address</p>
                                                    <p className="text-xl font-bold text-foreground">{data.email}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black text-secondary uppercase tracking-widest">Learning Node</p>
                                                    <p className="text-xl font-bold text-foreground">{data.college}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-6">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black text-secondary uppercase tracking-widest">Occupation</p>
                                                    <p className="text-xl font-bold text-foreground">{data.degree}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black text-secondary uppercase tracking-widest">Collective</p>
                                                    <p className="text-xl font-bold text-foreground">{data.officeName}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black text-secondary uppercase tracking-widest">Verification</p>
                                                    <div className="flex items-center gap-2 text-accent">
                                                        <CheckCircle2 size={16} />
                                                        <span className="text-sm font-black uppercase tracking-widest">Verified Badge</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {data.linkedinSummary && (
                                            <div className="mt-8 p-6 rounded-2xl bg-blue-500/10 border border-blue-500/30">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Linkedin size={18} className="text-blue-400" />
                                                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">LinkedIn Professional Summary</p>
                                                </div>
                                                <p className="text-sm text-foreground leading-relaxed">{data.linkedinSummary}</p>
                                            </div>
                                        )}

                                        <div className="pt-8 flex flex-col items-center justify-center p-8 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                                            <p className="text-secondary font-medium text-center italic">"Your professional narrative is now circulating through the core indices."</p>
                                            <Link href="/">
                                                <Magnetic>
                                                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/10 text-foreground font-black uppercase tracking-widest flex items-center gap-2">
                                                        Home Interface
                                                        <ArrowRight size={18} />
                                                    </Button>
                                                </Magnetic>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        </PerspectiveCard>
                    </div>
                </div>
            </div>
        </main>
    );
}
