import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import StatCard from '../components/StatCard';
import { DollarSign, Briefcase, Users, MessageCircle, ArrowRight, Plus, Loader2, Zap, Sparkles, LayoutDashboard, ChevronRight, Activity, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const AdminOverview = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axiosInstance.get('/admin/stats');
                setStats(data);
            } catch (error) { toast.error('Sync failure'); }
            finally { setLoading(false); }
        };
        fetchStats();
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="min-h-screen bg-mesh-blue py-48 px-6 lg:px-8 relative overflow-hidden"
        >
            <div className="noise-overlay" />
            
            <div className="max-w-7xl mx-auto space-y-20 relative z-10">
                {/* Simplified Admin Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16">
                    <div>
                        <div className="inline-flex items-center space-x-4 px-6 py-2 rounded-xl bg-[#FBFC09]/10 border border-[#FBFC09]/20 text-[#FBFC09] text-[10px] font-black uppercase tracking-[0.5em] mb-10">
                            <LayoutDashboard size={16} />
                            <span>AGENCY ADMINISTRATIVE DASHBOARD</span>
                        </div>
                        <h1 className="text-5xl md:text-[11rem] font-black text-white tracking-tighter uppercase italic leading-[0.85] md:leading-[0.75] mb-4 drop-shadow-2xl">ADMIN <br className="hidden md:block" /> <span className="text-[#FBFC09]">PANEL</span></h1>
                        <p className="text-white/20 font-black uppercase text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.6em] italic border-l-4 border-[#FBFC09] pl-4 md:pl-8 py-2">CENTRAL BUSINESS OVERVIEW</p>
                    </div>
                </motion.div>

                {/* Simplified Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {loading ? (
                        [...Array(4)].map((_, i) => (
                            <div key={i} className="h-48 glass-card rounded-[3rem] animate-pulse bg-white/5 border-white/10" />
                        ))
                    ) : (
                        <>
                            <StatCard title="Total Revenue" value={`$${stats?.revenue?.toLocaleString() || 0}`} icon={DollarSign} trend={16.4} />
                            <StatCard title="Active Projects" value={stats?.activeCount || 0} icon={Briefcase} trend={8.2} />
                            <Link to="/admin/leads" className="block hover:scale-[1.02] transition-transform">
                                <StatCard title="New Leads" value={stats?.pendingLeads || 0} icon={Users} />
                            </Link>
                            <StatCard title="System Health" value="OPTIMAL" icon={Shield} />
                        </>
                    )}
                </div>

                <div className="flex justify-center mt-12">
                     <Link to="/admin/leads" className="glass-button bg-white/5 text-white hover:text-[#FBFC09] border-white/10 px-12 h-[70px]">
                        OPEN LEAD INBOX
                        <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

                {/* Status Breakdown Section */}
                {!loading && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-12 glass-card rounded-[5rem] p-20 border-white/5 bg-white/[0.01] group relative overflow-hidden text-center">
                            <div className="max-w-4xl mx-auto py-12">
                                <h3 className="text-5xl font-black text-white mb-16 uppercase italic tracking-tighter">Project Status Breakdown</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                                    {stats?.statusBreakdown?.map((item, i) => (
                                        <div key={i} className="space-y-6 group/item p-8 glass-card rounded-[3rem] border-white/5 hover:border-[#FBFC09]/30 transition-all">
                                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] italic group-hover/item:text-[#FBFC09] transition-colors">{item._id}</p>
                                            <p className="text-6xl font-black text-white italic tracking-tighter leading-none">{item.count}</p>
                                            <div className="w-12 h-1 bg-white/5 mx-auto rounded-full group-hover/item:bg-[#FBFC09]/40 transition-all" />
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-20">
                                    <Link to="/admin/projects" className="glass-button min-w-[280px] h-[75px] mx-auto text-white hover:text-[#FBFC09] border-white/5">
                                        VIEW ALL PROJECTS
                                        <ChevronRight size={20} className="ml-3 group-hover:translate-x-3 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>

            {/* Subtle Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(251,252,9,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(251,252,9,0.01)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
        </motion.div>
    );
};

export default AdminOverview;
