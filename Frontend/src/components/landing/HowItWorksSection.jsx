import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Github, GitPullRequest, Zap, Rocket } from 'lucide-react';

const steps = [
    {
        number: '01',
        icon: Github,
        title: 'Connect GitHub',
        desc: 'Authorize DIFFY with GitHub OAuth in one click. No installation, no configuration needed.',
        color: 'text-brand',
        bg: 'bg-brand/10',
        border: 'border-brand/20',
    },
    {
        number: '02',
        icon: GitPullRequest,
        title: 'Open a Pull Request',
        desc: 'Push your changes and open a PR as you normally would. DIFFY listens automatically.',
        color: 'text-violet-400',
        bg: 'bg-violet-400/10',
        border: 'border-violet-400/20',
    },
    {
        number: '03',
        icon: Zap,
        title: 'AI Analyzes Instantly',
        desc: 'In seconds, DIFFY scans for logic regressions, security flaws, and code quality issues.',
        color: 'text-emerald-400',
        bg: 'bg-emerald-400/10',
        border: 'border-emerald-400/20',
    },
    {
        number: '04',
        icon: Rocket,
        title: 'Ship with Confidence',
        desc: 'Receive a full scorecard and actionable report directly on GitHub. Merge knowing it\'s clean.',
        color: 'text-sky-400',
        bg: 'bg-sky-400/10',
        border: 'border-sky-400/20',
    },
];

const HowItWorksSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section className="py-28 px-6 relative overflow-hidden">
            {/* Subtle bg accent */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand/5 rounded-full blur-[100px] pointer-events-none" />

            <div ref={ref} className="relative max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/60 border border-zinc-700/50 text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-5">
                        How it works
                    </div>
                    <h2
                        className="text-4xl md:text-5xl font-bold text-white tracking-tight"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                        From push to production,<br />
                        <span className="text-brand">covered</span>.
                    </h2>
                </motion.div>

                {/* Steps */}
                <div className="grid md:grid-cols-4 gap-8 relative">
                    {/* Connecting dashed line (desktop only) */}
                    <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px border-t border-dashed border-zinc-700/60" />

                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 24 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: i * 0.12 }}
                                className="flex flex-col items-center text-center"
                            >
                                {/* Icon circle */}
                                <div className={`relative w-20 h-20 rounded-2xl ${step.bg} border ${step.border} flex items-center justify-center mb-6 z-10 bg-surface-base`}>
                                    <Icon size={28} className={step.color} />
                                    <span className={`absolute -top-2.5 -right-2.5 text-[10px] font-black font-mono ${step.color} bg-surface-base border ${step.border} rounded-full w-6 h-6 flex items-center justify-center`}>
                                        {i + 1}
                                    </span>
                                </div>
                                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
