import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Plus, Edit2, Trash2, X, Loader2, Zap, ShieldCheck, ChevronRight, Target, Activity } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { TableRowSkeleton } from '../components/Skeleton';
import { Archive, ArchiveRestore } from 'lucide-react';

const AdminServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [showArchived, setShowArchived] = useState(false);
    const [formData, setFormData] = useState({
        name: '', description: '', price: '', category: 'Web', techStack: ''
    });

    useEffect(() => { fetchServices(); }, [showArchived]);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const { data } = await axiosInstance.get('/services');
            setServices(data);
        } catch (error) { toast.error('Sync failure'); }
        finally { setLoading(false); }
    };

    const handleOpenModal = (service = null) => {
        if (service) {
            setEditingService(service);
            setFormData({
                name: service.name,
                description: service.description,
                price: service.price,
                category: service.category,
                techStack: service.techStack.join(', ')
            });
        } else {
            setEditingService(null);
            setFormData({ name: '', description: '', price: '', category: 'Web', techStack: '' });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSubmit = { ...formData, techStack: formData.techStack.split(',').map(s => s.trim()) };
        try {
            if (editingService) {
                await axiosInstance.put(`/services/${editingService._id}`, dataToSubmit);
                toast.success('Service updated.');
            } else {
                await axiosInstance.post('/services', dataToSubmit);
                toast.success('New service added.');
            }
            setShowModal(false);
            fetchServices();
        } catch (error) { toast.error('Check fields'); }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Remove this service from the catalog?')) {
            try {
                await axiosInstance.delete(`/services/${id}`);
                toast.success('Service removed.');
                fetchServices();
            } catch (error) { toast.error('Failure'); }
        }
    };

    if (loading) return <div className="flex justify-center bg-[#122837] min-h-screen py-48"><Activity className="animate-spin text-[#FBFC09]" size={64} /></div>;

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="bg-mesh-blue min-h-screen py-48 px-6 lg:px-8 relative overflow-hidden"
        >
            <div className="noise-overlay" />
            <div className="max-w-7xl mx-auto space-y-16 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
                    <div>
                        <div className="inline-flex items-center space-x-3 px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-white/30 text-[10px] font-black uppercase tracking-[0.4em] mb-10">
                            <Target size={14} className="text-[#FBFC09]" />
                            <span>SERVICES MANAGEMENT TERMINAL</span>
                        </div>
                        <h1 className="text-7xl md:text-[10rem] font-black text-white tracking-tighter uppercase italic leading-[0.75] mb-4">SERVICE <br /> <span className="text-[#FBFC09]">CATALOG</span></h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setShowArchived(!showArchived)} 
                            className={`p-4 rounded-2xl border transition-all ${showArchived ? 'bg-[#FBFC09] text-[#122837] border-[#FBFC09]' : 'bg-white/5 text-white/30 border-white/10 hover:border-white/20'}`}
                            title={showArchived ? "Hide Archived" : "Show Archived"}
                        >
                            {showArchived ? <ArchiveRestore size={24} /> : <Archive size={24} />}
                        </button>
                        <button onClick={() => handleOpenModal()} className="glass-button bg-white text-[#122837] hover:bg-[#FBFC09] min-w-[320px] h-[85px] shadow-2xl group">
                            <Plus size={24} className="mr-3" />
                            ADD NEW SERVICE
                        </button>
                    </div>
                </div>

                <div className="glass-card rounded-[5rem] border-white/5 overflow-hidden shadow-2xl">
                    <table className="w-full text-left">
                        <thead className="bg-white/[0.03] border-b border-white/5">
                            <tr>
                                <th className="px-16 py-12 text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic">SERVICE NAME</th>
                                <th className="px-16 py-12 text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic text-center">CATEGORY</th>
                                <th className="px-16 py-12 text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic text-right">PRICING</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <AnimatePresence mode="popLayout">
                                {loading ? (
                                    [...Array(5)].map((_, i) => <TableRowSkeleton key={`row-skel-${i}`} />)
                                ) : (
                                    services.map(service => (
                                        <motion.tr 
                                            key={service._id} 
                                            initial={{ opacity: 0 }} 
                                            animate={{ opacity: 1 }} 
                                            exit={{ opacity: 0 }}
                                            className="hover:bg-white/[0.03] transition-all group"
                                        >
                                            <td className="px-16 py-16">
                                                <div className="font-black text-white text-3xl tracking-tighter uppercase italic group-hover:text-[#FBFC09] transition-colors mb-2 leading-none">{service.name}</div>
                                                <div className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em] transition-colors group-hover:text-white/40">{service.techStack.join(' • ')}</div>
                                            </td>
                                            <td className="px-16 py-16 text-center">
                                                <span className="px-6 py-2 bg-[#FBFC09]/10 text-[#FBFC09] text-[9px] font-black rounded-full uppercase tracking-[0.3em] border border-[#FBFC09]/20">
                                                    {service.category}
                                                </span>
                                            </td>
                                            <td className="px-16 py-16 text-right">
                                                <div className="flex items-center justify-end space-x-12">
                                                    <span className="text-[#FBFC09] font-black text-4xl italic tracking-tighter">${service.price}</span>
                                                    <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button onClick={() => handleOpenModal(service)} className="p-4 text-white hover:text-[#FBFC09] hover:bg-[#FBFC09]/10 rounded-2xl transition-all"><Edit2 size={22} /></button>
                                                        <button onClick={() => handleDelete(service._id)} className="p-4 text-white hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"><Trash2 size={22} /></button>
                                                    </div>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-[#122837]/95 backdrop-blur-3xl" />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} 
                            className="glass-card rounded-[6rem] border-white/10 w-full max-w-3xl p-24 relative z-10 shadow-2xl"
                        >
                            <h2 className="text-6xl font-black text-white mb-16 uppercase italic tracking-tighter border-l-8 border-[#FBFC09] pl-10 leading-none">
                                {editingService ? 'EDIT' : 'NEW'} <br /><span className="text-[#FBFC09]">SERVICE</span>
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.4em] ml-4 italic">SERVICE NAME</label>
                                    <input required className="w-full px-10 py-6 bg-white/5 border border-white/10 rounded-[3rem] outline-none focus:border-[#FBFC09] text-white transition-all font-black uppercase text-xl" placeholder="CUSTOM WEB APP" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                </div>
                                <div className="grid grid-cols-2 gap-10">
                                    <div className="space-y-4">
                                        <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.4em] ml-4 italic">PRICE ($)</label>
                                        <input required type="number" className="w-full px-10 py-6 bg-white/5 border border-white/10 rounded-[3rem] outline-none focus:border-[#FBFC09] text-[#FBFC09] transition-all font-black text-2xl" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.4em] ml-4 italic">CATEGORY</label>
                                        <select className="w-full px-10 py-6 bg-[#122837] border border-white/10 rounded-[3rem] outline-none focus:border-[#FBFC09] text-white transition-all font-black uppercase cursor-pointer" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                                            <option>Web</option><option>SEO</option><option>GMB</option><option>Branding</option><option>Social</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="w-full glass-button bg-[#FBFC09] text-[#122837] border-[#FBFC09] hover:bg-white h-[90px] text-xs">
                                    {editingService ? 'SAVE CHANGES' : 'ADD SERVICE'}
                                    <ChevronRight size={22} className="ml-3" />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default AdminServices;
