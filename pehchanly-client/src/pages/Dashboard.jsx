import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../hooks/useAuth';
import MilestoneStep from '../components/MilestoneStep';
import NoteCard from '../components/NoteCard';
import { LayoutDashboard, CheckCircle, Clock, MessageSquare, Send, Loader2, Zap, AlertCircle, ChevronRight, Fingerprint, Activity, ListChecks } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const { user } = useAuth();
    const [project, setProject] = useState(null);
    const [notes, setNotes] = useState([]);
    const [noteContent, setNoteContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [submittingNote, setSubmittingNote] = useState(false);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const { data: projects } = await axiosInstance.get('/projects/my');
                if (projects.length > 0) {
                    setProject(projects[0]);
                    const { data: noteData } = await axiosInstance.get(`/notes/${projects[0]._id}/notes`);
                    setNotes(noteData);
                }
            } catch (error) { 
                if (error.response?.status !== 401) {
                    toast.error('Sync failure: Transmission interrupted.'); 
                }
            }
            finally { setLoading(false); }
        };
        fetchDashboardData();
    }, []);

    const handleAddNote = async (e) => {
        e.preventDefault();
        if (!noteContent.trim()) return;
        setSubmittingNote(true);
        try {
            const { data } = await axiosInstance.post(`/notes/${project._id}/notes`, { content: noteContent });
            setNotes([data, ...notes]);
            setNoteContent('');
            toast.success('Note added successfully.');
        } catch (error) { toast.error('Check transmission'); }
        finally { setSubmittingNote(false); }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#122837]"><Activity className="animate-spin text-[#FBFC09]" size={64} /></div>;

    if (!project) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-mesh-blue p-8">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-24 rounded-[5rem] border-white/5 max-w-3xl text-center">
                <Fingerprint size={100} className="mx-auto text-[#FBFC09] mb-12" />
                <h2 className="text-6xl font-black text-white mb-8 uppercase italic tracking-tighter">WELCOME.</h2>
                <p className="text-white/40 font-bold leading-relaxed mb-16 uppercase tracking-[0.4em] text-xs">
                    Your profile is active, but no projects are currently assigned. 
                    <br />Contact us to start your next project.
                </p>
                <Link to="/services" className="glass-button bg-[#FBFC09] text-[#122837] min-w-[320px]">VIEW OUR SERVICES</Link>
            </motion.div>
        </div>
    );

    const doneCount = project.milestones.filter(m => m.status === 'Done').length;
    const progress = (doneCount / project.milestones.length) * 100;

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="min-h-screen bg-mesh-blue py-32 md:py-48 px-4 md:px-6 lg:px-8 relative"
        >
            <div className="noise-overlay" />
            
            <div className="max-w-7xl mx-auto space-y-12 md:space-y-16 relative z-10">
                {/* Simplified Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 border-white/5 group transition-all duration-1000 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 md:gap-12 mb-12 md:mb-16">
                        <div>
                            <div className="inline-flex items-center space-x-3 px-4 md:px-5 py-2 rounded-xl bg-[#FBFC09]/10 border border-[#FBFC09]/20 text-[#FBFC09] text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] mb-8 md:mb-10">
                                <Activity size={14} className="animate-pulse" />
                                <span>LIVE PROJECT TRACKER</span>
                            </div>
                            <h1 className="text-5xl md:text-9xl font-black text-white mb-6 uppercase italic tracking-tighter leading-[0.85] md:leading-[0.8] group-hover:text-[#FBFC09] transition-colors break-words">
                                {project.title}
                            </h1>
                            <p className="text-white/20 font-black uppercase text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.6em] italic pl-2 border-l-2 border-[#FBFC09] ml-2">Service: {project.service.name}</p>
                        </div>
                        <div className="bg-[#122837]/60 px-8 md:px-12 py-4 md:py-6 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 shadow-2xl flex items-center space-x-4 md:space-x-5 self-start lg:self-auto">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FBFC09] shadow-[0_0_15px_rgba(251,252,9,0.7)]" />
                            <span className="font-black text-white uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-[11px] italic">{project.status}</span>
                        </div>
                    </div>

                    <div className="space-y-8 md:space-y-10">
                        <div className="flex justify-between items-end">
                            <div className="space-y-3 md:space-y-4">
                                <p className="text-[9px] md:text-[10px] font-black text-white/20 uppercase tracking-[0.4em] md:tracking-[0.5em] italic">PROJECT PROGRESS</p>
                                <p className="text-6xl md:text-8xl font-black text-white italic tracking-tighter drop-shadow-2xl">{Math.round(progress)}<span className="text-white/20 text-3xl md:text-4xl ml-2">%</span></p>
                            </div>
                        </div>
                        <div className="w-full bg-[#122837] rounded-full h-4 md:h-6 overflow-hidden border border-white/5 p-1 relative shadow-inner">
                            <motion.div 
                                initial={{ width: 0 }} 
                                animate={{ width: `${progress}%` }} 
                                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }} 
                                className="bg-[#FBFC09] h-full rounded-full shadow-[0_0_30px_rgba(251,252,9,0.3)]"
                            />
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
                    {/* Roadmap Column */}
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-5 glass-card rounded-[2.5rem] md:rounded-[5rem] p-8 md:p-16 border-white/5 group relative overflow-hidden">
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-12 md:mb-20 flex items-center uppercase italic tracking-tighter">
                            <ListChecks className="mr-4 md:mr-6 text-[#FBFC09]" size={32} md:size={40} />
                            PROJECT MILESTONES
                        </h3>
                        <div className="pl-4 md:pl-6 border-l-2 border-white/5 space-y-10 md:space-y-12">
                            {project.milestones.map((milestone, i) => (
                                <MilestoneStep key={i} milestone={milestone} isLast={i === project.milestones.length - 1} />
                            ))}
                        </div>
                    </motion.div>

                    {/* Feedback/Notes Column */}
                    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-7 space-y-8 md:space-y-12">
                        <div className="glass-card rounded-[2.5rem] md:rounded-[5rem] p-8 md:p-16 border-white/5 group">
                            <h3 className="text-2xl md:text-3xl font-black text-white mb-12 md:mb-16 flex items-center uppercase italic tracking-tighter">
                                <MessageSquare className="mr-4 md:mr-6 text-[#FBFC09]" size={32} md:size={40} />
                                PROJECT NOTES
                            </h3>
                            
                            <form onSubmit={handleAddNote} className="mb-12 md:mb-20">
                                <div className="relative">
                                    <textarea
                                        value={noteContent}
                                        onChange={(e) => setNoteContent(e.target.value)}
                                        placeholder="Add a comment..."
                                        className="w-full p-6 md:p-12 bg-[#122837]/60 border border-white/10 rounded-[2rem] md:rounded-[4rem] outline-none focus:border-[#FBFC09] transition-all text-white font-bold placeholder:text-white/10 min-h-[180px] md:min-h-[220px] resize-none pb-24 shadow-2xl text-sm"
                                    />
                                    <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8">
                                        <button type="submit" disabled={submittingNote || !noteContent.trim()} className="glass-button bg-[#FBFC09] text-[#122837] border-[#FBFC09] hover:bg-white px-8 md:px-12 h-14 md:h-[70px] shadow-2xl shadow-[#FBFC09]/10 text-[10px] md:text-xs">
                                            {submittingNote ? 'SAVING...' : 'ADD NOTE'}
                                            <Send size={16} className="ml-3 md:ml-4" />
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <div className="space-y-8 max-h-[500px] overflow-y-auto pr-6 custom-scrollbar">
                                <AnimatePresence initial={false}>
                                    {notes.map(note => (
                                        <motion.div key={note._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}>
                                            <NoteCard note={note} onDelete={async (id) => {
                                                try {
                                                    await axiosInstance.delete(`/notes/${id}`);
                                                    setNotes(notes.filter(n => n._id !== id));
                                                    toast.success('Note removed.');
                                                } catch (error) { toast.error('Failure'); }
                                            }} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {notes.length === 0 && (
                                    <div className="text-center py-20 text-white/5 font-black uppercase text-[10px] tracking-[0.8em] italic">
                                        No notes added yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
