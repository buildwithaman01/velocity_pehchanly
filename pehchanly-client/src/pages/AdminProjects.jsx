import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Loader2, ExternalLink, Zap, ChevronRight, Activity, Target, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { TableRowSkeleton } from '../components/Skeleton';

const AdminProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchProjects(); }, []);

    const fetchProjects = async () => {
        try {
            const { data } = await axiosInstance.get('/projects');
            setProjects(data);
        } catch (error) { toast.error('Sync failure'); }
        finally { setLoading(false); }
    };

    const handleStatusChange = async (id, status) => {
        try {
            await axiosInstance.put(`/projects/${id}/status`, { status });
            toast.success('Project status updated.');
            fetchProjects();
        } catch (error) { toast.error('Error updating status'); }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="bg-mesh-blue min-h-screen py-48 px-6 lg:px-8 relative overflow-hidden"
        >
            <div className="noise-overlay" />
            <div className="max-w-7xl mx-auto space-y-16 relative z-10">
                <div className="mb-20">
                    <div className="inline-flex items-center space-x-3 px-5 py-2 rounded-xl bg-[#FBFC09]/10 border border-[#FBFC09]/20 text-[#FBFC09] text-[10px] font-black uppercase tracking-[0.4em] mb-10">
                        <Briefcase size={16} />
                        <span>AGENCY PROJECT MONITOR</span>
                    </div>
                    <h1 className="text-7xl md:text-[11rem] font-black text-white tracking-tighter uppercase italic leading-[0.75] mb-6">PROJECT <br /> <span className="text-[#FBFC09]">MANAGER</span></h1>
                </div>

                <div className="glass-card rounded-[5rem] border-white/5 overflow-hidden shadow-2xl">
                    <table className="w-full text-left">
                        <thead className="bg-white/[0.03] border-b border-white/5">
                            <tr>
                                <th className="px-16 py-12 text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic">CLIENT / PROJECT</th>
                                <th className="px-16 py-12 text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic text-center">SERVICE</th>
                                <th className="px-16 py-12 text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic">STATUS</th>
                                <th className="px-16 py-12 text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic text-right">VALUE</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <AnimatePresence mode="popLayout">
                                {loading ? (
                                    [...Array(5)].map((_, i) => <TableRowSkeleton key={`proj-skel-${i}`} />)
                                ) : (
                                    projects.map(project => (
                                        <tr key={project._id} className="hover:bg-white/[0.03] transition-all group">
                                            <td className="px-16 py-16">
                                                <div className="font-black text-white text-3xl tracking-tighter uppercase italic group-hover:text-[#FBFC09] transition-colors mb-3 leading-none">{project.title}</div>
                                                <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">{project.client.name} • {project.client.email}</div>
                                            </td>
                                            <td className="px-16 py-16 text-center">
                                                <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] italic bg-[#122837] px-6 py-3 rounded-2xl border border-white/5">{project.service.name}</div>
                                            </td>
                                            <td className="px-16 py-16">
                                                <select 
                                                    className="bg-white/5 border border-white/10 rounded-2xl text-[10px] px-6 py-4 font-black text-white outline-none focus:border-[#FBFC09] transition-all uppercase tracking-[0.2em] cursor-pointer"
                                                    value={project.status}
                                                    onChange={(e) => handleStatusChange(project._id, e.target.value)}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="In Progress">In Progress</option>
                                                    <option value="Review">Review</option>
                                                    <option value="Deployed">Completed</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                            <td className="px-16 py-16 text-right">
                                                <span className="text-[#FBFC09] font-black text-4xl italic tracking-tighter">${project.value}</span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default AdminProjects;
