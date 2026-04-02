import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Lock, Mail, Loader2, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = await login(email, password);
            toast.success(`Access Authorization Verified. Welcome, Operative ${user.name.split(' ')[0]}.`);
            navigate(user.role === 'admin' ? '/admin' : '/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Authorization Denied');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-mesh-blue py-20 px-6 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FBFC09]/5 rounded-full blur-[150px] pointer-events-none" />

            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-md w-full space-y-10 glass-card p-16 rounded-[4rem] border-white/5 relative z-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]"
            >
                <div className="text-center">
                    <motion.div 
                        initial={{ rotate: -20, scale: 0.5 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ type: "spring", damping: 15 }}
                        className="mx-auto h-24 w-24 flex items-center justify-center rounded-[2.5rem] bg-[#FBFC09]/10 text-[#FBFC09] border border-[#FBFC09]/20 mb-10 shadow-[0_0_30px_rgba(251,252,9,0.1)]"
                    >
                        <ShieldCheck size={48} />
                    </motion.div>
                    <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-3 leading-none">
                        SECURE LOG
                    </h2>
                    <p className="text-[#FBFC09] font-black uppercase text-[10px] tracking-[0.4em] italic opacity-60">
                        ENTER OPERATIONAL ENCLAVE
                    </p>
                </div>
                
                <form className="mt-16 space-y-10" onSubmit={handleSubmit}>
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-2" htmlFor="email">
                                OPERATIVE IDENTITY
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-white/20 group-focus-within:text-[#FBFC09] transition-colors">
                                    <Mail size={20} />
                                </div>
                                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-14 pr-8 py-5 bg-white/5 border border-white/10 rounded-[2rem] text-white outline-none focus:border-[#FBFC09] transition-all font-black placeholder:text-white/10 uppercase tracking-widest text-xs"
                                    placeholder="OPERATIVE@AGENCY.COM" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-2" htmlFor="password">
                                AUTHENTICATION KEY
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-white/20 group-focus-within:text-[#FBFC09] transition-colors">
                                    <Lock size={20} />
                                </div>
                                <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-14 pr-8 py-5 bg-white/5 border border-white/10 rounded-[2rem] text-white outline-none focus:border-[#FBFC09] transition-all font-black placeholder:text-white/10 tracking-[0.5em]"
                                    placeholder="••••••••" />
                            </div>
                        </div>
                    </div>

                    <button type="submit" disabled={loading}
                        className="group w-full glass-button bg-[#FBFC09] text-[#122837] border-[#FBFC09] hover:bg-white min-h-[75px] shadow-2xl shadow-[#FBFC09]/10"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : (
                            <>
                                INITIATE LOG
                                <div className="bg-[#122837] p-2 rounded-full text-[#FBFC09] group-hover:translate-x-1 transition-transform">
                                    <ChevronRight size={16} />
                                </div>
                            </>
                        )}
                    </button>
                    
                    <div className="text-center mt-12">
                        <Link to="/" className="text-[10px] font-black text-white/30 hover:text-[#FBFC09] transition-all uppercase tracking-[0.4em] italic">
                            ← RETURN TO NEUTRAL ZONE
                        </Link>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
