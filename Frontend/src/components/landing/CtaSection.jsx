import React from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowRight } from 'lucide-react';
import config from '../../utils/config';

const CtaSection = () => (
    <section className="py-28 px-6 relative overflow-hidden">
        {/* Dot pattern */}
        <div
            className="absolute inset-0 pointer-events-none"
            style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
            }}
        />

        {/* Central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand/12 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7 }}
            >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/25 text-brand text-[10px] font-bold uppercase tracking-widest mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                    Free to Get Started
                </div>

                {/* Headline */}
                <h2
                    className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[0.9] mb-6"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    Ready to ship<br />
                    <span className="text-brand">smarter</span>?
                </h2>

                {/* Subtitle */}
                <p className="text-lg text-zinc-400 leading-relaxed max-w-xl mx-auto mb-12">
                    Join thousands of developers who trust DIFFY to catch logic regressions,
                    security holes, and code quality issues before they reach production.
                </p>

                {/* CTA button */}
                <motion.a
                    href={`${config.API_URL}/api/auth/github`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="group inline-flex items-center gap-3 h-14 px-10 bg-zinc-100 hover:bg-white text-zinc-950 rounded-xl font-bold text-sm transition-all shadow-lg shadow-black/30 active:scale-[0.98]"
                >
                    <Github size={18} />
                    Connect GitHub — It's Free
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.a>

                {/* Social proof strip */}
                <p className="mt-8 text-[11px] text-zinc-600 font-mono uppercase tracking-widest">
                    No credit card · No setup · Works with any repo
                </p>
            </motion.div>
        </div>
    </section>
);

export default CtaSection;
