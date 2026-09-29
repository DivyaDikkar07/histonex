import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, CheckSquare, BarChart, Users, Settings, LogOut, Check, X, Eye, Image as ImageIcon, Trophy, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSubmissions } from '../hooks/useSubmissions';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('photo-submissions');
  
  const { pendingSubmissions, updateStatus } = useSubmissions();
  
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Dummy text verification queue (can keep this for demo purposes)
  const [queue, setQueue] = useState([
    { id: 1, title: 'The Legend of Raigad Fort', user: 'local_historian', status: 'pending', date: '2023-10-15', location: 'Raigad, Maharashtra' },
    { id: 2, title: 'Hidden Cave Sculptures', user: 'heritage_walker', status: 'pending', date: '2023-10-14', location: 'Ajanta Caves' }
  ]);

  const handleApprove = (id: number) => {
    setQueue(queue.filter(q => q.id !== id));
  };

  const handleReject = (id: number) => {
    setQueue(queue.filter(q => q.id !== id));
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'verification', label: 'Story Queue', icon: <CheckSquare className="w-5 h-5" /> },
    { id: 'photo-submissions', label: 'Photo Submissions', icon: <ImageIcon className="w-5 h-5" /> },
    { id: 'photo-challenges', label: 'Photo Challenges', icon: <Trophy className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart className="w-5 h-5" /> },
    { id: 'users', label: 'Users', icon: <Users className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
  ];

  const handlePhotoAction = (id: string, action: 'approved' | 'rejected') => {
    updateStatus(id, action);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminId === 'admin' && adminPass === 'admin123') {
      setIsAdminLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Admin ID or Password');
    }
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="flex-grow flex items-center justify-center bg-[#030914] min-h-[calc(100vh-64px)] p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 glass-panel-dark border border-heritage-orange/30 rounded-3xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-heritage-orange/10 blur-[50px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-deep-navy border-2 border-heritage-orange flex items-center justify-center mb-4 shadow-lg shadow-heritage-orange/20">
              <ShieldAlert className="w-8 h-8 text-heritage-orange" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-white">Admin Portal</h2>
            <p className="text-sm text-cream/50 mt-1">Authorized Personnel Only</p>
          </div>
          
          <form onSubmit={handleAdminLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-cream/70 uppercase tracking-wider mb-2">Admin ID</label>
              <input 
                type="text" 
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="Enter Admin ID (admin)"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-cream/30 focus:outline-none focus:border-heritage-orange/50 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-cream/70 uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                placeholder="Enter Password (admin123)"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-cream/30 focus:outline-none focus:border-heritage-orange/50 transition-colors"
                required
              />
            </div>
            
            {loginError && (
              <p className="text-red-500 text-sm text-center font-medium bg-red-500/10 py-2 rounded-lg border border-red-500/20">{loginError}</p>
            )}
            
            <button 
              type="submit"
              className="w-full py-3 bg-heritage-orange hover:bg-orange-600 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(217,107,39,0.2)] mt-4"
            >
              Access Portal
            </button>
          </form>
          
          <div className="mt-6 text-center">
             <Link to="/" className="text-xs text-cream/50 hover:text-white transition-colors">← Back to Main Site</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-grow flex bg-[#030914] min-h-[calc(100vh-64px)]">
      
      {/* Sidebar */}
      <div className="w-64 glass-panel-dark border-r border-white/10 hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white font-serif">Admin Portal</h2>
          <p className="text-xs text-cream/50 mt-1">Superuser Access</p>
        </div>
        
        <div className="flex-grow py-6 px-4 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? 'bg-heritage-orange text-white shadow-lg shadow-heritage-orange/20' 
                  : 'text-cream/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
              {item.id === 'verification' && queue.length > 0 && (
                <span className="ml-auto bg-deep-navy text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {queue.length}
                </span>
              )}
            </button>
          ))}
        </div>
        
        <div className="p-4 border-t border-white/10">
          <button onClick={() => setIsAdminLoggedIn(false)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-cream/70 hover:bg-white/5 hover:text-white transition-all">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
          <Link to="/" className="w-full mt-2 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-cream/70 hover:bg-white/5 hover:text-white transition-all">
            Exit Portal
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white capitalize">{activeTab.replace('-', ' ')}</h1>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-white">Admin User</div>
                <div className="text-xs text-cream/50">admin@histonex.demo</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-heritage-orange to-warm-gold border-2 border-deep-navy flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            
            {activeTab === 'dashboard' && (
              <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="glass-panel-dark p-6 rounded-2xl border border-white/10 border-l-4 border-l-heritage-orange">
                    <h3 className="text-cream/60 text-sm font-medium mb-1">Total Heritage Sites</h3>
                    <p className="text-3xl font-bold text-white">124</p>
                  </div>
                  <div className="glass-panel-dark p-6 rounded-2xl border border-white/10 border-l-4 border-l-success-green">
                    <h3 className="text-cream/60 text-sm font-medium mb-1">Verified Stories</h3>
                    <p className="text-3xl font-bold text-white">1,402</p>
                  </div>
                  <div className="glass-panel-dark p-6 rounded-2xl border border-white/10 border-l-4 border-l-warm-gold">
                    <h3 className="text-cream/60 text-sm font-medium mb-1">Total HistoScans</h3>
                    <p className="text-3xl font-bold text-white">45.2K</p>
                  </div>
                </div>
                
                <div className="glass-panel-dark p-8 rounded-3xl border border-white/10 h-64 flex items-center justify-center">
                  <p className="text-cream/50">Analytics Chart Placeholder</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'verification' && (
              <motion.div key="verification" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="text-cream/70 mb-6">Review community submitted stories for historical accuracy before publishing them to the public archive.</p>
                
                <div className="space-y-4">
                  {queue.length === 0 ? (
                    <div className="text-center py-16 glass-panel-dark rounded-2xl border border-white/10">
                      <CheckSquare className="w-12 h-12 text-cream/30 mx-auto mb-4" />
                      <p className="text-cream/50">The verification queue is empty. All caught up!</p>
                    </div>
                  ) : (
                    queue.map(item => (
                      <div key={item.id} className="glass-panel-dark p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row gap-6 sm:items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-2 py-1 bg-warm-gold/20 text-warm-gold text-xs font-bold rounded">Pending</span>
                            <span className="text-cream/50 text-xs">{item.date}</span>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                          <p className="text-cream/70 text-sm mb-2">Location: {item.location}</p>
                          <p className="text-cream/50 text-xs">Submitted by: @{item.user}</p>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-4 sm:mt-0">
                          <button className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10" title="Review Content">
                            <Eye className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleReject(item.id)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors border border-red-500/20" 
                            title="Reject/Request Changes"
                          >
                            <X className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleApprove(item.id)}
                            className="p-2 bg-success-green/20 hover:bg-success-green/30 text-success-green rounded-lg transition-colors border border-success-green/30" 
                            title="Approve & Publish"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'photo-submissions' && (
              <motion.div key="photo-submissions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex justify-between items-end mb-6">
                  <p className="text-cream/70 max-w-xl">Review community photo submissions before publishing them to the Photo Challenge gallery.</p>
                </div>
                
                <div className="space-y-6">
                  {pendingSubmissions.length === 0 ? (
                    <div className="text-center py-16 glass-panel-dark rounded-2xl border border-white/10">
                      <ImageIcon className="w-12 h-12 text-cream/30 mx-auto mb-4" />
                      <p className="text-cream/50">The photo queue is empty. All caught up!</p>
                    </div>
                  ) : (
                    pendingSubmissions.map(item => (
                      <div key={item.id} className="glass-panel-dark p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-64 h-48 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                          <img src={item.photoUrl} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        
                        <div className="flex-grow flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-1 bg-warm-gold/20 text-warm-gold text-xs font-bold rounded">Pending Review</span>
                                <span className="text-cream/50 text-xs">{new Date(item.dateSubmitted).toLocaleDateString()}</span>
                              </div>
                              <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                            </div>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handlePhotoAction(item.id, 'rejected')}
                                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold rounded-lg transition-colors border border-red-500/20 text-sm" 
                              >
                                Reject
                              </button>
                              <button 
                                onClick={() => handlePhotoAction(item.id, 'approved')}
                                className="px-4 py-2 bg-success-green/20 hover:bg-success-green/30 text-success-green font-bold rounded-lg transition-colors border border-success-green/30 text-sm flex items-center gap-1" 
                              >
                                <Check className="w-4 h-4" /> Approve
                              </button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-4 text-sm">
                            <div><span className="text-cream/50">Location:</span> <span className="text-white">{item.locationName}</span></div>
                            <div><span className="text-cream/50">User:</span> <span className="text-white">@{item.photographer}</span></div>
                            <div><span className="text-cream/50">Challenge:</span> <span className="text-white">Heritage Through Your Lens</span></div>
                            <div><span className="text-cream/50">AI Check:</span> <span className="text-success-green">Passed</span></div>
                          </div>
                          
                          <div className="mt-auto">
                            <p className="text-cream/70 text-sm italic">"{item.story}"</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'photo-challenges' && (
              <motion.div key="photo-challenges" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-cream/70">Manage photo competitions, themes, and prizes.</p>
                  <button className="px-6 py-2 bg-heritage-orange text-white rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors">
                    + Create Challenge
                  </button>
                </div>
                
                <div className="glass-panel-dark p-8 rounded-2xl border border-white/10 text-center py-16">
                  <Trophy className="w-12 h-12 text-warm-gold mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-bold text-white mb-2">Heritage Through Your Lens</h3>
                  <p className="text-cream/50 mb-6">Active from Sept 1 - Sept 30</p>
                  <div className="flex justify-center gap-8 text-sm">
                    <div><span className="block text-2xl font-bold text-white">2.4K</span> Participants</div>
                    <div><span className="block text-2xl font-bold text-white">4.8K</span> Submissions</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Other tabs can be empty placeholders for the demo */}
            {['analytics', 'users', 'settings'].includes(activeTab) && (
              <motion.div key="other" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-20 glass-panel-dark rounded-3xl border border-white/10">
                <p className="text-cream/50">This module is under development for the SIH prototype.</p>
              </motion.div>
            )}
            
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
