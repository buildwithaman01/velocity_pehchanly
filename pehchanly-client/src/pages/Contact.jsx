import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, MapPin, Phone, Globe, Zap, ArrowRight, Activity } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';
import Footer from '../components/Footer';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosInstance.post('/leads', formData);
            toast.success('Transmission Received: We will contact you shortly.');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            toast.error('Transmission Fault: Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#122837] relative overflow-hidden"
        >
            <div className="noise-overlay" />
            
            {/* Minimalist interactive glow */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#FBFC09]/[0.03] blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 pt-32 md:pt-64 pb-20 md:pb-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-start">
                    
                    {/* Brand Info */}
                    <motion.div 
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-12 md:space-y-16"
                    >
                        <div className="space-y-6 md:space-y-8">
                            <div className="inline-flex items-center space-x-3 px-4 md:px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[#FBFC09] text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">
                                <Activity size={12} />
                                <span>INQUIRY PROTOCOL V.01</span>
                            </div>
                            <h1 className="text-5xl md:text-9xl font-black text-white italic tracking-tighter uppercase leading-[0.85] md:leading-[0.75]">
                                CONNECT <br /> <span className="text-[#FBFC09]">DIRECT</span>
                            </h1>
                            <p className="text-white/40 text-base md:text-lg font-bold italic leading-relaxed border-l-4 border-[#FBFC09] pl-6 md:pl-8 max-w-md">
                                Initiate a high-authority partnership. Reach out for surgical execution of your digital objectives.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                            {[
                                { icon: Mail, label: 'Transmission', value: 'hello@pehchanly.com' },
                                { icon: Globe, label: 'Main Hub', value: 'pehchanly.com' },
                                { icon: MessageSquare, label: 'Support', value: '24/7 Active' },
                                { icon: MapPin, label: 'Base', value: 'Global / Remote' }
                            ].map((item, i) => (
                                <div key={i} className="group cursor-default">
                                    <item.icon size={18} className="text-white/20 group-hover:text-[#FBFC09] transition-colors mb-3 md:mb-4" />
                                    <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] md:tracking-[0.4em] mb-1 md:mb-2">{item.label}</p>
                                    <p className="text-white/60 font-black italic tracking-tight text-sm md:text-base">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Inquiry Form */}
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 border-white/5 relative group shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FBFC09]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-[2.5rem] md:rounded-[4rem]" />
                        
                        <form onSubmit={handleSubmit} className="relative z-10 space-y-8 md:space-y-10">
                            <div className="space-y-3 md:space-y-4">
                                <label className="text-[9px] md:text-[10px] font-black text-[#FBFC09] uppercase tracking-[0.4em] md:tracking-[0.5em] italic">IDENTIFIER (NAME)</label>
                                <input 
                                    required
                                    type="text" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-white/5 border-b-2 border-white/10 p-4 md:p-6 text-white font-black italic outline-none focus:border-[#FBFC09] transition-all text-lg md:text-xl"
                                    placeholder="ENTER NAME..."
                                />
                            </div>

                            <div className="space-y-3 md:space-y-4">
                                <label className="text-[9px] md:text-[10px] font-black text-[#FBFC09] uppercase tracking-[0.4em] md:tracking-[0.5em] italic">COMMUNICATION (EMAIL)</label>
                                <input 
                                    required
                                    type="email" 
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full bg-white/5 border-b-2 border-white/10 p-4 md:p-6 text-white font-black italic outline-none focus:border-[#FBFC09] transition-all text-lg md:text-xl"
                                    placeholder="EMAIL@PEHCHANLY.COM"
                                />
                            </div>

                            <div className="space-y-3 md:space-y-4">
                                <label className="text-[9px] md:text-[10px] font-black text-[#FBFC09] uppercase tracking-[0.4em] md:tracking-[0.5em] italic">OBJECTIVE (MESSAGE)</label>
                                <textarea 
                                    required
                                    rows="4"
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    className="w-full bg-white/5 border-b-2 border-white/10 p-4 md:p-6 text-white font-black italic outline-none focus:border-[#FBFC09] transition-all text-lg md:text-xl resize-none min-h-[120px]"
                                    placeholder="DESCRIBE YOUR VISION..."
                                />
                            </div>

                            <button 
                                disabled={loading}
                                className="w-full glass-button h-16 md:h-24 bg-[#FBFC09] text-[#122837] border-[#FBFC09] group hover:bg-white text-xs md:text-sm font-black"
                            >
                                {loading ? (
                                    <Activity className="animate-spin" size={24} />
                                ) : (
                                    <>
                                        SUBMIT INQUIRY
                                        <Send size={18} className="ml-3 group-hover:translate-x-1 md:group-hover:translate-x-2 md:group-hover:-translate-y-2 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>

            <Footer />
        </motion.div>
    );
};

export default Contact;
