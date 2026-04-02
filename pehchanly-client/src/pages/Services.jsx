import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import ServiceCard from '../components/ServiceCard';
import { Search, Loader2, X, Sparkles, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceSkeleton } from '../components/Skeleton';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [leadData, setLeadData] = useState({ name: '', email: '', phone: '', message: '' });
    const [submitting, setSubmitting] = useState(false);

    const categories = ['All', 'Web', 'SEO', 'GMB', 'Branding', 'Social'];

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data } = await axiosInstance.get('/services');
                setServices(data);
            } catch (error) {
                toast.error('Sync failure detected');
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    const handleOpenModal = (service) => {
        setSelectedService(service);
        setLeadData({ ...leadData, message: `Requesting tactical deployment for "${service.name}".` });
        setShowModal(true);
    };

    const handleLeadSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await axiosInstance.post('/leads', { ...leadData, serviceInterest: selectedService._id });
            toast.success('Inquiry transmitted to central command.');
            setShowModal(false);
            setLeadData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            toast.error('Transmission fault');
        } finally {
            setSubmitting(false);
        }
    };

    const filteredServices = filter === 'All' 
        ? services 
        : services.filter(s => s.category === filter);

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="min-h-screen pt-48 pb-32 bg-mesh-blue"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-24"
                >
                    <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                        <Sparkles size={16} className="text-[#FBFC09] animate-pulse" />
                        <span>Elite Deployment Catalog</span>
                    </div>
                    <h1 className="text-6xl md:text-[8rem] font-black text-white mb-10 uppercase italic tracking-tighter leading-[0.85]">
                        CHOOSE YOUR <br /><span className="text-[#FBFC09]">ARSENAL</span>
                    </h1>
                    <p className="text-white/30 text-lg md:text-2xl max-w-2xl mx-auto font-medium italic leading-relaxed">
                        High-authority growth engines precision-tuned for market domination. 
                        Select your vertical and initiate deployment.
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-6 mb-24">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 border ${
                                filter === cat 
                                    ? 'bg-[#FBFC09] text-[#122837] border-[#FBFC09] shadow-[0_20px_40px_-10px_rgba(251,252,9,0.4)]' 
                                    : 'bg-white/5 text-white/40 hover:text-white border-white/5 hover:border-white/20 uppercase italic'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <AnimatePresence mode="popLayout">
                        {loading ? (
                            [...Array(6)].map((_, i) => (
                                <motion.div 
                                    key={`skeleton-${i}`} 
                                    initial={{ opacity: 0 }} 
                                    animate={{ opacity: 1 }} 
                                    exit={{ opacity: 0 }}
                                >
                                    <ServiceSkeleton />
                                </motion.div>
                            ))
                        ) : (
                            filteredServices.map((service, index) => (
                                <motion.div 
                                    key={service._id} 
                                    layout
                                    initial={{ opacity: 0, y: 30 }} 
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <ServiceCard 
                                        service={service} 
                                        onContact={handleOpenModal} 
                                    />
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>

                {!loading && filteredServices.length === 0 && (
                    <div className="text-center py-48 glass-card rounded-[4rem] border-dashed border-[#FBFC09]/10">
                        <p className="text-white/20 text-xl font-black uppercase tracking-[0.3em] italic">No tactical modules detected in this sector.</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-[#122837]/90 backdrop-blur-2xl"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="glass-card rounded-[4.5rem] border-[#FBFC09]/10 w-full max-w-2xl p-16 relative z-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)]"
                        >
                            <button onClick={() => setShowModal(false)} className="absolute top-12 right-12 text-white/30 hover:text-[#FBFC09] transition-all">
                                <X size={32} />
                            </button>

                            <h2 className="text-5xl font-black text-white mb-4 uppercase italic tracking-tighter">Tactical Brief</h2>
                            <div className="inline-flex items-center gap-3 bg-[#FBFC09]/10 px-4 py-2 rounded-xl border border-[#FBFC09]/20 mb-12">
                                <AlertCircle size={16} className="text-[#FBFC09]" />
                                <span className="text-[10px] font-black text-[#FBFC09] uppercase tracking-widest">
                                    Project Focus: {selectedService?.name}
                                </span>
                            </div>

                            <form onSubmit={handleLeadSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-2">OPERATIVE NAME</label>
                                        <input required className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-[2rem] outline-none focus:border-[#FBFC09] text-white transition-all font-black placeholder:text-white/10" 
                                               placeholder="YOUR NAME" value={leadData.name} onChange={e => setLeadData({...leadData, name: e.target.value})} />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-2">COMMS LINK (EMAIL)</label>
                                        <input required type="email" className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-[2rem] outline-none focus:border-[#FBFC09] text-white transition-all font-black placeholder:text-white/10" 
                                               placeholder="EMAIL@AGENCY.COM" value={leadData.email} onChange={e => setLeadData({...leadData, email: e.target.value})} />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-2">MISSION PARAMETERS</label>
                                    <textarea required className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-[2.5rem] outline-none focus:border-[#FBFC09] text-white transition-all font-black placeholder:text-white/10 h-32 resize-none italic" 
                                              placeholder="Briefly state your objectives..." value={leadData.message} onChange={e => setLeadData({...leadData, message: e.target.value})} />
                                </div>
                                <button type="submit" disabled={submitting} className="w-full glass-button bg-[#FBFC09] text-[#122837] border-[#FBFC09] hover:bg-white min-h-[70px] mt-6 shadow-xl shadow-[#FBFC09]/10">
                                    {submitting ? 'TRANSMITTING...' : 'INITIATE PROTOCOL'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Services;
