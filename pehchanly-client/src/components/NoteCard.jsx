import { Trash2, Shield, Clock } from 'lucide-react';

const NoteCard = ({ note, onDelete }) => {
    return (
        <div className="bg-white/[0.03] p-10 rounded-[3rem] border border-white/5 hover:border-[#FBFC09]/20 transition-all duration-500 group relative overflow-hidden backdrop-blur-sm">
            <div className="flex justify-between items-start mb-8">
                <div className="flex items-center text-[10px] font-black text-white/20 uppercase tracking-[0.3em] space-x-4">
                    <div className="p-2 bg-white/5 rounded-xl group-hover:bg-[#FBFC09]/10 transition-colors">
                        <Shield size={14} className="text-[#FBFC09]" />
                    </div>
                    <span className="italic">TRANSMISSION DATE: {new Date(note.createdAt).toLocaleDateString()}</span>
                </div>
                <button onClick={() => onDelete(note._id)} className="p-3 text-white/10 hover:text-red-500 hover:bg-red-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <Trash2 size={20} />
                </button>
            </div>
            <p className="text-white/60 font-bold leading-relaxed whitespace-pre-wrap pl-2 italic">
                {note.content}
            </p>
            
            {/* Subtle Gradient Decor */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FBFC09]/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:opacity-10 transition-opacity" />
        </div>
    );
};

export default NoteCard;
