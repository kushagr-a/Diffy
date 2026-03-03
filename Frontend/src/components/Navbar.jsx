import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Github, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { label: 'Home', to: '/', external: false },
    { label: 'Features', to: '/#features', scroll: 'features' },
    { label: 'Docs', to: 'https://github.com/kushagr-a/GitHub_Pr_Reviewer/blob/main/README.md', external: true },
    { label: 'Dashboard', to: '/dashboard', external: false },
];

const Navbar = () => {
    const [stars, setStars] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        fetch('https://api.github.com/repos/kushagr-a/GitHub_Pr_Reviewer')
            .then(res => res.json())
            .then(data => {
                if (data.stargazers_count !== undefined) setStars(data.stargazers_count);
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // close mobile menu on route change
    useEffect(() => setMobileOpen(false), [location.pathname]);

    const handleScrollLink = (e, sectionId) => {
        if (location.pathname === '/') {
            e.preventDefault();
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                    scrolled
                        ? 'border-b border-zinc-800/70 bg-zinc-950/90 backdrop-blur-xl'
                        : 'bg-transparent border-b border-transparent'
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group shrink-0">
                        <div className="bg-brand p-1.5 rounded-lg group-hover:rotate-12 transition-all shadow-lg shadow-brand/20">
                            <Terminal className="w-4 h-4 text-white" />
                        </div>
                        <span
                            className="text-lg font-bold tracking-tight text-white group-hover:text-zinc-300 transition-colors"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                            DIFFY
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-7">
                        {navLinks.map(({ label, to, external, scroll }) => {
                            if (external) {
                                return (
                                    <a
                                        key={label}
                                        href={to}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[11px] font-semibold text-zinc-500 hover:text-white uppercase tracking-widest transition-colors"
                                    >
                                        {label}
                                    </a>
                                );
                            }
                            if (scroll) {
                                return (
                                    <a
                                        key={label}
                                        href={to}
                                        onClick={(e) => handleScrollLink(e, scroll)}
                                        className="text-[11px] font-semibold text-zinc-500 hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
                                    >
                                        {label}
                                    </a>
                                );
                            }
                            return (
                                <Link
                                    key={label}
                                    to={to}
                                    className="text-[11px] font-semibold text-zinc-500 hover:text-white uppercase tracking-widest transition-colors"
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-3">
                        <a
                            href="https://github.com/kushagr-a/GitHub_Pr_Reviewer"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center h-8 rounded-lg overflow-hidden border border-zinc-700 hover:border-zinc-500 bg-zinc-900 hover:bg-zinc-800 transition-all shadow-sm text-[10px] font-bold uppercase tracking-widest"
                        >
                            <div className="flex items-center gap-1.5 px-3 py-1">
                                <Github size={13} className="text-zinc-400 group-hover:text-white transition-colors" />
                                <span className="text-zinc-400 group-hover:text-white transition-colors">Star</span>
                            </div>
                            {stars !== null && (
                                <div className="px-2.5 py-1 border-l border-zinc-700 font-mono text-[10px] text-zinc-400">
                                    {stars}
                                </div>
                            )}
                        </a>

                        {/* Mobile menu toggle */}
                        <button
                            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                            onClick={() => setMobileOpen(v => !v)}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-16 left-0 w-full z-40 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800 px-6 py-6 flex flex-col gap-4 md:hidden"
                    >
                        {navLinks.map(({ label, to, external, scroll }) => {
                            if (external) {
                                return (
                                    <a
                                        key={label}
                                        href={to}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-semibold text-zinc-400 hover:text-white uppercase tracking-widest transition-colors py-1"
                                    >
                                        {label}
                                    </a>
                                );
                            }
                            if (scroll) {
                                return (
                                    <a
                                        key={label}
                                        href={to}
                                        onClick={(e) => { handleScrollLink(e, scroll); setMobileOpen(false); }}
                                        className="text-sm font-semibold text-zinc-400 hover:text-white uppercase tracking-widest transition-colors py-1 cursor-pointer"
                                    >
                                        {label}
                                    </a>
                                );
                            }
                            return (
                                <Link
                                    key={label}
                                    to={to}
                                    className="text-sm font-semibold text-zinc-400 hover:text-white uppercase tracking-widest transition-colors py-1"
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
