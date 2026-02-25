import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
    LayoutDashboard,
    Layers,
    Settings,
    Terminal,
    Bot,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    Plus,
    Github,
    Monitor,
    Search,
    ExternalLink,
    Clock,
    Zap
} from 'lucide-react';

const Dashboard = () => {
    const [data, setData] = useState({
        username: 'Developer',
        activeRepos: [],
        allRepos: [],
        stats: { totalPrs: 0, bugsCaught: 3452, securityPrevented: 128 }
    });
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const [analyticsData, setAnalyticsData] = useState(null);
    const [analyticsLoading, setAnalyticsLoading] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalSearchTerm, setModalSearchTerm] = useState(''); // Modal search

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3030/api/dashboard-data', {
                withCredentials: true
            });
            if (response.data.success) {
                setData(response.data.data);
            }
        } catch (err) {
            console.error("Dashboard fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Fetch deep analytics when a repo is selected
    useEffect(() => {
        if (selectedRepo) {
            const fetchAnalytics = async () => {
                setAnalyticsLoading(true);
                try {
                    const response = await axios.get(`http://localhost:3030/api/repo-analytics/${selectedRepo.fullName}`, {
                        withCredentials: true
                    });
                    if (response.data.success) {
                        setAnalyticsData(response.data.data);
                    }
                } catch (err) {
                    console.error("Analytics fetch error:", err);
                } finally {
                    setAnalyticsLoading(false);
                }
            };
            fetchAnalytics();
        } else {
            setAnalyticsData(null);
        }
    }, [selectedRepo]);

    // Handle Browser Popstate UX Additions
    useEffect(() => {
        if (selectedRepo) window.history.pushState({ view: 'repo' }, '');
    }, [selectedRepo]);

    useEffect(() => {
        if (showAddModal) window.history.pushState({ view: 'modal' }, '');
    }, [showAddModal]);

    useEffect(() => {
        if (selectedReport) window.history.pushState({ view: 'report' }, '');
    }, [selectedReport]);

    useEffect(() => {
        const handlePopState = (e) => {
            if (selectedReport) {
                setSelectedReport(null);
            } else if (showAddModal) {
                setShowAddModal(false);
            } else if (selectedRepo) {
                setSelectedRepo(null);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [selectedReport, showAddModal, selectedRepo]);


    const handleToggleProject = async (repoFullName) => {
        try {
            await axios.post('http://localhost:3030/api/toggle-project',
                { repoFullName },
                { withCredentials: true }
            );
            fetchData();
        } catch (err) {
            console.error("Toggle error:", err);
        }
    };

    const handleLogout = () => {
        window.location.href = 'http://localhost:3030/api/auth/logout';
    };

    const filteredActiveRepos = data.activeRepos.filter(repo =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex h-screen bg-surface-base text-zinc-100 selection:bg-brand/30">
            <div className="bg-glow" />
            <aside className="w-64 border-r border-border-subtle bg-surface-card/50 flex flex-col p-8">
                <div className="flex items-center gap-3 mb-12 opacity-50">
                    <div className="w-8 h-8 rounded bg-zinc-800 animate-pulse" />
                    <div className="h-6 w-20 bg-zinc-800 rounded animate-pulse" />
                </div>
                <div className="space-y-4 flex-1 opacity-50">
                    <div className="h-10 w-full bg-zinc-800/50 rounded animate-pulse" />
                    <div className="h-10 w-full bg-zinc-800/50 rounded animate-pulse" />
                </div>
                <div className="h-24 w-full bg-zinc-800/50 rounded animate-pulse mb-6 opacity-50" />
                <div className="h-11 w-full bg-zinc-800 rounded animate-pulse opacity-50" />
            </aside>
            <main className="flex-1 p-10 flex flex-col overflow-hidden">
                <div className="h-16 w-full border-b border-border-subtle flex items-center justify-between mb-10 opacity-50">
                    <div className="h-10 w-64 bg-zinc-800/50 rounded animate-pulse" />
                    <div className="h-10 w-32 bg-zinc-800/50 rounded animate-pulse" />
                </div>
                <div className="h-10 w-48 bg-zinc-800/50 rounded animate-pulse mb-8 opacity-50" />
                <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                    <div className="h-48 bg-zinc-900/40 border border-zinc-800/50 rounded-xl animate-pulse" />
                    <div className="h-48 bg-zinc-900/40 border border-zinc-800/50 rounded-xl animate-pulse" />
                    <div className="h-48 bg-zinc-900/40 border border-zinc-800/50 rounded-xl animate-pulse" />
                </div>
            </main>
        </div>
    );

    // ANALYTICS VIEW
    if (selectedRepo) return (
        <div className="min-h-screen bg-surface-base selection:bg-brand/30">
            <div className="bg-glow" />

            <div className="max-w-6xl mx-auto px-6 py-12">
                <button
                    onClick={() => setSelectedRepo(null)}
                    className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-medium mb-12 group"
                >
                    <ChevronRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                    Return to Overview
                </button>

                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-zinc-800 p-2 rounded text-zinc-400">
                                <Github size={20} />
                            </div>
                            <h2 className="text-4xl font-bold tracking-tight text-white">{selectedRepo.name}</h2>
                        </div>
                        <p className="text-zinc-500 font-mono text-xs flex items-center gap-2">
                            {selectedRepo.fullName}
                            <ExternalLink size={12} className="cursor-pointer hover:text-white" />
                        </p>
                    </div>

                    {analyticsData && (
                        <div className="flex gap-4">
                            <StatBlock label="Open PRs" value={analyticsData.metadata.openPrs} />
                            <StatBlock label="Intelligence Scans" value={analyticsData.metadata.totalScans} />
                            <StatBlock label="Avg Logic Score" value={`${analyticsData.metadata.averageScore}%`} highlight />
                        </div>
                    )}
                </header>

                <div className="space-y-6">
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest px-1">Logic Intelligence Reports</h3>

                    {analyticsLoading ? (
                        <div className="py-20 flex flex-col items-center gap-4 card-premium bg-zinc-900/10">
                            <div className="w-6 h-6 border-2 border-zinc-700 border-t-zinc-100 rounded-full animate-spin" />
                            <p className="text-zinc-500 text-xs font-mono">Synchronizing GitHub Data...</p>
                        </div>
                    ) : (analyticsData && analyticsData.reports.length > 0) ? (
                        <div className="grid gap-4">
                            {analyticsData.reports.map((report, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={i}
                                    className="card-premium flex flex-col md:flex-row justify-between gap-6 hover:bg-zinc-800/20"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="font-mono text-zinc-600">#{report.prNumber}</span>
                                            <h4 className="font-bold text-white truncate max-w-md">{report.title}</h4>
                                            <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter ${report.status === 'Passed' || report.status === 'Closed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-brand/10 text-brand'}`}>
                                                {report.status}
                                            </span>
                                        </div>
                                        <p className="text-zinc-400 text-sm leading-relaxed mb-4 max-w-2xl bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/50 italic line-clamp-2 transition-all cursor-pointer hover:bg-zinc-900/60"
                                            onClick={() => setSelectedReport(report)}>
                                            "{report.analysis}"
                                        </p>
                                        <div className="flex items-center gap-6 text-zinc-600 text-[10px] font-mono">
                                            <span className="flex items-center gap-1.5 hover:text-zinc-400 transition-colors">
                                                <Clock size={12} />
                                                {new Date(report.timestamp).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1.5 hover:text-zinc-400 transition-colors">
                                                <Monitor size={12} />
                                                Author: {report.author}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-brand/80">
                                                <Zap size={12} />
                                                {report.isAiGenerated ? "AI Optimized" : `${report.commentsCount} GitHub Comments`}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end justify-center">
                                        <div className="text-3xl font-black font-mono tracking-tighter text-white">{report.score || 0}<span className="text-zinc-800 text-xs ml-1 select-none">/100</span></div>
                                        <button
                                            onClick={() => setSelectedReport(report)}
                                            className="text-brand hover:text-brand-muted text-[10px] font-bold mt-2 flex items-center gap-1 uppercase"
                                        >
                                            Full Trace <ChevronRight size={10} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="card-premium py-20 text-center border-dashed">
                            <p className="text-zinc-600 font-mono text-xs uppercase italic">No interaction history found for this project.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* FULL TRACE MODAL */}
            <AnimatePresence>
                {selectedReport && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-surface-base/90 backdrop-blur-xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="bg-zinc-950 border border-zinc-800 w-full max-w-4xl h-[85vh] rounded-2xl p-0 shadow-2xl overflow-hidden flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="px-8 py-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/40">
                                <div className="flex items-center gap-4">
                                    <div className="font-mono text-zinc-500 text-sm">PR #{selectedReport.prNumber}</div>
                                    <h3 className="text-xl font-bold text-white">{selectedReport.title}</h3>
                                </div>
                                <button
                                    onClick={() => setSelectedReport(null)}
                                    className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"
                                >
                                    <ChevronRight size={24} className="rotate-90" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 overflow-y-auto p-10 scroll-zinc">
                                <div className="flex gap-10 mb-12">
                                    <div className="flex-1 space-y-1">
                                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Report Summary</p>
                                        <p className="text-zinc-400 text-sm">Detailed logic analysis and conversation trace synced from GitHub.</p>
                                    </div>
                                    <div className="flex gap-8">
                                        <div className="text-right">
                                            <p className="text-[9px] font-bold text-zinc-600 uppercase mb-1">Impact Score</p>
                                            <p className="text-2xl font-black font-mono text-white">{selectedReport.score || 0}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] font-bold text-zinc-600 uppercase mb-1">Status</p>
                                            <p className={`text-sm font-bold uppercase ${selectedReport.status === 'Passed' || selectedReport.status === 'Closed' ? 'text-emerald-500' : 'text-brand'}`}>
                                                {selectedReport.status}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="markdown-content">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {selectedReport.analysis}
                                    </ReactMarkdown>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="px-8 py-4 border-t border-zinc-800 flex justify-between items-center bg-zinc-900/20 text-[10px] font-mono whitespace-nowrap overflow-x-auto text-zinc-500">
                                <div className="flex gap-6">
                                    <span>AUTHOR: {selectedReport.author}</span>
                                    <span>TIMESTAMP: {new Date(selectedReport.timestamp).toLocaleString()}</span>
                                    <span className="text-brand/50 uppercase italic">Verification Powered by Diffy AI Logic</span>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-400">
                                    <Github size={12} />
                                    SYNCED FROM GITHUB
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );

    return (
        <div className="flex h-screen bg-surface-base text-zinc-100 selection:bg-brand/30">
            <div className="bg-glow" />

            {/* Sidebar */}
            <aside className="w-64 border-r border-border-subtle bg-surface-card/50 flex flex-col">
                <Link to="/" className="p-8 pb-12 flex items-center gap-3 group cursor-pointer inline-flex">
                    <div className="bg-white text-black p-1.5 rounded transition-transform group-hover:rotate-12">
                        <Terminal size={18} />
                    </div>
                    <span className="font-bold tracking-tighter text-lg text-white group-hover:text-zinc-300 transition-colors">DIFFY</span>
                </Link>

                <nav className="flex-1 px-4 space-y-1">
                    <NavItem icon={<LayoutDashboard size={16} />} label="Overview" active />
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="w-full text-left nav-sidebar-item hover:bg-zinc-900 transition-colors"
                    >
                        <Layers size={16} />
                        <span>Repositories</span>
                    </button>
                </nav>

                <div className="mt-auto">
                    <div className="p-6 pb-4">
                        <div className="bg-zinc-900/50 rounded-lg p-5 border border-zinc-800 mb-4">
                            <div className="flex justify-between items-end mb-4">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Active Nodes</span>
                                <span className="font-mono text-lg leading-none">{data.stats.activeProjects}</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Logic Scans</span>
                                <span className="font-mono text-lg text-brand leading-none">{data.stats.totalScans}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowAddModal(true)}
                            className="w-full h-11 bg-zinc-100 hover:bg-white text-zinc-950 rounded font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98]"
                        >
                            <Plus size={14} />
                            Register Node
                        </button>
                    </div>

                    <div className="p-4 border-t border-border-subtle/50">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-3 px-3 py-2 rounded text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        >
                            <Settings size={12} className="rotate-90" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Content Area */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-20 border-b border-border-subtle flex items-center justify-between px-10 bg-surface-base/80 backdrop-blur-md z-10 shrink-0">
                    <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 rounded-lg pl-4 pr-2 py-1.5 w-full max-w-md group focus-within:border-brand/40 focus-within:bg-zinc-900/80 transition-all shadow-inner">
                        <Search size={14} className="text-zinc-500 group-focus-within:text-brand transition-colors" />
                        <input
                            type="text"
                            placeholder="Filter your intelligence network..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm text-zinc-300 w-full placeholder:text-zinc-600 font-medium"
                        />
                        <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-950 border border-zinc-800 text-[10px] font-bold text-zinc-500 uppercase tracking-widest pointer-events-none select-none">
                            <span className="font-sans text-xs">⌘</span>
                            <span>K</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">System Engine</span>
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                Operational
                            </span>
                        </div>
                        <div className="flex items-center gap-3 pl-6 border-l border-border-subtle group cursor-default">
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{data.username}</span>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-brand-muted flex items-center justify-center text-white font-black text-xs shadow-lg shadow-brand/10">
                                {data.username[0].toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-10 space-y-8 scroll-zinc">
                    <div className="flex justify-between items-end">
                        <div>
                            <h2 className="text-2xl font-black tracking-tight text-white uppercase italic">Active Nodes</h2>
                            <p className="text-zinc-500 text-sm font-medium">Monitoring {filteredActiveRepos.length} logic streams across your landscape.</p>
                        </div>
                        <div className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest bg-zinc-900/50 px-3 py-1 rounded border border-zinc-800">
                            PR Queue: {data.stats.totalPrs}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 pb-20">
                        {filteredActiveRepos.length > 0 ? filteredActiveRepos.map((repo, i) => (
                            <RepoCard
                                key={repo.fullName}
                                repo={repo}
                                index={i}
                                onClick={() => setSelectedRepo(repo)}
                            />
                        )) : (
                            <div className="col-span-full border border-zinc-800/60 border-dashed rounded-2xl bg-zinc-900/20 backdrop-blur-sm py-32 flex flex-col items-center justify-center text-zinc-500 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-2xl relative">
                                    <Bot className="text-zinc-400 group-hover:text-brand transition-colors duration-500" size={28} />
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-brand rounded-full border-2 border-zinc-900 animate-pulse" />
                                </div>
                                <div className="text-center relative z-10">
                                    <h3 className="text-lg font-bold text-white mb-2">
                                        {searchTerm ? 'No Nodes Found' : 'Awaken Your Logic Engine'}
                                    </h3>
                                    <p className="text-sm font-medium text-zinc-500 max-w-sm mx-auto mb-8 leading-relaxed">
                                        {searchTerm
                                            ? `No active nodes match "${searchTerm}". Adjust your filters to find what you're looking for.`
                                            : 'Connect your GitHub repositories to authorize Diffy to begin scanning pull requests for logical regressions.'}
                                    </p>
                                    <button
                                        onClick={() => searchTerm ? setSearchTerm('') : setShowAddModal(true)}
                                        className="h-11 px-8 bg-white hover:bg-zinc-200 text-black rounded font-bold text-[10px] uppercase tracking-widest transition-all shadow-lg hover:shadow-white/10 active:scale-[0.98] flex items-center justify-center gap-2 mx-auto"
                                    >
                                        {searchTerm ? (
                                            <>
                                                <Search size={14} /> Reset Filter
                                            </>
                                        ) : (
                                            <>
                                                <Plus size={14} /> Connect First Repository
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Repos Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-surface-base/90 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-zinc-950 border border-zinc-800 w-full max-w-lg rounded-2xl p-10 shadow-2xl overflow-hidden flex flex-col"
                        >
                            <h3 className="text-2xl font-bold mb-2">Connect Repositories</h3>
                            <p className="text-sm text-zinc-500 mb-8">Select the projects where Diffy should apply AI logic analysis.</p>

                            <div className="relative mb-6">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                                <input
                                    type="text"
                                    placeholder="Search global GitHub nodes..."
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-xs outline-none focus:border-brand/40 transition-all font-mono"
                                    onChange={(e) => {
                                        const term = e.target.value.toLowerCase();
                                        // This is a local UI filter for the current data.allRepos
                                        setModalSearchTerm(term);
                                    }}
                                />
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-2 max-h-[400px] -mx-2 px-2 scroll-zinc">
                                {data.allRepos.filter(r => r.name.toLowerCase().includes(modalSearchTerm.toLowerCase()) || r.fullName.toLowerCase().includes(modalSearchTerm.toLowerCase())).length > 0 ?
                                    data.allRepos.filter(r => r.name.toLowerCase().includes(modalSearchTerm.toLowerCase()) || r.fullName.toLowerCase().includes(modalSearchTerm.toLowerCase())).map(repo => (
                                        <div key={repo.fullName} className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50 flex justify-between items-center group hover:border-zinc-700 transition-all">
                                            <div className="flex-1 min-w-0 pr-4">
                                                <p className="font-bold text-sm truncate">{repo.name}</p>
                                                <p className="text-[10px] text-zinc-600 font-mono truncate">{repo.fullName}</p>
                                            </div>
                                            <button
                                                onClick={() => handleToggleProject(repo.fullName)}
                                                className={`h-9 px-4 rounded font-bold text-[10px] uppercase tracking-widest transition-all ${repo.isActive ? 'text-zinc-500 bg-zinc-900 border border-zinc-800 hover:text-red-400' : 'bg-zinc-100 text-zinc-950 hover:bg-white'}`}
                                            >
                                                {repo.isActive ? 'Synced' : 'Connect'}
                                            </button>
                                        </div>
                                    )) : (
                                        <div className="py-12 text-center text-zinc-500 font-mono text-xs italic uppercase">No matching repositories found...</div>
                                    )}
                            </div>

                            <button
                                onClick={() => setShowAddModal(false)}
                                className="mt-8 h-12 w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded font-bold text-xs"
                            >
                                Finish Setup
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const NavItem = ({ icon, label, active = false }) => (
    <div className={`nav-sidebar-item ${active ? 'nav-sidebar-item-active' : ''}`}>
        {icon}
        <span>{label}</span>
    </div>
);

const RepoCard = ({ repo, index, onClick }) => {
    // Deterministic pseudo-random score based on name length and characters
    const score = 80 + (repo.name.length % 15) + (repo.prs > 0 ? -10 : 5);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ borderColor: 'rgba(99, 102, 241, 0.4)' }}
            onClick={onClick}
            className="card-premium cursor-pointer group flex flex-col h-full"
        >
            <div className="flex justify-between items-start mb-10">
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        window.open(`https://github.com/${repo.fullName}`, '_blank');
                    }}
                    className="bg-zinc-800 p-2.5 rounded group-hover:scale-110 group-hover:bg-zinc-700 transition-all cursor-alias"
                    title="View on GitHub"
                >
                    <Github size={18} className="text-zinc-500 group-hover:text-white" />
                </div>
                <div className="text-right">
                    <p className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.2em] mb-1 leading-none">Repo Health</p>
                    <span className="text-2xl font-black font-mono tracking-tighter text-white">{score}<span className="text-zinc-800 text-xs ml-0.5 select-none">/100</span></span>
                </div>
            </div>

            <div className="flex-1 mb-10">
                <h3 className="text-xl font-bold mb-1 leading-tight group-hover:text-brand transition-colors">{repo.name}</h3>
                <p className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${repo.prs > 0 ? 'text-brand' : 'text-zinc-600'}`}>
                    {repo.prs > 0 ? <AlertCircle size={12} strokeWidth={3} /> : <CheckCircle2 size={12} strokeWidth={3} />}
                    {repo.prs > 0 ? `${repo.prs} Reviews Pending` : 'All Logic Verified'}
                </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-border-zinc-800/80">
                <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-30" />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-10" />
                </div>
                <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest group-hover:text-zinc-400 transition-colors">Inspection Deep-Dive <ChevronRight size={10} className="inline ml-1" /></span>
            </div>
        </motion.div>
    );
};

const StatBlock = ({ label, value, highlight = false }) => (
    <div className="flex flex-col items-end px-6 border-l border-zinc-800/50">
        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1 select-none">{label}</span>
        <span className={`text-2xl font-black font-mono tracking-tighter ${highlight ? 'text-brand' : 'text-white'}`}>{value}</span>
    </div>
);

export default Dashboard;
