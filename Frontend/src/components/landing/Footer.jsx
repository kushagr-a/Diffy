import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Github } from 'lucide-react';

const footerLinks = [
    { label: 'Home', to: '/', external: false },
    { label: 'Dashboard', to: '/dashboard', external: false },
    { label: 'Docs', to: 'https://github.com/kushagr-a/GitHub_Pr_Reviewer/blob/main/README.md', external: true },
    { label: 'GitHub', to: 'https://github.com/kushagr-a/GitHub_Pr_Reviewer', external: true },
];

const Footer = () => (
    <footer className="border-t border-zinc-800/60 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
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

            {/* Nav links */}
            <nav className="flex items-center gap-6 flex-wrap justify-center">
                {footerLinks.map(({ label, to, external }) =>
                    external ? (
                        <a
                            key={label}
                            href={to}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-semibold text-zinc-500 hover:text-zinc-200 uppercase tracking-widest transition-colors"
                        >
                            {label}
                        </a>
                    ) : (
                        <Link
                            key={label}
                            to={to}
                            className="text-[11px] font-semibold text-zinc-500 hover:text-zinc-200 uppercase tracking-widest transition-colors"
                        >
                            {label}
                        </Link>
                    )
                )}
            </nav>

            {/* Copyright + GitHub */}
            <div className="flex items-center gap-4">
                <a
                    href="https://github.com/kushagr-a/GitHub_Pr_Reviewer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-zinc-200 transition-colors"
                    title="View on GitHub"
                >
                    <Github size={17} />
                </a>
                <span className="text-[11px] text-zinc-600 font-mono">© 2026 DIFFY. All rights reserved.</span>
            </div>
        </div>
    </footer>
);

export default Footer;
