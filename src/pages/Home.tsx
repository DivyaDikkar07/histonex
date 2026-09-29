import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Camera, MapPin, ChevronRight, ChevronLeft,
  Users, ArrowRight, Compass
} from 'lucide-react';
import { demoHeritageSites } from '../data/heritage';
import type { HeritageVideo } from '../data/heritage';
import HeritageImage from '../components/ui/HeritageImage';
import VideoCard from '../components/ui/VideoCard';
import VideoModal from '../components/ui/VideoModal';

export default function Home() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  
  const featuredSites = demoHeritageSites.slice(0, 8); // Take top 8 for slider

  // Category Filter State
  const categories = ['All', 'Caves', 'Forts', 'Temples', 'Museums', 'Monuments', 'UNESCO', 'Archaeological Sites'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeVideo, setActiveVideo] = useState<HeritageVideo | null>(null);

  // Extract all available videos from demoHeritageSites
  const homeVideos = useMemo(() => {
    return demoHeritageSites
      .filter(site => site.videos && site.videos.length > 0)
      .map(site => site.videos![0])
      .slice(0, 6);
  }, []);
  
  const filteredGridSites = demoHeritageSites.filter(site => 
    activeCategory === 'All' || site.category.includes(activeCategory)
  );

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      const slider = document.getElementById('featured-slider');
      if (slider) {
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
          slider.scrollTo({ left: 0, behavior: 'smooth' }); // Loop back
        } else {
          slider.scrollBy({ left: slider.clientWidth * 0.7, behavior: 'smooth' });
        }
      }
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-deep-navy font-sans">
      
      {/* 2. HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ 
            y: heroY,
            backgroundImage: 'url(https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2000&auto=format&fit=crop)'
          }}
          className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center"
        >
          <div className="absolute inset-0 bg-deep-navy/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/20 to-transparent" />
          
          {/* Subtle AI Scanning Effect */}
          <motion.div 
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-1 bg-heritage-orange/30 shadow-[0_0_30px_rgba(217,107,39,0.5)] z-10"
          />
        </motion.div>

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 tracking-tight drop-shadow-2xl"
          >
            Every Monument <br />
            <span className="italic font-light text-warm-gold">Has a Story.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-cream/90 max-w-2xl mx-auto mb-10 font-light leading-relaxed drop-shadow-md"
          >
            Discover India's cultural heritage through AI-powered recognition, immersive experiences, historical stories, and digital preservation.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => {
                document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-heritage-orange hover:bg-orange-600 text-white rounded-full font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-5 h-5" />
              Explore Heritage
            </button>
            <Link 
              to="/HistoLens"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Camera className="w-5 h-5" />
              Open HistoLens
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-6"
          >
            <Link to="/HistoLens" className="text-sm font-medium text-warm-gold hover:text-white transition-colors underline underline-offset-4">
              Try HistoScan Demo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 3. FEATURED HERITAGE IMAGE SLIDER */}
      <section className="py-24 bg-deep-navy relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-sm font-bold tracking-widest text-warm-gold uppercase mb-2">Featured Heritage</h2>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-white">
              Explore the stories behind India's most remarkable places.
            </h3>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                const slider = document.getElementById('featured-slider');
                if (slider) slider.scrollBy({ left: -slider.clientWidth * 0.7, behavior: 'smooth' });
              }}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => {
                const slider = document.getElementById('featured-slider');
                if (slider) slider.scrollBy({ left: slider.clientWidth * 0.7, behavior: 'smooth' });
              }}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[100vw]">
          <div 
            id="featured-slider"
            className="flex overflow-x-auto hide-scrollbar gap-6 snap-x snap-mandatory pb-8"
          >
            {featuredSites.map((site) => (
              <div 
                key={site.id}
                className="min-w-[85%] md:min-w-[70%] lg:min-w-[60%] snap-center shrink-0"
              >
                <div 
                  className="relative h-[60vh] rounded-3xl overflow-hidden group cursor-pointer"
                  onClick={() => navigate(`/heritage/${site.id}`)}
                >
                  <HeritageImage 
                    src={site.image} 
                    alt={site.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/40 to-transparent opacity-90" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white mb-4">
                      {site.category}
                    </span>
                    <h4 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">{site.name}</h4>
                    <p className="text-lg text-warm-gold flex items-center gap-2 mb-4">
                      <MapPin className="w-5 h-5" /> {site.location}
                    </p>
                    <p className="text-cream/80 line-clamp-2 max-w-xl mb-6">{site.shortDescription}</p>
                    <button className="px-6 py-3 bg-white text-deep-navy hover:bg-cream rounded-full font-bold transition-colors flex items-center gap-2">
                      Explore Destination <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 & 5 & 6. EXPLORE HERITAGE & FILTERS & GRID */}
      <section id="explore-section" className="py-24 bg-[#081525]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-bold tracking-widest text-warm-gold uppercase mb-2">Explore Heritage</h2>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-white max-w-3xl mx-auto leading-tight">
              From ancient caves to majestic forts, discover the places that shaped India's cultural story.
            </h3>
          </motion.div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-heritage-orange text-white'
                    : 'bg-white/5 border border-white/10 text-cream/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Places Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredGridSites.map(site => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={site.id}
                  className="group"
                >
                  <Link to={`/heritage/${site.id}`} className="block h-full">
                    <div className="relative h-80 rounded-2xl overflow-hidden mb-4">
                      <HeritageImage 
                        src={site.image} 
                        alt={site.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-navy to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-semibold text-white">
                          {site.category}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-white group-hover:text-heritage-orange transition-colors mb-1">{site.name}</h4>
                      <div className="flex items-center gap-1 text-sm text-warm-gold mb-2">
                        <MapPin className="w-4 h-4" /> {site.location}
                      </div>
                      <p className="text-sm text-cream/60 line-clamp-2">{site.shortDescription}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>


      {/* 9 & 10. 3D HERITAGE EXPERIENCE & THEN VS NOW (Combined Showcase) */}
      <section className="py-24 bg-[#051121]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-bold tracking-widest text-warm-gold uppercase mb-2">Immersive Features</h2>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-white max-w-3xl mx-auto leading-tight">
              Experience heritage beyond a photograph.
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* 3D View Card */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group relative h-[450px] rounded-3xl overflow-hidden glass-panel-dark border border-white/10"
            >
              <div className="absolute inset-0 bg-[#0a1526] perspective-1000">
                <motion.div 
                  className="w-full h-full"
                  whileHover={{ rotateY: 5, rotateX: -5, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src="/ajanta_3d.jpg" 
                    alt="3D View" 
                    className="w-full h-full object-cover opacity-60"
                  />
                  {/* Hotspots */}
                  <div className="absolute top-1/3 left-1/3 w-4 h-4 rounded-full bg-warm-gold border-2 border-white shadow-[0_0_15px_#C99A45]" />
                  <div className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full bg-heritage-orange border-2 border-white shadow-[0_0_15px_#D96B27]" />
                </motion.div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
                <h4 className="text-2xl font-bold text-white mb-2">3D Heritage View</h4>
                <p className="text-cream/70 text-sm">Interactive AR-Inspired exploration of monuments and artifacts.</p>
              </div>
            </motion.div>

            {/* Then Vs Now Card */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="group relative h-[450px] rounded-3xl overflow-hidden glass-panel-dark border border-white/10"
            >
              <div className="absolute inset-0">
                {/* Right side (Now) */}
                <img 
                  src="/ajanta_present.jpg" 
                  alt="Present" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Left side (Then - historical photo) */}
                <div 
                  className="absolute inset-0 w-full h-full object-cover border-r-2 border-white bg-cover bg-center"
                  style={{ backgroundImage: 'url(/ajanta_past.jpg)', clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
                />
                {/* Slider Handle */}
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-deep-navy font-bold text-lg shadow-lg">
                    ↔
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8 pointer-events-none flex justify-between items-end">
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">Then ↔ Now</h4>
                  <p className="text-cream/70 text-sm">Compare historical reconstructions with current views.</p>
                </div>
                <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs text-white">Drag to compare</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 11. WALK THROUGH HISTORY */}
      <section className="py-24 bg-deep-navy border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16">
            
            {/* Timeline Preview */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-sm font-bold tracking-widest text-warm-gold uppercase mb-2">Walk Through History</h2>
              <h3 className="text-4xl font-serif font-bold text-white mb-10">Interactive Timelines</h3>
              
              <div className="relative border-l-2 border-white/10 ml-4 space-y-8">
                {[
                  { year: '~200 BCE', title: 'Early Development', desc: 'Initial rock excavations begin.' },
                  { year: '5th Century CE', title: 'Major Artistic Era', desc: 'Creation of masterpieces under Vakataka dynasty.' },
                  { year: '1819', title: 'Rediscovery', desc: 'Accidental discovery by British officers.' }
                ].map((item, i) => (
                  <div key={i} className="relative pl-8">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-deep-navy border-2 border-heritage-orange" />
                    <span className="text-heritage-orange font-bold text-sm block mb-1">{item.year}</span>
                    <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-cream/60 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>



          </div>
        </div>
      </section>

      {/* 11.5 WATCH THE STORY */}
      {homeVideos.length > 0 && (
        <section className="py-24 bg-[#0a1526] border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-sm font-bold tracking-widest text-warm-gold uppercase mb-2">Heritage Stories</h2>
                <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Watch the Story</h3>
                <p className="text-cream/70 max-w-xl text-lg">
                  Explore documentaries, virtual tours, and stories behind India's historic places.
                </p>
              </div>
              <Link 
                to="/stories" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full font-bold transition-all whitespace-nowrap"
              >
                Explore All Videos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Horizontal Video Scroll / Grid */}
            <div className="flex overflow-x-auto hide-scrollbar gap-6 snap-x snap-mandatory pb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
              {homeVideos.map((video, idx) => (
                <div key={idx} className="min-w-[85%] md:min-w-[45%] lg:min-w-[30%] snap-center shrink-0">
                  <VideoCard video={video} onClick={setActiveVideo} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 12. CAPTURE HISTORY - PHOTO CHALLENGE */}
      <section className="py-24 bg-[#0a1526] border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-heritage-orange/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-heritage-orange uppercase mb-2 flex items-center justify-center gap-2">
              <Camera className="w-4 h-4" /> Capture. Share. Win.
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Your Lens. Our Heritage.</h3>
            <p className="text-cream/70 max-w-2xl mx-auto text-lg">
              Millions of stories are hidden in photographs. Visited a heritage site? Your photograph could become the next HISTONEX featured memory.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { img: '/user_ajanta.jpg', title: 'Ancient Light', loc: 'Ajanta' },
              { img: '/hampi_slider.png', title: 'Golden Hour', loc: 'Hampi' },
              { img: '/ellora_slider.jpg', title: 'The Stone Story', loc: 'Ellora' },
              { img: '/raigad_slider.png', title: 'Above Clouds', loc: 'Raigad' }
            ].map((photo, i) => (
              <div key={i} className={`relative rounded-2xl overflow-hidden group aspect-[3/4] ${i === 1 || i === 3 ? 'md:mt-8' : ''}`}>
                <img src={photo.img} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <h4 className="text-white font-bold truncate">{photo.title}</h4>
                  <p className="text-xs text-heritage-orange font-bold flex items-center gap-1"><MapPin className="w-3 h-3" /> {photo.loc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/photo-challenge" className="px-8 py-4 bg-heritage-orange hover:bg-orange-600 text-white rounded-full font-bold transition-all text-sm flex items-center gap-2">
              <Camera className="w-4 h-4" /> Join Photo Challenge
            </Link>
            <Link to="/photo-challenge" className="px-8 py-4 glass-panel border border-white/20 hover:bg-white/10 text-white rounded-full font-bold transition-all text-sm">
              View Community Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* 14. COMMUNITY STORY PRESERVATION */}
      <section className="py-24 bg-[#081525]">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-sm font-bold tracking-widest text-warm-gold uppercase mb-2">Preserve A Story</h2>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            "Some stories live in books. <br/> <span className="text-cream/50 italic">Others live in people.</span>"
          </h3>
          <p className="text-lg text-cream/70 max-w-2xl mx-auto mb-10 font-light">
            Contribute local folklore, family memories, or oral history to our digital archive. Our AI Assistant helps structure your story for verification.
          </p>
          <Link to="/community" className="inline-flex items-center gap-2 px-8 py-4 glass-panel border border-white/20 hover:bg-white/10 text-white rounded-full font-bold transition-all">
            <Users className="w-5 h-5 text-heritage-orange" /> Share Your Story
          </Link>
        </motion.div>
      </section>

      {/* 15. FINAL CTA */}
      <section className="relative py-32 overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=2000&auto=format&fit=crop)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/80 to-transparent" />
        
        <div className="relative z-10 max-w-3xl px-4 mx-auto">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Your next journey through history starts here.
          </h2>
          <p className="text-xl text-warm-gold font-medium tracking-wide mb-10">
            Discover. Experience. Remember. Preserve.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 bg-heritage-orange hover:bg-orange-600 text-white rounded-full font-semibold transition-all shadow-lg shadow-heritage-orange/30"
            >
              Explore Heritage
            </button>
            <Link 
              to="/HistoLens"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all border border-white/20 backdrop-blur-md"
            >
              Open HistoLens
            </Link>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
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
