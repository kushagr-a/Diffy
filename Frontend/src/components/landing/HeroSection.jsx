import React from 'react';
import { motion } from 'framer-motion';
import {
    Github, Zap, Terminal, CheckCircle2, AlertCircle,
    AlertTriangle, ChevronRight, ArrowRight
} from 'lucide-react';
import config from '../../utils/config';

const MockPRCard = () => (
    <div className="relative pl-8 pb-8">
        {/* Glow */}
        <div className="absolute -inset-8 bg-brand/8 rounded-3xl blur-3xl pointer-events-none" />

        {/* Main review card */}
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/60"
        >
            {/* Window chrome */}
            <div className="bg-zinc-950 border-b border-zinc-800/80 px-4 py-3 flex items-center gap-3">
                <div className="flex gap-1.5 shrink-0">
                    <span className="w-3 h-3 rounded-full bg-red-500/50" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <span className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="text-xs font-mono text-zinc-600 truncate">PR #142 · feat/auth-middleware</span>
                <div className="ml-auto flex items-center gap-1.5 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Live</span>
                </div>
            </div>

            <div className="p-5 space-y-4">
                {/* Diffy header row */}
                <div className="flex items-center gap-3">
                    <div className="bg-brand/10 border border-brand/30 rounded-lg p-2 shrink-0">
                        <Terminal size={15} className="text-brand" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white">DIFFY Analysis Complete</div>
                        <div className="text-[10px] text-zinc-500 font-mono">2.1s · 847 lines scanned</div>
                    </div>
                    <div className="text-right shrink-0">
                        <div className="text-2xl font-black font-mono text-white leading-none">
                            94<span className="text-zinc-700 text-xs ml-0.5">/100</span>
                        </div>
                    </div>
                </div>

                {/* Score bar */}
                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '94%' }}
                        transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-brand to-brand-muted rounded-full"
                    />
                </div>

                {/* Code diff */}
                <div className="bg-zinc-950 rounded-xl p-3 font-mono text-[11px] border border-zinc-800/60">
                    <div className="text-zinc-600 mb-2 text-[9px]">config/auth.js · line 23</div>
                    <div className="text-red-400/80 leading-relaxed">- const secret = process.env.JWT || "dev_secret";</div>
                    <div className="text-emerald-400 leading-relaxed">+ const secret = requireEnv('JWT_SECRET');</div>
                </div>

                {/* Alert */}
                <div className="border border-yellow-500/20 bg-yellow-500/5 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                        <AlertTriangle size={11} className="text-yellow-400 shrink-0" />
                        <span className="text-[9px] font-bold text-yellow-400 uppercase tracking-widest">
                            Security Risk · HIGH
                        </span>
                    </div>
                    <p className="text-[11px] text-zinc-300 leading-relaxed">
                        Hardcoded JWT fallback detected. Use enforced environment variables to prevent secret leakage.
                    </p>
                </div>

                {/* Checks row */}
                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
                    <div className="flex items-center gap-4">
                        {[
                            { icon: <CheckCircle2 size={12} className="text-emerald-400" />, label: 'Logic' },
                            { icon: <CheckCircle2 size={12} className="text-emerald-400" />, label: 'Perf' },
                            { icon: <AlertCircle size={12} className="text-yellow-400" />, label: 'Security' },
                        ].map(({ icon, label }) => (
                            <div key={label} className="flex items-center gap-1.5">
                                {icon}
                                <span className="text-[10px] text-zinc-500">{label}</span>
                            </div>
                        ))}
                    </div>
                    <span className="text-[9px] font-mono text-zinc-700">diffy-ai v2.4</span>
                </div>
            </div>
        </motion.div>

        {/* Floating badge: Bugs Caught */}
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="absolute -right-4 top-1/3 bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 shadow-2xl shadow-black/50"
        >
            <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-0.5">Bugs Caught</div>
            <div className="text-xl font-black font-mono text-white">3,452</div>
            <div className="text-[9px] text-emerald-400 mt-0.5 flex items-center gap-1">
                <span>↑</span> 12% this week
            </div>
        </motion.div>

        {/* Floating badge: Avg Score */}
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute left-0 -bottom-2 bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 shadow-2xl shadow-black/50"
        >
            <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-0.5">Avg Score</div>
            <div className="text-xl font-black font-mono text-brand">94/100</div>
        </motion.div>
    </div>
);

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
            {/* Dot pattern background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            />

            {/* Purple glow at top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-brand/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-brand/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 w-full py-20 lg:py-0">
                <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

                    {/* ── Left: Copy ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Eyebrow badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/25 text-brand text-[10px] font-bold uppercase tracking-widest mb-8"
                        >
                            <Zap className="w-3 h-3" />
                            AI-Powered Code Intelligence
                        </motion.div>

                        {/* Headline */}
                        <h1
                            className="text-6xl md:text-7xl xl:text-8xl font-bold leading-[0.88] tracking-tight mb-6"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                            Stop<br />
                            Shipping<br />
                            <span className="text-brand">Bugs</span>.
                        </h1>

                        {/* Subtitle */}
                        <p className="text-base md:text-lg text-zinc-400 leading-relaxed mb-10 max-w-md">
                            DIFFY is your AI Senior Engineer that reviews every Pull Request for logic regressions,
                            security flaws, and code quality—<span className="text-zinc-200">automatically</span>.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-12">
                            <a
                                href={`${config.API_URL}/api/auth/github`}
                                className="group inline-flex items-center justify-center gap-2.5 h-12 px-7 bg-zinc-100 hover:bg-white text-zinc-950 rounded-lg font-semibold text-sm transition-all shadow-sm active:scale-[0.98]"
                            >
                                <Github size={16} />
                                Connect GitHub
                                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                            </a>
                            <a
                                href="#features"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-800 rounded-lg font-semibold text-sm transition-all"
                            >
                                See Features
                                <ChevronRight size={15} />
                            </a>
                        </div>

                        {/* Trust strip */}
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-8 border-t border-zinc-800/60">
                            <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Trusted by devs at</span>
                            {['Stripe', 'Vercel', 'Linear', 'Planetscale'].map(company => (
                                <span key={company} className="text-xs font-semibold text-zinc-500 hover:text-zinc-300 transition-colors cursor-default">{company}</span>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Right: Mock Card ── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.93 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className="hidden lg:block"
                    >
                        <MockPRCard />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
