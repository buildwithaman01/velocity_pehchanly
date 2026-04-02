import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight, Github, Twitter, Linkedin, Zap, Globe } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative bg-[#122837] border-t border-white/5 pt-32 pb-16 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-20 mb-32">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-12">
                        <div className="flex items-center space-x-5">
                             <div className="relative w-10 h-10 flex items-center justify-center">
                                <div className="absolute inset-0 bg-[#FBFC09]/10 rounded-lg rotate-45 border border-[#FBFC09]/20 shadow-[0_0_20px_rgba(251,252,9,0.1)]" />
                                <div className="relative z-10 text-[#FBFC09] font-black text-lg">P</div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[8px] font-black text-[#FBFC09] tracking-[0.4em] mb-1">PRODUCED BY PEHCHANLY</span>
                                <span className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">VELOCITY</span>
                            </div>
                        </div>
                        <p className="max-w-md text-white/30 text-sm font-bold italic leading-relaxed">
                            The ultimate performance management interface for high-authority digital agencies. 
                            Part of the Pehchanly ecosystem of expert digital tools.
                        </p>
                        <div className="flex flex-col gap-6">
                            <a href="https://pehchanly.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-4 text-[#FBFC09] font-black uppercase tracking-[0.3em] text-[10px] group">
                                <Globe size={16} />
                                <span>WWW.PEHCHANLY.COM</span>
                                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                            <div className="flex space-x-6">
                                {[Twitter, Linkedin, Github].map((Icon, i) => (
                                    <a key={i} href="#" className="p-3 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-[#FBFC09] hover:border-[#FBFC09]/30 transition-all">
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-10">
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] italic mb-8">Navigation</h4>
                        <ul className="space-y-6">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Services', path: '/services' },
                                { name: 'Contact', path: '/contact' }
                            ].map(link => (
                                <li key={link.name}>
                                     <Link to={link.path} className="text-white/20 hover:text-[#FBFC09] transition-colors text-[10px] font-black uppercase tracking-[0.2em] italic flex items-center group">
                                        {link.name}
                                        <ArrowUpRight size={12} className="ml-2 opacity-0 group-hover:opacity-100 transition-all" />
                                     </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Ecosystem / Access */}
                    <div className="space-y-10">
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] italic mb-8">Ecosystem</h4>
                        <ul className="space-y-6">
                             {[
                                { name: 'Client Portal', path: '/login' },
                                { name: 'Admin Terminal', path: '/login' },
                                { name: 'Pehchanly Hub', path: 'https://pehchanly.com' }
                             ].map(link => (
                                <li key={link.name}>
                                     {link.path.startsWith('http') ? (
                                        <a href={link.path} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-[#FBFC09] transition-colors text-[10px] font-black uppercase tracking-[0.2em] italic flex items-center group">
                                            {link.name}
                                            <ArrowUpRight size={12} className="ml-2 opacity-0 group-hover:opacity-100 transition-all" />
                                        </a>
                                     ) : (
                                        <Link to={link.path} className="text-white/20 hover:text-[#FBFC09] transition-colors text-[10px] font-black uppercase tracking-[0.2em] italic flex items-center group">
                                            {link.name}
                                            <ArrowUpRight size={12} className="ml-2 opacity-0 group-hover:opacity-100 transition-all" />
                                        </Link>
                                     )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[9px] font-black text-white/10 uppercase tracking-[0.5em] italic">
                        © 2024 PEHCHANLY VELOCITY. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex space-x-12">
                        {['Privacy', 'Terms', 'pehchanly.com'].map(item => (
                            <a key={item} href="https://pehchanly.com" className="text-white/10 hover:text-white transition-colors text-[9px] font-black uppercase tracking-[0.5em] italic">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tactical grid fade */}
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#FBFC09]/[0.02] to-transparent pointer-events-none" />
        </footer>
    );
};

export default Footer;
