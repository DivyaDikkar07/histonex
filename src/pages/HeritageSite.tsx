import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link, useLocation } from 'react-router-dom';
import { 
  Play, MapPin, Calendar, CheckCircle2, Scan, Camera, 
  Map as MapIcon, MessageSquare, History, Bookmark, X,
  ArrowRight, Compass, Heart, GraduationCap, Microscope, BookOpen, PlayCircle
} from 'lucide-react';
import { demoHeritageSites } from '../data/heritage';
import { demoSubmissions } from '../data/photoChallengeData';
import HeritageImage from '../components/ui/HeritageImage';
import VideoCard from '../components/ui/VideoCard';
import VideoModal from '../components/ui/VideoModal';
import PastVsPresentSlider from '../components/ui/PastVsPresentSlider';
import Heritage3DViewer from '../components/ui/Heritage3DViewer';
import type { HeritageVideo } from '../data/heritage';

export default function HeritageSite() {
  const { id } = useParams();
  const location = useLocation();
  const site = demoHeritageSites.find(s => s.id === id) || demoHeritageSites[0];
  
  const [activeModal, setActiveModal] = useState<'3d' | 'timeline' | 'compare' | null>(location.state?.activeModal || null);
  const [compareValue, setCompareValue] = useState(50);
  const [activeMode, setActiveMode] = useState<'student' | 'tourist' | 'researcher'>('tourist');
  const [activeVideo, setActiveVideo] = useState<HeritageVideo | null>(null);
  const [timelineYear, setTimelineYear] = useState(2026);

  useEffect(() => {
    if (location.state?.activeModal) {
      setActiveModal(location.state.activeModal);
    }
  }, [location.state]);

  const timelineEvents = [
    { year: '~200 BCE', title: 'Early Development', description: 'Initial excavation of the first caves.' },
    { year: '1st Century CE', title: 'Expansion', description: 'Addition of Chaityas and Viharas.' },
    { year: '5th Century CE', title: 'Major Artistic Development', description: 'Vakataka dynasty patronage leads to exquisite paintings.' },
    { year: '1819', title: 'Rediscovery', description: 'British officer John Smith rediscovers the caves.' },
    { year: 'Present', title: 'Conservation', description: 'UNESCO World Heritage Site with ongoing preservation.' }
  ];

  return (
    <div className="bg-deep-navy min-h-screen">
      
      {/* 1. CINEMATIC HERO */}
      <div className="relative h-[80vh] w-full flex items-end justify-start">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${site.image})` }}
        >
          {/* Gradients for text readability and cinematic feel */}
          <div className="absolute inset-0 bg-deep-navy/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-navy via-deep-navy/20 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs uppercase tracking-widest font-bold text-white border border-white/20">
                {site.category}
              </span>
              {site.verified && (
                <span className="flex items-center gap-1 px-4 py-1.5 bg-success-green/20 backdrop-blur-md rounded-full text-xs uppercase tracking-widest font-bold text-success-green border border-success-green/30">
                  <CheckCircle2 className="w-4 h-4" /> Verified Heritage Record
                </span>
              )}
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg">
              {site.name}
            </h1>

            <div className="flex flex-col sm:flex-row gap-6 text-cream/90 text-lg mb-8">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-heritage-orange" />
                {site.location}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-warm-gold" />
                {site.period}
              </div>
            </div>

            <p className="text-xl text-cream/80 font-light leading-relaxed max-w-2xl border-l-2 border-warm-gold pl-6">
              {site.shortDescription}
            </p>
          </motion.div>
        </div>
      </div>

      {/* 2. QUICK ACTIONS BAR */}
      <div className="sticky top-[72px] z-40 bg-deep-navy/95 backdrop-blur-xl border-b border-white/10 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-2 sm:pb-0">
            <Link to="/HistoLens" className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-heritage-orange hover:bg-orange-600 rounded-full text-white font-medium transition-colors">
              <Scan className="w-4 h-4" /> HistoScan
            </Link>
            <Link to="/HistoLens" className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 glass-panel border border-white/20 hover:bg-white/10 rounded-full text-white font-medium transition-colors">
              <Camera className="w-4 h-4" /> HistoLens
            </Link>
            <button onClick={() => setActiveModal('3d')} className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 glass-panel border border-white/20 hover:bg-white/10 rounded-full text-white font-medium transition-colors">
              <Compass className="w-4 h-4" /> Explore 3D
            </button>

            <button onClick={() => setActiveModal('timeline')} className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 glass-panel border border-white/20 hover:bg-white/10 rounded-full text-white font-medium transition-colors">
              <History className="w-4 h-4" /> View Timeline
            </button>
            <button onClick={() => setActiveModal('compare')} className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 glass-panel border border-white/20 hover:bg-white/10 rounded-full text-white font-medium transition-colors">
              <Play className="w-4 h-4" /> Then vs Now
            </button>
            <button 
              onClick={() => {
                if (site.videos && site.videos.length > 0) {
                  setActiveVideo(site.videos[0]);
                }
              }} 
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 rounded-full text-white font-medium transition-colors"
            >
              <PlayCircle className="w-4 h-4 text-red-500" /> Watch Video
            </button>
            <Link to="/map" className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 glass-panel border border-white/20 hover:bg-white/10 rounded-full text-white font-medium transition-colors">
              <MapIcon className="w-4 h-4" /> View on Map
            </Link>
            <button className="flex-shrink-0 ml-auto flex items-center justify-center w-10 h-10 glass-panel border border-white/20 hover:bg-white/10 rounded-full text-white font-medium transition-colors">
              <Bookmark className="w-5 h-5 text-warm-gold" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. EDITORIAL INFORMATION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Main Story Content */}
        <div className="lg:col-span-8 space-y-16">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl font-serif font-bold text-white mb-6">The Story of {site.name}</h2>
              <div className="w-20 h-1 bg-warm-gold rounded-full" />
            </div>
            
            {/* Mode Switcher */}
            <div className="flex bg-[#0a1526] p-1.5 rounded-xl border border-white/10 shadow-inner max-w-fit">
              <button
                onClick={() => setActiveMode('student')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeMode === 'student' ? 'bg-heritage-orange text-white shadow-lg' : 'text-cream/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <GraduationCap className="w-4 h-4" /> Student
              </button>
              <button
                onClick={() => setActiveMode('tourist')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeMode === 'tourist' ? 'bg-heritage-orange text-white shadow-lg' : 'text-cream/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <Camera className="w-4 h-4" /> Tourist
              </button>
              <button
                onClick={() => setActiveMode('researcher')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeMode === 'researcher' ? 'bg-heritage-orange text-white shadow-lg' : 'text-cream/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <Microscope className="w-4 h-4" /> Researcher
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeMode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              <section>
                <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider text-sm text-heritage-orange flex items-center gap-2">
                  <BookOpen className="w-5 h-5" /> Overview & Historical Background
                </h3>
                {site.information[activeMode].overview.map((paragraph, idx) => (
                  <p key={idx} className="text-lg text-cream/80 leading-relaxed mb-6 font-light">
                    {paragraph}
                  </p>
                ))}
              </section>

              {/* Large Inline Image */}
              <div className="w-full h-96 rounded-3xl overflow-hidden border border-white/10 my-12 relative group">
                <HeritageImage 
                  src={site.gallery?.[0] || site.image} 
                  alt="Interior" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-lg text-sm text-white border border-white/10">Intricate carvings and architecture</span>
                </div>
              </div>

              <section>
                <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider text-sm text-heritage-orange flex items-center gap-2">
                  <Compass className="w-5 h-5" /> Architecture and Art
                </h3>
                {site.information[activeMode].architecture.map((paragraph, idx) => (
                  <p key={idx} className="text-lg text-cream/80 leading-relaxed mb-6 font-light">
                    {paragraph}
                  </p>
                ))}
              </section>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Visitor Info Card */}
          <div className="glass-panel-dark rounded-3xl p-8 border border-white/10">
            <h4 className="text-xl font-bold text-white mb-6 font-serif">Visitor Information</h4>
            <ul className="space-y-4 text-cream/80 text-sm">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Timings</span>
                <span className="text-white font-medium">9:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Closed On</span>
                <span className="text-white font-medium">Mondays</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Entry Fee (Indian)</span>
                <span className="text-white font-medium">₹40</span>
              </li>
              <li className="flex justify-between pb-2">
                <span>Entry Fee (Foreigner)</span>
                <span className="text-white font-medium">₹600</span>
              </li>
            </ul>
            <button className="w-full mt-6 py-3 bg-heritage-orange hover:bg-orange-600 rounded-xl text-white font-bold transition-colors shadow-lg shadow-heritage-orange/20">
              Book Tickets
            </button>
          </div>

          {/* Audio Story Card */}
          <div className="glass-panel-dark rounded-3xl p-8 border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
            <div className="w-12 h-12 bg-heritage-orange rounded-full flex items-center justify-center mb-6 shadow-lg shadow-heritage-orange/30">
              <Play className="w-5 h-5 text-white ml-1" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2 font-serif">Listen to the Story</h4>
            <p className="text-sm text-cream/70 mb-6">Immerse yourself in a curated audio guide detailing the history of the caves.</p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">English</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Hindi</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Marathi</span>
            </div>
          </div>

        </div>
      </div>
      
      {/* Past vs Present Slider Section */}
      <div className="border-t border-white/10 pt-8 mt-12 bg-[#030914]">
        <PastVsPresentSlider site={site} />
      </div>
      
      {/* 4. WATCH THE STORY SECTION */}
      {site.videos && site.videos.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
          <div className="mb-10">
            <h2 className="text-sm font-bold tracking-widest text-warm-gold uppercase mb-2">Heritage Stories</h2>
            <h3 className="text-3xl font-serif font-bold text-white">Watch the Story</h3>
            <p className="text-cream/70 mt-2">Explore {site.name} through documentaries and virtual tours.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {site.videos.map((video, idx) => (
              <VideoCard key={idx} video={video} onClick={setActiveVideo} />
            ))}
          </div>
        </div>
      )}

      {/* 5. PHOTOS FROM VISITORS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h2 className="text-sm font-bold tracking-widest text-warm-gold uppercase mb-2">Community Gallery</h2>
            <h3 className="text-3xl font-serif font-bold text-white">Photos from Visitors</h3>
            <p className="text-cream/70 mt-2">See {site.name} through the eyes of our community.</p>
          </div>
          <div className="flex gap-4">
            <Link to="/photo-challenge" className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold transition-all text-sm border border-white/20">
              View Challenge
            </Link>
            <button className="px-6 py-2.5 bg-heritage-orange hover:bg-orange-600 text-white rounded-full font-bold transition-all text-sm flex items-center gap-2">
              <Camera className="w-4 h-4" /> Upload Photo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {demoSubmissions.filter(p => p.locationId === site.id).length > 0 ? (
            demoSubmissions.filter(p => p.locationId === site.id).map(photo => (
              <Link key={photo.id} to={`/photo-challenge/photo/${photo.id}`} className="block group">
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] border border-white/10">
                  <HeritageImage src={photo.photoUrl} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-bold line-clamp-1 group-hover:text-heritage-orange transition-colors">{photo.title}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-cream/70">by {photo.photographer}</span>
                      <span className="text-xs font-bold text-heritage-orange flex items-center gap-1"><Heart className="w-3 h-3 fill-current" /> {photo.votes}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-white/5 rounded-2xl border border-white/10 border-dashed">
              <Camera className="w-12 h-12 text-cream/30 mx-auto mb-4" />
              <p className="text-cream/70 mb-2">No photos yet for {site.name}.</p>
              <p className="text-white font-bold">Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </div>

      {/* MODALS FOR INTERACTIVE FEATURES */}
      <AnimatePresence>
        {activeModal === '3d' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#051121] flex flex-col"
          >
            <div className="p-4 flex justify-between items-center bg-deep-navy/80 backdrop-blur-md absolute top-0 w-full z-10 border-b border-white/10">
              <div>
                <h3 className="text-white font-bold text-lg">3D Heritage View: {site.name}</h3>
                <p className="text-cream/50 text-sm">AR-Inspired Exploration</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-grow relative overflow-hidden bg-black">
              <Heritage3DViewer imageSrc={site.id === 'ajanta-caves' ? '/ajanta_3d.jpg' : site.image} />
            </div>
          </motion.div>
        )}

        {activeModal === 'timeline' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#051121]/95 backdrop-blur-xl overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto py-20 px-4 relative">
              <button onClick={() => setActiveModal(null)} className="fixed top-6 right-6 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 z-50">
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center mb-16">
                <h2 className="text-4xl font-serif font-bold text-white mb-4">Walk Through History</h2>
                <div className="w-16 h-1 bg-warm-gold mx-auto rounded-full mb-12" />
                
                {site.historicalImages && site.historicalImages.length > 0 && (
                  <div className="max-w-3xl mx-auto mb-16">
                    <div className="h-64 md:h-96 relative bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                      {/* Present Image Base */}
                      <img src={site.image} alt="Present" className="absolute inset-0 w-full h-full object-cover" />
                      
                      {/* Historical Overlay */}
                      {(() => {
                        const sortedImages = [...site.historicalImages].sort((a, b) => a.year - b.year);
                        let closest = sortedImages[0];
                        let minDiff = Math.abs(timelineYear - closest.year);
                        for (const item of sortedImages) {
                          const diff = Math.abs(timelineYear - item.year);
                          if (diff < minDiff) {
                            minDiff = diff;
                            closest = item;
                          }
                        }
                        return (
                          <>
                            {sortedImages.map((histImg) => (
                              <img 
                                key={histImg.year}
                                src={histImg.image} 
                                alt={`Historical ${histImg.year}`} 
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                                  closest.image === histImg.image && timelineYear < 2026 ? 'opacity-100' : 'opacity-0'
                                }`}
                              />
                            ))}
                          </>
                        );
                      })()}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-navy to-transparent" />
                      
                      <div className="absolute bottom-6 left-6 flex flex-col gap-1 z-10 text-left">
                        <span className="text-white font-serif font-bold text-2xl drop-shadow-md">
                          Year: {timelineYear}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-8 px-4">
                      <input 
                        type="range" 
                        min={Math.min(...site.historicalImages.map(img => img.year))} 
                        max="2026" 
                        value={timelineYear}
                        onChange={(e) => setTimelineYear(parseInt(e.target.value))}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-heritage-orange focus:outline-none"
                      />
                      <div className="flex justify-between text-xs text-cream/50 mt-2 font-mono">
                        <span>{Math.min(...site.historicalImages.map(img => img.year))}</span>
                        <span>2026</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative border-l-2 border-white/10 ml-6 md:ml-0 md:border-l-0">
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10 hidden md:block transform -translate-x-1/2" />
                  
                  {timelineEvents.map((event, index) => (
                    <div key={index} className="relative mb-16 md:mb-24 flex items-center md:justify-between flex-col md:flex-row w-full group">
                      <div className="absolute left-[-9px] md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-deep-navy border-4 border-heritage-orange z-10 group-hover:scale-150 transition-transform duration-300" />
                      
                      <div className={`ml-8 md:ml-0 w-full md:w-[45%] ${index % 2 === 0 ? 'md:text-right' : 'md:order-last'}`}>
                        <div className="glass-panel-dark p-6 rounded-3xl border border-white/10 group-hover:border-heritage-orange/50 transition-colors bg-white/5">
                          <span className="text-warm-gold font-bold font-serif text-xl block mb-2">{event.year}</span>
                          <h4 className="text-2xl font-bold text-white mb-2">{event.title}</h4>
                          <p className="text-cream/70">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeModal === 'compare' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#051121] flex flex-col"
          >
            <div className="p-4 flex justify-between items-center absolute top-0 w-full z-10">
              <button onClick={() => setActiveModal(null)} className="p-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white/20 ml-auto">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-grow relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${site.pastVsPresent?.presentImage || site.image})` }}
                />
                <div 
                  className="absolute inset-0 bg-cover bg-center border-r-4 border-white grayscale-[0.8] sepia-[0.2]"
                  style={{ 
                    backgroundImage: `url(${site.pastVsPresent?.pastImage || site.image})`,
                    clipPath: `polygon(0 0, ${compareValue}% 0, ${compareValue}% 100%, 0 100%)`
                  }}
                />
                <input 
                  type="range" min="0" max="100" value={compareValue} 
                  onChange={(e) => setCompareValue(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                />
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none z-10"
                  style={{ left: `${compareValue}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div className="text-deep-navy text-xl font-bold">↔</div>
                  </div>
                </div>

                <div className="absolute top-8 left-8 px-6 py-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 text-white font-bold pointer-events-none">
                  Historical Reconstruction
                </div>
                <div className="absolute top-8 right-8 px-6 py-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 text-white font-bold pointer-events-none">
                  Present View
                </div>
            </div>
          </motion.div>
        )}

        {/* Video Modal */}
        {activeVideo && (
          <VideoModal 
            video={activeVideo} 
            onClose={() => setActiveVideo(null)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}
