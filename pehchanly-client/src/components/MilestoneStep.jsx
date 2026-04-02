const MilestoneStep = ({ milestone, isLast }) => {
    const isDone = milestone.status === 'Done';
    const isCurrent = milestone.status === 'In Progress';

    return (
        <div className="flex relative items-start mb-14 group">
            {!isLast && (
                <div className={`absolute left-5 top-12 bottom-0 w-px ${isDone ? 'bg-[#FBFC09]/30' : 'bg-white/5'} ml-[-0.5px] transition-colors`} />
            )}
            
            <div className={`relative z-10 flex items-center justify-center h-10 w-10 rounded-2xl border-2 transition-all duration-1000 
                ${isDone ? 'bg-[#FBFC09] border-[#FBFC09] shadow-[0_0_20px_rgba(251,252,9,0.4)]' : 
                  isCurrent ? 'bg-white border-white animate-pulse' : 
                  'bg-[#122837] border-white/10'}`}
            >
                {isDone && (
                    <svg className="w-6 h-6 text-[#122837]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                )}
            </div>

            <div className="ml-10 pt-1">
                <h4 className={`text-2xl font-black uppercase tracking-tight transition-all duration-700 italic leading-none ${isDone ? 'text-white' : isCurrent ? 'text-[#FBFC09]' : 'text-white/20'}`}>
                    {milestone.title}
                </h4>
                <p className={`mt-2 text-[10px] font-black uppercase tracking-[0.3em] ${isDone ? 'text-white/30' : isCurrent ? 'text-[#FBFC09]/60' : 'text-white/10'}`}>
                    {milestone.status} • {milestone.dueDate ? new Date(milestone.dueDate).toLocaleDateString() : 'TBD'}
                </p>
            </div>
        </div>
    );
};

export default MilestoneStep;
