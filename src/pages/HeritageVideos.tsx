import { useState, useMemo } from 'react';
import { Search, Play, Filter, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { demoHeritageSites } from '../data/heritage';
import type { HeritageVideo, HeritageSite } from '../data/heritage';
import VideoCard from '../components/ui/VideoCard';
import VideoModal from '../components/ui/VideoModal';

export default function HeritageVideos() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activePlace, setActivePlace] = useState('All');
  const [activeVideo, setActiveVideo] = useState<HeritageVideo | null>(null);

  // Extract all videos and attach the site information
  const allVideos = useMemo(() => {
    const videos: { video: HeritageVideo, site: HeritageSite }[] = [];
    demoHeritageSites.forEach(site => {
      if (site.videos) {
        site.videos.forEach(video => {
          videos.push({ video, site });
        });
      }
    });
    return videos;
  }, []);

  const categories = ['All', ...Array.from(new Set(allVideos.map(v => v.video.type)))];
  const places = ['All', ...Array.from(new Set(allVideos.map(v => v.site.name)))];

  const filteredVideos = useMemo(() => {
    return allVideos.filter(({ video, site }) => {
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            video.source.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || video.type === activeCategory;
      const matchesPlace = activePlace === 'All' || site.name === activePlace;
      return matchesSearch && matchesCategory && matchesPlace;
    });
  }, [allVideos, searchQuery, activeCategory, activePlace]);

  return (
    <div className="flex-grow flex flex-col bg-[#051121] min-h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="bg-deep-navy border-b border-white/10 py-12 px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-heritage-orange rounded-full flex items-center justify-center mb-6 shadow-lg shadow-heritage-orange/20">
            <Play className="w-8 h-8 text-white ml-1 fill-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-wide mb-4">Heritage Stories</h1>
          <p className="text-lg text-cream/70 max-w-2xl">
            Watch, explore and experience the stories behind India's historic places through documentaries and virtual tours.
          </p>

          {/* Search Bar */}
          <div className="mt-8 w-full max-w-2xl relative">
            <input 
              type="text" 
              placeholder="Search by title, place, or source..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a1526] border border-white/20 rounded-full py-4 pl-12 pr-6 text-white focus:outline-none focus:border-heritage-orange transition-colors"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cream/50" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-8">
          <div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filter by Type
            </h3>
            <div className="space-y-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                    activeCategory === cat ? 'bg-heritage-orange text-white font-bold' : 'text-cream/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Filter by Place
            </h3>
            <div className="space-y-2">
              {places.map(place => (
                <button
                  key={place}
                  onClick={() => setActivePlace(place)}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                    activePlace === place ? 'bg-heritage-orange text-white font-bold' : 'text-cream/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {place}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="flex-grow">
          {filteredVideos.length === 0 ? (
            <div className="text-center py-24 bg-white/5 rounded-2xl border border-white/10">
              <Play className="w-12 h-12 text-cream/20 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No videos found</h3>
              <p className="text-cream/60">Try adjusting your search or filters.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                  setActivePlace('All');
                }}
                className="mt-6 px-6 py-2 bg-heritage-orange hover:bg-orange-600 text-white rounded-full transition-colors text-sm font-bold"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredVideos.map(({ video, site }, idx) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={`${site.id}-${idx}`}
                  >
                    <VideoCard video={video} onClick={setActiveVideo} />
                    <div className="mt-3 px-1">
                      <p className="text-xs text-cream/50 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {site.name}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

      </div>

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
