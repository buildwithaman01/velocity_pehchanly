import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Globe, Zap, Shield, Sparkles, MoveRight, MousePointer2, TrendingUp, Users, Target, Activity, ChevronRight, BarChart3, Rocket } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';

const Landing = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const heroRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const { scrollYProgress } = useScroll();
    
    // Toned down 3D tilt (50% Dynamic)
    const rotateX = useTransform(scrollYProgress, [0, 0.1], [0, -5]);
    const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);

    const fadeInVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1, 
            y: 0,
            transition: { delay: i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }
        })
    };

    return (
        <div className="min-h-screen bg-[#122837] overflow-hidden">
            <div className="noise-overlay" />
            
            {/* Minimalist interactive glow */}
            <div 
                className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-[1] transition-transform duration-700 ease-out opacity-[0.03]"
                style={{ 
                    background: 'radial-gradient(circle, #FBFC09 0%, transparent 80%)',
                    left: mousePos.x - 300,
                    top: mousePos.y - 300
                }}
            />

            {/* Tightened Hero Section */}
            <motion.div 
                ref={heroRef}
                style={{ rotateX, scale }}
                className="relative pt-48 md:pt-64 pb-32 md:pb-48 z-10 perspective-1000"
            >
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInVariants}
                        custom={0}
                    >
                        <div className="inline-flex items-center space-x-3 px-4 md:px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[#FBFC09] text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] mb-10 md:mb-12 group cursor-default">
                            <Activity size={12} />
                            <span className="opacity-40 group-hover:opacity-100 transition-opacity">A PRODUCT OF PEHCHANLY</span>
                            <div className="w-px h-3 bg-white/10" />
                            <span>INFRASTRUCTURE V.01</span>
                        </div>

                        <h1 className="text-5xl md:text-9xl lg:text-[10rem] font-black text-white tracking-tighter mb-8 leading-[0.85] md:leading-[0.75] uppercase italic flex flex-col items-center">
                            <span className="relative">
                                SCALE YOUR
                                <div className="absolute -right-8 md:-right-12 top-0 text-[#FBFC09]/20 text-3xl md:text-6xl font-serif-expert not-italic">P</div>
                            </span>
                            <span className="text-[#FBFC09] drop-shadow-[0_0_40px_rgba(251,252,9,0.25)]">PERFORMANCE</span>
                        </h1>

                        <p className="max-w-2xl mx-auto text-base md:text-xl text-white/50 mb-12 md:mb-16 leading-relaxed font-bold italic">
                            The ultimate control terminal for high-authority digital agencies. 
                            Built for operatives who demand precision, scale, and surgical impact.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-8">
                            <Link to="/services" className="group glass-button bg-[#FBFC09] text-[#122837] border-[#FBFC09] hover:bg-white w-full sm:min-w-[280px] h-[70px] md:h-[75px] text-xs">
                                EXPLORE SERVICES
                                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
                            </Link>
                            <Link to="/contact" className="glass-button w-full sm:min-w-[280px] h-[70px] md:h-[75px] text-white/60 hover:text-white border-white/5 hover:border-white/20 text-xs shadow-none">
                                START INQUIRY
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Core Stats - Elegant Reveal */}
            <div className="max-w-7xl mx-auto px-6 relative z-20 mb-48 md:mb-64">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {[
                        { label: 'Uptime', value: '100%', icon: Shield },
                        { label: 'Deployments', value: '4.8k+', icon: Rocket },
                        { label: 'Efficiency', value: '+312%', icon: BarChart3 }
                    ].map((stat, i) => (
                        <motion.div 
                            key={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInVariants}
                            custom={i}
                            className="glass-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border-white/5 text-center group hover:border-[#FBFC09]/20 transition-all duration-700"
                        >
                            <stat.icon size={20} className="mx-auto mb-4 md:mb-6 text-white/10 group-hover:text-[#FBFC09] transition-colors" />
                            <h4 className="text-5xl md:text-6xl font-black text-white mb-2 uppercase italic tracking-tighter leading-none">{stat.value}</h4>
                            <p className="text-[#FBFC09] font-black uppercase tracking-[0.4em] text-[8px]">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* The Process Section - Staggered Reveal */}
            <div className="max-w-7xl mx-auto px-6 relative z-20 mb-48 md:mb-64 text-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInVariants}
                    custom={0}
                    className="mb-20 md:mb-32"
                >
                    <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none mb-6">
                        THE <span className="text-[#FBFC09]">STRATEGY</span>
                    </h2>
                    <div className="h-1 w-20 md:w-24 bg-[#FBFC09] mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 text-left">
                    {[
                        { step: '01', title: 'ONBOARD', desc: 'Secure transmission of project requirements and objectives.' },
                        { step: '02', title: 'EXECUTE', desc: 'Surgical precision in creative and technical implementation.' },
                        { step: '03', title: 'SCALE', desc: 'Automated monitoring and massive growth deployment.' }
                    ].map((phase, i) => (
                        <motion.div 
                            key={i} 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInVariants}
                            custom={i + 1}
                            className="relative group"
                        >
                            <span className="text-8xl md:text-9xl font-black text-white/5 absolute -top-8 md:-top-12 -left-4 md:-left-6 group-hover:text-[#FBFC09]/10 transition-colors uppercase">{phase.step}</span>
                            <div className="relative pt-8 md:pt-12">
                                <h3 className="text-2xl md:text-3xl font-black text-white mb-4 md:mb-6 uppercase italic tracking-tighter">{phase.title}</h3>
                                <p className="text-white/40 font-bold italic leading-relaxed text-xs md:text-sm pr-6 md:pr-12">{phase.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Performance Value - Slide and Reveal */}
            <div className="max-w-7xl mx-auto px-6 pb-48 md:pb-64">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-200px" }}
                    variants={fadeInVariants}
                    custom={0}
                    className="glass-card rounded-[3.5rem] md:rounded-[5rem] border-white/5 p-8 md:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16 md:gap-24 group"
                >
                    <div className="lg:w-1/2 space-y-8 md:space-y-12">
                        <h2 className="text-5xl md:text-9xl font-black text-white leading-[0.9] md:leading-[0.8] uppercase italic tracking-tighter">
                            ELITE <br /><span className="text-[#FBFC09]">INTELLIGENCE</span>
                        </h2>
                        <p className="text-white/40 text-lg md:text-xl font-bold italic leading-relaxed border-l-4 border-[#FBFC09] pl-6 md:pl-8">
                            High-authority dashboards for high-authority owners. 
                            Track your projects with total transparency and tactical precision.
                        </p>
                        <a href="https://pehchanly.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-4 text-[#FBFC09] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[10px] hover:translate-x-3 transition-transform">
                            <span>POWERED BY PEHCHANLY.COM</span>
                            <ChevronRight size={16} />
                        </a>
                    </div>
                    <div className="lg:w-1/2 w-full relative">
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="aspect-square bg-gradient-to-br from-[#FBFC09]/10 to-transparent rounded-[3rem] md:rounded-[4rem] flex items-center justify-center border border-white/5 shadow-2xl scale-95 group-hover:scale-100 transition-transform duration-1000"
                        >
                             <TrendingUp size={100} className="md:w-[160px] md:h-[160px] text-[#FBFC09] drop-shadow-[0_0_50px_rgba(251,252,9,0.3)]" />
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default Landing;
