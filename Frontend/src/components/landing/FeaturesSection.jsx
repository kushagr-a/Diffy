import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Microscope, Shield, Zap, BarChart2, Github, Layers } from 'lucide-react';

const features = [
    {
        icon: Microscope,
        title: 'Deep Logic Analysis',
        desc: 'Moves beyond syntax. Understands structural intent and detects complex architectural regressions automatically before they compound.',
        size: 'lg', // spans 2 cols
        color: 'text-brand',
        bg: 'bg-brand/10',
        border: 'hover:border-brand/40',
        gradient: 'from-brand/10 to-transparent',
    },
    {
        icon: Shield,
        title: 'Security Verification',
        desc: 'Instant identification of credential leakage, insecure patterns, and critical logic flaws before they ever reach production.',
        size: 'md',
        color: 'text-emerald-400',
        bg: 'bg-emerald-400/10',
        border: 'hover:border-emerald-400/30',
    },
    {
        icon: Zap,
        title: 'Real-time Inspection',
        desc: 'Comprehensive logic reports and scorecards delivered directly on GitHub within seconds of your push.',
        size: 'md',
        color: 'text-violet-400',
        bg: 'bg-violet-400/10',
        border: 'hover:border-violet-400/30',
    },
    {
        icon: BarChart2,
        title: 'Smart Scoring',
        desc: 'Every PR gets a 0–100 quality score with breakdown across logic, performance, and security dimensions.',
        size: 'md',
        color: 'text-sky-400',
        bg: 'bg-sky-400/10',
        border: 'hover:border-sky-400/30',
    },
    {
        icon: Github,
        title: 'GitHub Native',
        desc: 'Works entirely within your existing GitHub workflow. No new tools, no new tabs—just smarter PRs.',
        size: 'md',
        color: 'text-zinc-300',
        bg: 'bg-zinc-700/20',
        border: 'hover:border-zinc-600/50',
    },
    {
        icon: Layers,
        title: 'Multi-Repo Support',
        desc: 'Monitor all your repositories from a single unified dashboard. Full history, all scores, all insights.',
        size: 'lg',
        color: 'text-orange-400',
        bg: 'bg-orange-400/10',
        border: 'hover:border-orange-400/30',
        gradient: 'from-orange-400/8 to-transparent',
    },
];

const FeatureCard = ({ feature, delay }) => {
    const Icon = feature.icon;
    const isLarge = feature.size === 'lg';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay }}
            className={`group relative bg-zinc-900/30 border border-zinc-800/60 rounded-2xl p-7 transition-all duration-300 ${feature.border} hover:bg-zinc-900/50 overflow-hidden ${isLarge ? 'md:col-span-2' : ''}`}
        >
            {/* Gradient shimmer for large cards */}
            {feature.gradient && (
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
            )}

            <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl ${feature.bg} border border-zinc-800/60 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={20} className={feature.color} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5">{feature.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{feature.desc}</p>
            </div>
        </motion.div>
    );
};

const FeaturesSection = () => {
    return (
        <section id="features" className="py-28 px-6 relative">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/60 border border-zinc-700/50 text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-5">
                        Features
                    </div>
                    <h2
                        className="text-4xl md:text-5xl font-bold text-white tracking-tight max-w-xl"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                        Everything you need to<br />
                        <span className="text-brand">ship clean code</span>.
                    </h2>
                </motion.div>

                {/* Bento grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Row 1: large (2-col) + medium */}
                    <FeatureCard feature={features[0]} delay={0} />
                    <FeatureCard feature={features[1]} delay={0.1} />

                    {/* Row 2: medium + medium + medium */}
                    <FeatureCard feature={features[2]} delay={0.15} />
                    <FeatureCard feature={features[3]} delay={0.2} />

                    {/* Row 3: medium + large (2-col) */}
                    <FeatureCard feature={features[4]} delay={0.25} />
                    <FeatureCard feature={features[5]} delay={0.3} />
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
