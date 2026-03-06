import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const StatItem = ({ value, label, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay }}
            className="flex flex-col items-center text-center px-6 py-8"
        >
            <span
                className="text-4xl md:text-5xl font-black font-mono text-white tracking-tight mb-2"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
                {value}
            </span>
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{label}</span>
        </motion.div>
    );
};

const StatsSection = () => {
    const stats = [
        { value: '10k+', label: 'Pull Requests Analyzed', delay: 0 },
        { value: '3,452', label: 'Bugs Caught', delay: 0.1 },
        { value: '128', label: 'Security Issues Prevented', delay: 0.2 },
    ];

    return (
        <section className="border-y border-zinc-800/60 bg-zinc-950/60 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-800/60">
                    {stats.map((stat) => (
                        <StatItem key={stat.label} {...stat} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
