import { TrendingUp, TrendingDown, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, trend }) => {
    return (
        <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-card p-12 rounded-[4rem] border-white/5 relative overflow-hidden group hover:border-[#FBFC09]/40 transition-all duration-700 bg-white/[0.01] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.5)]"
        >
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                    <div className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 group-hover:border-[#FBFC09]/30 transition-all duration-700">
                        <Icon size={32} className="text-[#FBFC09] drop-shadow-[0_0_10px_rgba(251,252,9,0.3)]" />
                    </div>
                    {trend && (
                        <div className={`flex items-center text-[10px] font-black px-5 py-2 rounded-full ${trend > 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'} border uppercase tracking-widest`}>
                            {trend > 0 ? <TrendingUp size={14} className="mr-2" /> : <TrendingDown size={14} className="mr-2" />}
                            {Math.abs(trend)}%
                        </div>
                    )}
                </div>
                <div>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4 italic transition-colors group-hover:text-white/60">{title}</p>
                    <p className="text-6xl font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-2xl">
                        {value}
                    </p>
                </div>
            </div>
            
            {/* Subtle Gradient Glow */}
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#FBFC09]/5 opacity-0 rounded-full blur-[80px] pointer-events-none group-hover:opacity-100 transition-opacity duration-1000" />
        </motion.div>
    );
};

export default StatCard;
