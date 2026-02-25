import React from 'react';
import { motion } from 'framer-motion';
import { Github, Zap, Shield, Microscope, Check } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                        <Zap className="w-3 h-3" />
                        Infrastructure Grade Intelligence
                    </div>

                    <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.9] text-white">
                        DIFFY<span className="text-brand">.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                        Stop shipping bugs, start shipping logic.
                        <span className="text-zinc-300 block mt-2">Your AI Senior Engineer for every Pull Request.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={() => window.location.href = 'http://localhost:3030/api/auth/github'}
                            className="btn-primary py-4 px-10 text-sm font-bold uppercase tracking-widest flex items-center gap-2"
                        >
                            <Github className="w-5 h-5" />
                            Synchronize with GitHub
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Feature Section */}
            <div id="features" className="grid md:grid-cols-3 gap-10 mb-32">
                <FeatureCard
                    icon={<Microscope className="text-brand" />}
                    title="Deep Logic Analysis"
                    desc="Diffy moves beyond syntax. It understands structural intent and detects complex architectural regressions automatically."
                />
                <FeatureCard
                    icon={<Shield className="text-emerald-500" />}
                    title="Security Verification"
                    desc="Instant identification of credential leakage, insecure patterns, and critical logic flaws before they hit production."
                />
                <FeatureCard
                    icon={<Zap className="text-brand-muted" />}
                    title="Real-time Inspection"
                    desc="Receive comprehensive logic reports and scorecards directly on GitHub within seconds of your push."
                />
            </div>

            {/* Famous Quotes Section */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-32">
                <QuoteCard
                    quote="Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
                    author="Martin Fowler"
                />
                <QuoteCard
                    quote="Quality is not an act, it is a habit. In software, it is the difference between a product and a legacy."
                    author="Aristotle (Software Adapted)"
                />
            </div>
        </div>
    );
};

const QuoteCard = ({ quote, author }) => (
    <div className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 hover:border-brand/30 transition-all group">
        <p className="text-lg text-zinc-300 italic mb-6 leading-relaxed">"{quote}"</p>
        <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-brand rounded-full" />
            <span className="font-bold text-zinc-500 uppercase text-[10px] tracking-[0.2em]">{author}</span>
        </div>
    </div>
);

const FeatureCard = ({ icon, title, desc }) => (
    <div className="card-premium group hover:bg-zinc-900/40">
        <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 group-hover:border-brand/50 transition-all">
            {React.cloneElement(icon, { size: 20 })}
        </div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
    </div>
);

export default LandingPage;
