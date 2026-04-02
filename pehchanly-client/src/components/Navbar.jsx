import { Link } from 'react-router-dom';
import { Menu, X, User, LayoutDashboard, LogOut, ChevronRight, Zap, Sparkle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Services', path: '/services' },
        { name: 'Contact', path: '/contact' },
        ...(user ? [
            { name: 'Dashboard', path: user.role === 'admin' ? '/admin' : '/dashboard' }
        ] : [])
    ];

    return (
        <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ${scrolled ? 'py-4' : 'py-8'}`}>
            <div className="max-w-[1400px] mx-auto px-6">
                <div className={`glass-card rounded-[2.5rem] px-8 py-5 flex items-center justify-between border-white/5 transition-all duration-700 ${scrolled ? 'bg-[#122837]/90 shadow-2xl scale-[0.98]' : 'bg-transparent border-transparent shadow-none'}`}>
                    
                    {/* Lighting P Branding */}
                    <Link to="/" className="flex items-center space-x-5 group">
                        <div className="relative w-12 h-12 flex items-center justify-center">
                            <div className="absolute inset-0 bg-[#FBFC09] rounded-xl rotate-45 group-hover:rotate-[135deg] transition-transform duration-700 opacity-20" />
                            <div className="relative z-10 text-[#FBFC09] font-black text-2xl group-hover:scale-110 transition-transform">
                                P
                                <Zap className="absolute -top-1 -right-3 text-[#FBFC09]" size={14} fill="currentColor" />
                            </div>
                            <div className="absolute inset-[-4px] border border-[#FBFC09]/10 rounded-xl rotate-45 group-hover:rotate-[135deg] transition-transform duration-1000" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-[#FBFC09] tracking-[0.4em] mb-1 opacity-60">PEHCHANLY</span>
                            <span className="text-2xl font-black text-white italic tracking-tighter uppercase group-hover:text-[#FBFC09] transition-colors leading-none">VELOCITY</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                to={link.path} 
                                className="text-[9px] font-black text-white/40 uppercase tracking-[0.5em] hover:text-[#FBFC09] transition-colors relative group py-2"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#FBFC09] transition-all duration-500 group-hover:w-full" />
                            </Link>
                        ))}
                        
                        {user ? (
                            <div className="flex items-center gap-6">
                                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="glass-button h-12 px-8 bg-white/5 border-white/10 text-[9px] hover:border-[#FBFC09]/30">
                                    PORTAL
                                </Link>
                                <button 
                                    onClick={logout} 
                                    className="p-3 text-white/20 hover:text-red-500 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={16} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="group relative">
                                <div className="absolute inset-0 bg-[#FBFC09] blur-xl opacity-0 group-hover:opacity-10 transition-opacity" />
                                <div className="glass-button h-12 px-8 bg-[#FBFC09] text-[#122837] border-[#FBFC09] hover:bg-white text-[9px]">
                                    CLIENT LOGIN
                                </div>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button className="md:hidden text-white p-2 hover:text-[#FBFC09] transition-colors" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-x-6 top-32 z-[99] md:hidden"
                    >
                        <div className="glass-card rounded-[3.5rem] p-10 border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] space-y-6 bg-[#122837]/98 backdrop-blur-3xl">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    to={link.path} 
                                    onClick={() => setIsOpen(false)}
                                    className="block text-3xl font-black text-white uppercase italic tracking-tighter border-b border-white/5 pb-6 hover:text-[#FBFC09] transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link 
                                to="/login" 
                                onClick={() => setIsOpen(false)}
                                className="w-full glass-button h-20 bg-[#FBFC09] text-[#122837] border-[#FBFC09] text-xs font-black uppercase italic"
                            >
                                {user ? 'ACCESS DASHBOARD' : 'CLIENT LOGIN'}
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
