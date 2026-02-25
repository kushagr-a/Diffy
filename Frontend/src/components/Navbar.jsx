import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Github } from 'lucide-react';

const Navbar = () => {
    const [stars, setStars] = useState(null);
    const location = useLocation();

    useEffect(() => {
        fetch('https://api.github.com/repos/kushagr-a/GitHub_Pr_Reviewer')
            .then(res => res.json())
            .then(data => {
                if (data.stargazers_count !== undefined) {
                    setStars(data.stargazers_count);
                }
            })
            .catch(err => console.error("Failed to fetch stars", err));
    }, []);

    const scrollToFeatures = (e) => {
        if (location.pathname === '/') {
            e.preventDefault();
            const el = document.getElementById('features');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-bg-base/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="bg-brand p-1.5 rounded group-hover:rotate-12 transition-all shadow-lg shadow-brand/20">
                        <Terminal className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-black tracking-tighter">DIFFY</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest hover:text-white transition-colors">Home</Link>
                    <a href="/#features" onClick={scrollToFeatures} className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest hover:text-white transition-colors cursor-pointer">Features</a>
                    <a href="https://github.com/kushagr-a/GitHub_Pr_Reviewer/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest hover:text-white transition-colors">Docs</a>
                    <Link to="/dashboard" className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest hover:text-white transition-colors">Dashboard</Link>
                </div>

                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/kushagr-a/GitHub_Pr_Reviewer"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white hover:bg-zinc-200 text-black h-8 px-4 py-0 rounded font-bold text-[10px] uppercase tracking-widest flex items-center transition-all shadow-sm"
                    >
                        <div className="flex items-center gap-2 pr-3">
                            <Github size={14} />
                            <span>Star</span>
                        </div>
                        {stars !== null && (
                            <div className="flex items-center gap-2 pl-3 py-1 border-l border-black/20 font-mono text-xs">
                                {stars}
                            </div>
                        )}
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
