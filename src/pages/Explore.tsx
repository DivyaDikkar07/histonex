import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BadgeCheck, MapPin, Search } from 'lucide-react';
import { demoHeritageSites } from '../data/heritage';
import HeritageImage from '../components/ui/HeritageImage';
import type { HeritageSite } from '../data/heritage';

export default function Explore() {
  const categories = ['All', 'Caves', 'Forts', 'Temples', 'Museums', 'UNESCO Sites', 'Archaeological Sites', 'Monuments'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSites = demoHeritageSites.filter(site => {
    const matchesCategory = activeCategory === 'All' || site.category === activeCategory;
    const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          site.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-grow bg-deep-navy pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Explore Heritage</h1>
          <p className="text-cream/70 max-w-2xl text-lg">
            Discover India's magnificent historical sites. From ancient rock-cut caves to majestic forts, uncover the stories set in stone.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex-grow max-w-md w-full relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search monuments, locations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-cream placeholder:text-cream/40 focus:outline-none focus:border-heritage-orange/50 transition-colors"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto hide-scrollbar">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category 
                    ? 'bg-heritage-orange text-white' 
                    : 'bg-white/5 text-cream/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Heritage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSites.map((site, index) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel-dark rounded-2xl overflow-hidden group hover:border-heritage-orange/30 transition-colors flex flex-col h-full"
            >
              <div className="relative h-60 overflow-hidden">
                <HeritageImage 
                  src={site.image} 
                  alt={site.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy to-transparent opacity-90" />
                
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-white/20 backdrop-blur-md text-white">
                      {site.category}
                    </span>
                    {site.verified && (
                      <span className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded bg-success-green/80 backdrop-blur-md text-white">
                        <BadgeCheck className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white">{site.name}</h3>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-sm text-warm-gold mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  {site.location}
                </div>
                
                <p className="text-cream/70 text-sm mb-4 line-clamp-2 flex-grow">
                  {site.shortDescription}
                </p>
                
                <div className="text-xs text-cream/50 mb-6">
                  <span className="font-semibold text-cream/70">Period:</span> {site.period}
                </div>
                
                <Link 
                  to={`/heritage/${site.id}`}
                  className="w-full py-3 bg-white/5 hover:bg-heritage-orange/20 border border-white/10 hover:border-heritage-orange/50 rounded-xl text-center font-semibold text-white transition-all"
                >
                  Explore Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredSites.length === 0 && (
          <div className="text-center py-20 text-cream/50">
            <p>No heritage sites found matching your criteria.</p>
          </div>
        )}

      </div>
    </div>
  );
}
