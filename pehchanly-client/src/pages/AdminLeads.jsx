import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Loader2, Mail, Phone, Calendar, CheckCircle2, XCircle, Zap, ShieldAlert, ChevronRight, Activity, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLeads = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    const [convertedCreds, setConvertedCreds] = useState(null);

    useEffect(() => { fetchLeads(); }, []);

    const fetchLeads = async () => {
        try {
            const { data } = await axiosInstance.get('/leads');
            console.log('DEBUG: Leads received:', data);
            setLeads(data);
        } catch (error) { toast.error('Sync failure'); }
        finally { setLoading(false); }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await axiosInstance.put(`/leads/${id}`, { status });
            toast.success(`Inquiry marked as ${status}.`);
            fetchLeads();
        } catch (error) { toast.error('Error'); }
    };

    const handleConvertLead = async (id) => {
        try {
            toast.loading('Initiating conversion...', { id: 'convert' });
            const { data } = await axiosInstance.post(`/leads/${id}/convert`);
            setConvertedCreds(data.credentials);
            toast.success('Strategy Synchronized: Lead converted to client + project.', { id: 'convert' });
            fetchLeads();
        } catch (error) { 
            toast.error('Conversion fault', { id: 'convert' }); 
        }
    };

    if (loading) return <div className="flex justify-center bg-[#122837] min-h-screen py-48"><Activity className="animate-spin text-[#FBFC09]" size={64} /></div>;

    return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="bg-mesh-blue min-h-screen py-48 px-6 lg:px-8 relative overflow-hidden"
        >
            <div className="noise-overlay" />
            <div className="max-w-7xl mx-auto space-y-20 relative z-10">
                <div className="mb-20">
                    <div className="inline-flex items-center space-x-3 px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-white/30 text-[10px] font-black uppercase tracking-[0.4em] mb-10">
                        <MessageSquare size={16} className="text-[#FBFC09]" />
                        <span>NEW CLIENT INQUIRIES</span>
                    </div>
                    <h1 className="text-7xl md:text-[11rem] font-black text-white tracking-tighter uppercase italic leading-[0.75] mb-6">LEAD <br /> <span className="text-[#FBFC09]">INBOX</span></h1>
                </div>

                {/* Conversion Success Modal */}
                <AnimatePresence>
                    {convertedCreds && (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#122837]/80 backdrop-blur-xl"
                        >
                            <motion.div 
                                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                                className="glass-card max-w-lg w-full p-16 rounded-[4rem] border-[#FBFC09]/20 text-center relative"
                            >
                                <Zap className="text-[#FBFC09] mx-auto mb-10 animate-pulse" size={64} />
                                <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-8 italic">CLIENT GENERATED</h3>
                                <div className="space-y-6 text-left mb-12">
                                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-2">EMAIL (LOGIN)</p>
                                        <p className="text-white font-black italic">{convertedCreds.email}</p>
                                    </div>
                                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-2">DEFAULT PASSWORD</p>
                                        <p className="text-[#FBFC09] font-black italic">{convertedCreds.password}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setConvertedCreds(null)}
                                    className="w-full glass-button bg-[#FBFC09] text-[#122837] border-[#FBFC09]"
                                >
                                    ACKNOWLEDGE
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <AnimatePresence>
                        {leads.length > 0 ? (
                            leads.map((lead, i) => (
                                <motion.div 
                                    key={lead._id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                    className="glass-card rounded-[5rem] p-16 border-white/5 flex flex-col hover:border-[#FBFC09]/40 transition-all duration-700 bg-white/[0.01] group shadow-2xl"
                                >
                                    <div className="flex justify-between items-start mb-10">
                                        <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] italic border 
                                            ${lead.status === 'New' ? 'bg-[#FBFC09] text-[#122837] border-[#FBFC09]' : 
                                              'bg-[#FBFC09]/10 text-[#FBFC09] border-[#FBFC09]/20'}`}>
                                            {lead.status}
                                        </span>
                                        <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] flex items-center">
                                            <Calendar size={14} className="mr-2" />
                                            {new Date(lead.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>

                                    <h3 className="text-4xl font-black text-white mb-8 tracking-tighter uppercase italic group-hover:text-[#FBFC09] transition-colors leading-none">{lead.name}</h3>
                                    
                                    <div className="space-y-4 mb-10">
                                        <div className="flex items-center text-[10px] font-black text-white/40 uppercase tracking-widest">
                                            <Mail size={16} className="text-[#FBFC09] mr-4 opacity-60" />
                                            {lead.email}
                                        </div>
                                        {lead.phone && (
                                            <div className="flex items-center text-[10px] font-black text-white/40 uppercase tracking-widest">
                                                <Phone size={16} className="text-[#FBFC09] mr-4 opacity-60" />
                                                {lead.phone}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-grow mb-12">
                                        <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em] ml-2 mb-4 italic">MESSAGE</p>
                                        <div className="bg-[#122837]/60 p-8 rounded-[3rem] border border-white/5 text-white/60 font-medium italic leading-relaxed text-sm">
                                            "{lead.message}"
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-around pt-10 border-t border-white/5">
                                        <button onClick={() => handleUpdateStatus(lead._id, 'Contacted')} className="p-4 text-white/20 hover:text-[#FBFC09] transition-all" title="Mark Contacted">
                                            <ChevronRight size={28} />
                                        </button>
                                        {lead.status !== 'Converted' && (
                                            <button onClick={() => handleConvertLead(lead._id)} className="p-4 text-white/20 hover:text-[#FBFC09] transition-all" title="Convert to Project">
                                                <Zap size={28} />
                                            </button>
                                        )}
                                        <button onClick={() => handleUpdateStatus(lead._id, 'Closed')} className="p-4 text-white/20 hover:text-rose-500 transition-all" title="Archive">
                                            <XCircle size={28} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-32 text-center">
                                <ShieldAlert size={64} className="mx-auto text-white/5 mb-8" />
                                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.8em] italic">INBOX IS CURRENTLY NEUTRAL</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default AdminLeads;
