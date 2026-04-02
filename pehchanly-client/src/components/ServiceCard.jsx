import { Check, ArrowUpRight, Zap, Target, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceCard = ({ service, onContact }) => {
    return (
        <motion.div 
            whileHover={{ y: -12, scale: 1.02 }}
            className="glass-card rounded-[4.5rem] border-white/5 p-12 flex flex-col group h-full transition-all duration-700 hover:border-[#FBFC09]/40 bg-white/[0.01]"
        >
            <div className="flex-grow relative">
                <div className="flex justify-between items-start mb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#FBFC09]" />
                        <span className="text-[10px] font-black text-[#FBFC09] uppercase tracking-[0.4em] italic">
                            {service.category} SOLUTION
                        </span>
                    </div>
                </div>
                
                <h3 className="text-5xl font-black text-white mb-8 tracking-tighter group-hover:text-[#FBFC09] transition-colors uppercase italic leading-none">
                    {service.name}
                </h3>

                <div className="text-3xl font-black text-white/20 mb-10 tracking-widest italic flex items-baseline gap-4">
                    <span className="text-white font-black hover:text-[#FBFC09] transition-colors">${service.price}</span>
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40">ESTIMATE</span>
                </div>
                
                <p className="text-white/40 mb-12 line-clamp-3 leading-relaxed font-bold text-sm italic pr-4">
                    {service.description}
                </p>
                
                <div className="grid grid-cols-1 gap-4 mb-16">
                    {service.techStack.map((tech, i) => (
                        <div key={i} className="flex items-center text-[10px] font-black text-white/30 group-hover:text-white/60 transition-all uppercase tracking-widest">
                            <Check size={14} className="text-[#FBFC09] mr-4 opacity-40 group-hover:opacity-100" />
                            {tech}
                        </div>
                    ))}
                </div>
            </div>
            
            <button
                onClick={() => onContact(service)}
                className="w-full glass-button group shadow-none hover:shadow-[#FBFC09]/20 h-[80px] text-xs"
            >
                GET STARTED NOW
                <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform duration-500" />
            </button>
        </motion.div>
    );
};

export default ServiceCard;
