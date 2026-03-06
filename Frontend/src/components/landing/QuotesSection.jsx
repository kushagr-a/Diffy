import React from 'react';
import { motion } from 'framer-motion';

const quotes = [
    {
        quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        author: 'Martin Fowler',
        role: 'Software Engineering Author',
    },
    {
        quote: 'Quality is not an act, it is a habit. In software, it is the difference between a product and a legacy.',
        author: 'Aristotle',
        role: 'Software Adapted',
    },
];

const QuoteCard = ({ quote, author, role, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay }}
        className="group relative bg-zinc-900/30 border border-zinc-800/60 hover:border-brand/30 rounded-2xl p-8 md:p-10 transition-all duration-300 overflow-hidden"
    >
        {/* Hover glow */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-brand/6 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -translate-x-1/2 -translate-y-1/2" />

        <div className="relative">
            {/* Quote mark */}
            <div
                className="text-7xl font-black text-brand/20 leading-none mb-4 select-none"
                style={{ fontFamily: 'Georgia, serif' }}
            >
                "
            </div>
            <p className="text-lg md:text-xl text-zinc-200 italic leading-relaxed mb-8">
                {quote}
            </p>
            <div className="flex items-center gap-3">
                <div className="w-1 h-10 bg-brand rounded-full" />
                <div>
                    <div className="text-sm font-bold text-white">{author}</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">{role}</div>
                </div>
            </div>
        </div>
    </motion.div>
);

const QuotesSection = () => (
    <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
                className="text-center mb-14"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/60 border border-zinc-700/50 text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-5">
                    Developer Wisdom
                </div>
                <h2
                    className="text-3xl md:text-4xl font-bold text-white tracking-tight"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    On the craft of clean code.
                </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
                {quotes.map((q, i) => (
                    <QuoteCard key={i} {...q} delay={i * 0.1} />
                ))}
            </div>
        </div>
    </section>
);

export default QuotesSection;
